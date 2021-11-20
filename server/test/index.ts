import { MongoClient } from 'mongodb';
import { executeRound } from '../services/game/actions/round';
import { BattleCollection } from '../services/persistence/mongo/collections/battle';
import { createHeroes, createMonsters } from './util/creation';
import { RedisInstance } from '../services/persistence/redis/instance';
import { getNextTurn, getRandomTurn, getUuid } from '../services/game/utils/math';
import { Hero } from '../services/game/hero';
import { heroFactory } from '../services/game/creation/hero';
import { Monster } from '../services/game/monster';
import { monsterFactory } from '../services/game/creation/monster';
import { HeroCollection } from '../services/persistence/mongo/collections/hero';
import { BattleEventCollection } from '../services/persistence/mongo/collections/battleEvent';

const client = new MongoClient("mongodb://127.0.0.1:27017");
const db = client.db('tdungeon');

// create new Battle
const BattleCol = new BattleCollection(db);
const HeroCol = new HeroCollection(db);
const BattleEventCol = new BattleEventCollection(db);
        
const executeBattle = async () => {
    try {

        await client.connect();
        
        const battle = await BattleCol.createNewBattle();

        console.log(`Executing battle id:${battle.id}...`);

        // create battle
        await RedisInstance.setBattleId(battle.id);

        let turn = getRandomTurn();

        await RedisInstance.setTurn(turn);

        // create heroes 
        const heroes = createHeroes(4, 5);

        await HeroCol.createNewHeroes(heroes);

        // create monsters
        const monsters = createMonsters(3, 6);
        console.log("startingHeroes:", heroes);
        console.log("startingMonsters:", monsters);

        // add heroes to redis
        await Promise.all(heroes.map(async hero => {
            return await RedisInstance.setHero(hero);
        }));

        await RedisInstance.setAliveHeroes(heroes);

        // add monsters to redis
        await RedisInstance.setAliveMonsters(monsters);
        

        let isBattleOver = false;
        let round = 0;

        while(isBattleOver === false) {
            console.log(`executing round #${round}...`);

            let currentTurn = await RedisInstance.getTurn();

            // get Aliveheroes
            const aliveHeroes = await RedisInstance.getAliveHeroes();
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
                battleId: battle.id,
                turn: currentTurn!,
                round,
                heroes: builtHeroes,
                monsters: builtMonsters,
            });

            console.dir(results, { depth: null });
            await BattleEventCol.createNewBattleEvents(results.actionEvents);
                

            if (results.aliveHeroes.length) {
                await Promise.all(results.aliveHeroes.map(async hero => {
                    return await RedisInstance.updateHeroStat(hero);
                }));
            }

            if (results.aliveMonsters.length) await RedisInstance.setAliveMonsters(results.aliveMonsters);

            const turn = await RedisInstance.getTurn();
            // @ts-ignore
            await RedisInstance.setTurn(getNextTurn(turn));
            round = results.nextRound;
            await RedisInstance.setRound(results.nextRound);
            if (results.isBattleOver === true) {
                isBattleOver = true;
                const winner = results.winner!;
                const alive = results.aliveHeroes.length ? results.aliveHeroes : results.aliveMonsters;
                await BattleCol.updateBattle(battle.id, { winner, alive })
            }
        }

        console.log(`Battle id:${battle.id} is over!`);
    } catch(error) {
        throw error;
    }
}

executeBattle()
    .then(async() => {
        try {
            await client.close();
        } catch(error) {
            console.log('[Error]', error)
        } finally {
            console.log('Connection to mongodb closed!');
        }
        RedisInstance.disconnect();
        process.exit(0);
    })
    .catch(async error => {
        console.log('[Error]', error);
        try {
            await client.close();
        } catch(error) {
            console.log('[Error]', error)
        } finally {
            console.log('Connection to mongodb closed!');
        }
        RedisInstance.disconnect();
        process.exit(1);
    });