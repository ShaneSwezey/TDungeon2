"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewBattleWorker = exports.RoundWorker = exports.HeroInputWorker = void 0;
const bullmq_1 = require("bullmq");
const round_1 = require("../game/actions/round");
const hero_1 = require("../game/creation/hero");
const monster_1 = require("../game/creation/monster");
const math_1 = require("../game/utils/math");
const redis_1 = require("../redis");
const client_1 = require("../services/client");
const queue_1 = require("./queue");
const index_1 = require("../mongo/collections/index");
const round_2 = require("../game/enum/round");
const NewBattleWorker = new bullmq_1.Worker("newBattle", async (job) => {
    const { newBattleRecord } = job.data;
    await redis_1.RedisInstance.setBattleId(newBattleRecord.id);
    await redis_1.RedisInstance.setBattleStatus("join");
    // set turn
    const turn = math_1.getRandomTurn();
    await redis_1.RedisInstance.setTurn(turn);
    await client_1.twitchClient.say("slipperytoads", `New Battle started! Type !battleJoin`);
    if (turn === round_2.Turn.HERO) {
        await queue_1.HeroInputQueue.add(`battle:heroInput:${1}`, { battleId: newBattleRecord.id, round: 1 }, { delay: 30000 });
    }
    else {
        await queue_1.RoundQueue.add(`battle:${newBattleRecord.id}:round:1`, { battleId: newBattleRecord.id, round: 1 }, { delay: 30000 });
    }
    return true;
});
exports.NewBattleWorker = NewBattleWorker;
exports.HeroInputWorker = new bullmq_1.Worker("heroInput", async (job) => {
    const { battleId, round } = job.data;
    await client_1.twitchClient.say("slipperytoads", `Heroes turn next Round: type !Attack`);
    await queue_1.RoundQueue.add(`battle:${battleId}:round:${round + 1}`, { battleId, round: round + 1 }, { delay: 30000 });
});
exports.RoundWorker = new bullmq_1.Worker("round", async (job) => {
    const { battleId, round } = job.data;
    console.log(`Starting round: ${battleId}`);
    const currentTurn = await redis_1.RedisInstance.getTurn();
    // get Aliveheroes
    let aliveHeroes;
    if (currentTurn === round_2.Turn.HERO) {
        aliveHeroes = await redis_1.RedisInstance.getAttackingHeroes();
    }
    else {
        aliveHeroes = await redis_1.RedisInstance.getAliveHeroes();
    }
    if (!aliveHeroes.length)
        return;
    const aliveHeroNames = aliveHeroes.map(heroString => heroString.split(":")[0]);
    const redisHeroRecords = [];
    await Promise.all(aliveHeroNames.map(async (heroName) => {
        const redisHeroRecord = await redis_1.RedisInstance.getHero(heroName);
        redisHeroRecords.push(redisHeroRecord);
    }));
    const aliveMonsterStrings = await redis_1.RedisInstance.getAliveMonsters();
    // build heroes and monsters
    const builtHeroes = redisHeroRecords.map(redisHeroRecord => (hero_1.heroFactory(redisHeroRecord)));
    const builtMonsters = aliveMonsterStrings.map(monsterString => {
        const parsedString = monsterString.split(":");
        return monster_1.monsterFactory({ id: parsedString[0], type: parsedString[1], currentHitPoints: parsedString[2] });
    });
    const results = round_1.executeRound({
        battleId: battleId,
        turn: currentTurn,
        round,
        heroes: builtHeroes,
        monsters: builtMonsters,
    });
    await index_1.TDungeonDB.BattleEventCollection.createNewBattleEvents(results.actionEvents);
    if (results.aliveHeroes.length) {
        await Promise.all(results.aliveHeroes.map(async (hero) => {
            return await redis_1.RedisInstance.updateHeroStat(hero);
        }));
    }
    if (results.aliveMonsters.length)
        await redis_1.RedisInstance.setAliveMonsters(results.aliveMonsters);
    // @ts-ignore
    const nextTurn = math_1.getNextTurn(currentTurn);
    await redis_1.RedisInstance.setTurn(nextTurn);
    const Nextround = results.nextRound;
    await redis_1.RedisInstance.setRound(results.nextRound);
    if (results.isBattleOver === true) {
        const winner = results.winner;
        const alive = results.aliveHeroes.length ? results.aliveHeroes : results.aliveMonsters;
        await index_1.TDungeonDB.BattleCollection.updateBattle(battleId, { winner, alive });
    }
    else {
        if (nextTurn === round_2.Turn.HERO)
            await queue_1.HeroInputQueue.add(`battle:heroInput:${round + 1}`, { battleId, round: round + 1 });
        else
            await queue_1.RoundQueue.add(`battle:${battleId}:round:${round + 1}`, { battleId, round: round + 1 }, { delay: 30000 });
    }
    return true;
});
