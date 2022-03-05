"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewBattleWorker = exports.RoundWorker = exports.HeroInputWorker = void 0;
const bullmq_1 = require("bullmq");
const round_1 = require("../game/actions/round");
const hero_1 = require("../game/hero");
const math_1 = require("../game/utils/math");
const index_1 = require("../redis/index");
const queue_1 = require("./queue");
const index_2 = require("../mongo/collections/index");
const options_1 = require("../redis/options");
const monster_1 = require("../game/monster");
const round_2 = require("../game/enums/round");
const channel_1 = require("./enums/channel");
const name_1 = require("./enums/name");
const inventory_1 = require("../game/gear/inventory");
const tmiClient_1 = require("../services/tmiClient");
const redisConfig = (0, options_1.getRedisConnectionConfig)();
const NewBattleWorker = new bullmq_1.Worker(name_1.WorkerName.NEWBATTLE, async (job) => {
    const { newBattle } = job.data;
    await index_1.RedisInstance.setBattleId(newBattle.id);
    await index_1.RedisInstance.setBattleStatus("join");
    // set turn
    const turn = (0, math_1.getRandomTurn)();
    await index_1.RedisInstance.setTurn(turn);
    await tmiClient_1.twitchClient.say(channel_1.ChannelName.SLIPPERYTOADS, `New Battle started! Type !battleJoin`);
    if (turn === round_2.Turn.HEROES) {
        await queue_1.HeroInputQueue.add(`battle:heroInput:${1}`, { battleId: newBattle.id, round: 1 }, { delay: 30000 });
    }
    else {
        await queue_1.RoundQueue.add(`battle:${newBattle.id}:round:1`, { battleId: newBattle.id, round: 1 }, { delay: 30000 });
    }
    return true;
}, { connection: redisConfig });
exports.NewBattleWorker = NewBattleWorker;
exports.HeroInputWorker = new bullmq_1.Worker(name_1.WorkerName.HEROINPUT, async (job) => {
    const { battleId, round } = job.data;
    await tmiClient_1.twitchClient.say(channel_1.ChannelName.SLIPPERYTOADS, `Heroes turn next Round: type !Attack`);
    await queue_1.RoundQueue.add(`battle:${battleId}:round:${round + 1}`, { battleId, round: round + 1 }, { delay: 30000 });
}, { connection: redisConfig });
exports.RoundWorker = new bullmq_1.Worker(name_1.WorkerName.ROUND, async (job) => {
    const { battleId, round } = job.data;
    console.log(`battleId:${battleId}:${round}`);
    const currentTurn = await index_1.RedisInstance.getTurn();
    const heroNames = await getHeroNames(currentTurn);
    const redisHeroRecords = await getRedisHeroRecords(heroNames);
    const aliveMonsterStrings = await index_1.RedisInstance.getAliveMonsters();
    // build heroes and monsters
    const heroes = redisHeroRecords.map(redisHeroRecord => ((0, hero_1.heroFactory)(redisHeroRecord)));
    const monsters = createMonsters(aliveMonsterStrings);
    const results = (0, round_1.executeRound)({
        turn: currentTurn,
        round,
        heroes,
        monsters
    });
    await index_2.TDungeonDB.BattleEventCollection.createNewBattleEvents(results.actionEvents.map(actionEvent => ({
        battleId,
        turn: currentTurn,
        round,
        ...actionEvent,
    })));
    await updateHeroesRedis(results.aliveHeroes, results.deadHeroes);
    await updateAliveMonstersRedis(results.aliveMonsters);
    await removeDeadHeroNamesFromRedis(results.deadHeroes);
    const nextTurn = (0, math_1.getNextTurn)(currentTurn);
    await index_1.RedisInstance.setTurn(nextTurn);
    await index_1.RedisInstance.setRound(results.nextRound);
    if (currentTurn === round_2.Turn.HEROES)
        await index_1.RedisInstance.clearAttackingHeroes();
    if (results.isBattleOver === true) {
        const winner = results.winner;
        const alive = results.aliveHeroes.length ? results.aliveHeroes : results.aliveMonsters;
        await tmiClient_1.twitchClient.say(channel_1.ChannelName.SLIPPERYTOADS, `${winner} won the battle!`);
        await index_2.TDungeonDB.BattleCollection.updateBattle(battleId, { winner, alive });
        if (winner === "Heroes")
            await distributeLoot(results.aliveHeroes);
        ;
        const heroParticipants = await index_1.RedisInstance.getHeroBattleParticipants();
        await index_1.RedisInstance.clearHeroes(heroParticipants);
        await index_1.RedisInstance.clearBattle();
    }
    else {
        if (nextTurn === round_2.Turn.HEROES)
            await queue_1.HeroInputQueue.add(`battle:heroInput:${round + 1}`, { battleId, round: round + 1 });
        else
            await queue_1.RoundQueue.add(`battle:${battleId}:round:${round + 1}`, { battleId, round: round + 1 }, { delay: 30000 });
    }
    return true;
}, { connection: redisConfig });
const getHeroNames = async (currentTurn) => {
    try {
        if (currentTurn === round_2.Turn.HEROES) {
            const heroes = await index_1.RedisInstance.getAttackingHeroes();
            if (heroes.length === 0) {
                return await index_1.RedisInstance.getAliveHeroes();
            }
            else {
                return heroes;
            }
        }
        else {
            return await index_1.RedisInstance.getAliveHeroes();
        }
    }
    catch (error) {
        console.error('[getHeroNames]', error);
        throw error;
    }
};
const getRedisHeroRecords = async (heroNames) => {
    try {
        const redisHeroRecords = [];
        await Promise.all(heroNames.map(async (heroName) => {
            const redisHeroRecord = await index_1.RedisInstance.getHero(heroName);
            redisHeroRecords.push({
                id: redisHeroRecord.id,
                name: redisHeroRecord.name,
                type: redisHeroRecord.type,
                hitPoints: redisHeroRecord.hitPoints,
                armor: redisHeroRecord.armor,
                weapons: redisHeroRecord.weapons
            });
        }));
        return redisHeroRecords;
    }
    catch (error) {
        console.error('[getHeroes]', error);
        throw error;
    }
};
const updateHeroesRedis = async (aliveHeroes, deadHeroes) => {
    try {
        return await Promise.all([...aliveHeroes, ...deadHeroes].map(async (hero) => {
            return await index_1.RedisInstance.updateHeroStat(hero);
        }));
    }
    catch (error) {
        console.error('[updateHeroesRedis]', error);
        throw error;
    }
};
const updateAliveMonstersRedis = async (aliveMonsters) => {
    try {
        if (aliveMonsters.length) {
            await index_1.RedisInstance.delAliveMontsers();
            await index_1.RedisInstance.setAliveMonsters(aliveMonsters);
        }
        return true;
    }
    catch (error) {
        console.error('[updateAliveMonstersRedis]', error);
        throw error;
    }
};
const removeDeadHeroNamesFromRedis = async (deadHeroes) => {
    try {
        if (deadHeroes.length) {
            await Promise.all(deadHeroes.map(async (hero) => {
                return await index_1.RedisInstance.delAliveHero(hero.name);
            }));
        }
    }
    catch (error) {
        console.error('[removeDeadHeroNamesFromRedis]', error);
        throw error;
    }
};
const createMonsters = (aliveMonsterStrings) => {
    return aliveMonsterStrings.map(aliveMonsterString => {
        ;
        const parsedString = aliveMonsterString.split(":");
        const monsterStats = { id: parsedString[0], type: parsedString[1], currentHitPoints: parsedString[2] };
        return (0, monster_1.monsterFactory)(monsterStats);
    });
};
const distributeLoot = async (aliveHeroes) => {
    try {
        await Promise.all(aliveHeroes.map(async (hero) => {
            const droppedItem = (0, inventory_1.getDroppedItem)();
            const heroInventory = await index_2.TDungeonDB.InventoryCollection.getInventory(hero.id);
            if (droppedItem.armor) {
                if (heroInventory.armorInventory.length < 20) {
                    heroInventory.armorInventory.push({
                        name: droppedItem.armor.name,
                        type: droppedItem.armor.type,
                        slot: droppedItem.armor.slot
                    });
                    await index_2.TDungeonDB.InventoryCollection.updateArmorInventory({
                        heroId: hero.id,
                        armorInventory: heroInventory.armorInventory
                    });
                }
            }
            else {
                if (heroInventory.weaponInventory.length < 20) {
                    heroInventory.weaponInventory.push({
                        name: droppedItem.weapon.name,
                        type: droppedItem.weapon.type,
                    });
                    await index_2.TDungeonDB.InventoryCollection.updateWeaponInventory({
                        heroId: hero.id,
                        weaponInventory: heroInventory.weaponInventory
                    });
                }
            }
            return true;
        }));
    }
    catch (error) {
        console.error('[distributeLoot]', error);
        throw error;
    }
};
