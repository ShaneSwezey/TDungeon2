import { Job, Worker } from 'bullmq';
import { executeRound } from '../game/actions/round';
import { heroFactory } from '../game/creation/hero';
import { monsterFactory } from '../game/creation/monster';
import { Hero } from '../game/hero';
import { Monster } from '../game/monster';
import { getNextTurn, getRandomTurn } from '../game/utils/math';
import { RedisInstance } from '../redis';
import { twitchClient } from '../services/client';
import { HeroInputQueue, RoundQueue } from './queue';
import { TDungeonDB } from '../mongo/collections/index';
import { Turn } from '../game/enum/round';

const NewBattleWorker = new Worker("newBattle", async (job: Job) => {
    const { newBattleRecord } = job.data;

    await RedisInstance.setBattleId(newBattleRecord.id);
    await RedisInstance.setBattleStatus("join");
    
    // set turn
    const turn = getRandomTurn();
    await RedisInstance.setTurn(turn);

    await twitchClient.say("slipperytoads", `New Battle started! Type !battleJoin`);
    if (turn === Turn.HERO) {
        await HeroInputQueue.add(`battle:heroInput:${1}`, { battleId: newBattleRecord.id, round: 1 }, { delay: 30000 });
    } else {
        await RoundQueue.add(`battle:${newBattleRecord.id}:round:1`, { battleId: newBattleRecord.id, round: 1 }, { delay: 30000 });
    }

    return true;
});

export const HeroInputWorker = new Worker("heroInput", async (job: Job) => {
    const { battleId, round } = job.data;
    await twitchClient.say("slipperytoads", `Heroes turn next Round: type !Attack`);
    await RoundQueue.add(`battle:${battleId}:round:${round + 1}`, { battleId, round: round + 1 }, { delay: 30000 });
});

export const RoundWorker = new Worker("round", async (job: Job) => {
    const { battleId, round } = job.data;
    console.log(`Starting round: ${battleId}`)

    const currentTurn = await RedisInstance.getTurn();

    // get Aliveheroes
    let aliveHeroes: string[];
    if (currentTurn === Turn.HERO) {
        aliveHeroes = await RedisInstance.getAttackingHeroes();
    } else {
        aliveHeroes = await RedisInstance.getAliveHeroes();
    }

    if (!aliveHeroes.length) return;

    const aliveHeroNames = aliveHeroes.map(heroString => heroString.split(":")[0]);

    const redisHeroRecords: Record<string, string>[] = [];
    await Promise.all(aliveHeroNames.map(async heroName => {
        const redisHeroRecord = await RedisInstance.getHero(heroName);
        redisHeroRecords.push(redisHeroRecord);
    }));
    
    const aliveMonsterStrings = await RedisInstance.getAliveMonsters();

    // build heroes and monsters
    const builtHeroes: Hero[] = redisHeroRecords.map(redisHeroRecord => (heroFactory(redisHeroRecord as any)));
    const builtMonsters: Monster[] = aliveMonsterStrings.map(monsterString => {
        const parsedString = monsterString.split(":");
        return monsterFactory({ id: parsedString[0], type: parsedString[1], currentHitPoints: parsedString[2] })
    });

    const results = executeRound({
        battleId: battleId,
        turn: currentTurn!,
        round,
        heroes: builtHeroes,
        monsters: builtMonsters,
    });

    await TDungeonDB.BattleEventCollection.createNewBattleEvents(results.actionEvents);
        
    if (results.aliveHeroes.length) {
        await Promise.all(results.aliveHeroes.map(async hero => {
            return await RedisInstance.updateHeroStat(hero);
        }));
    }

    if (results.aliveMonsters.length) await RedisInstance.setAliveMonsters(results.aliveMonsters);

    // @ts-ignore
    const nextTurn = getNextTurn(currentTurn);
    
    await RedisInstance.setTurn(nextTurn);
    const Nextround = results.nextRound;
    await RedisInstance.setRound(results.nextRound);
    if (results.isBattleOver === true) {
        const winner = results.winner!;
        const alive = results.aliveHeroes.length ? results.aliveHeroes : results.aliveMonsters;
        await TDungeonDB.BattleCollection.updateBattle(battleId, { winner, alive })
    } else {
        if (nextTurn === Turn.HERO) await HeroInputQueue.add(`battle:heroInput:${round + 1}`, { battleId, round: round + 1 });
        else await RoundQueue.add(`battle:${battleId}:round:${round + 1}`, { battleId, round: round + 1 }, { delay: 30000 });
    }
    return true;
});

export { NewBattleWorker };