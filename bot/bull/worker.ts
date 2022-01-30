import { Job, Worker } from 'bullmq';
import { executeRound } from '../game/actions/round';
import { heroFactory } from '../game/hero';
import { getNextTurn, getRandomTurn } from '../game/utils/math';
import { RedisInstance } from '../redis/index';
import { HeroInputQueue, RoundQueue } from './queue';
import { TDungeonDB } from '../mongo/collections/index';
import { RedisConfig } from '../redis/options';
import { monsterFactory } from '../game/monster';
import { Turn } from '../game/enums/round';
import { IHero, IHeroDBStats } from '../game/interfaces/hero';
import { IMonster } from '../game/interfaces/monster';
import { ChannelName } from './enums/channel';
import { WorkerName } from './enums/name';
import { getDroppedItem } from '../game/gear/inventory';
import { twitchClient } from '../services/tmiClient';

const NewBattleWorker = new Worker(WorkerName.NEWBATTLE, async (job: Job) => {
    const { newBattle } = job.data;

    await RedisInstance.setBattleId(newBattle.id);
    await RedisInstance.setBattleStatus("join");
    
    // set turn
    const turn = getRandomTurn();
    await RedisInstance.setTurn(turn);

    await twitchClient.say(ChannelName.SLIPPERYTOADS, `New Battle started! Type !battleJoin`);
    if (turn === Turn.HEROES) {
        await HeroInputQueue.add(`battle:heroInput:${1}`, { battleId: newBattle.id, round: 1 }, { delay: 30000 });
    } else {
        await RoundQueue.add(`battle:${newBattle.id}:round:1`, { battleId: newBattle.id, round: 1 }, { delay: 30000 });
    }

    return true;
}, { connection: RedisConfig });

export const HeroInputWorker = new Worker(WorkerName.HEROINPUT, async (job: Job) => {
    const { battleId, round } = job.data;
    await twitchClient.say(ChannelName.SLIPPERYTOADS, `Heroes turn next Round: type !Attack`);
    await RoundQueue.add(`battle:${battleId}:round:${round + 1}`, { battleId, round: round + 1 }, { delay: 30000 });
}, { connection: RedisConfig });

export const RoundWorker = new Worker(WorkerName.ROUND, async (job: Job) => {
    const { battleId, round } = job.data;
    console.log(`battleId:${battleId}:${round}`);

    const currentTurn = await RedisInstance.getTurn();

    const heroNames = await getHeroNames(currentTurn!);

    const redisHeroRecords = await getRedisHeroRecords(heroNames);
    
    const aliveMonsterStrings = await RedisInstance.getAliveMonsters();

    // build heroes and monsters
    const heroes = redisHeroRecords.map(redisHeroRecord => (heroFactory(redisHeroRecord)));
    const monsters = createMonsters(aliveMonsterStrings);

    const results = executeRound({
        turn: currentTurn,
        round,
        heroes,
        monsters
    });

    await TDungeonDB.BattleEventCollection.createNewBattleEvents(results.actionEvents.map(actionEvent => ({
        battleId,
        turn: currentTurn,
        round,
        ...actionEvent,
     })));
    
    await updateHeroesRedis(results.aliveHeroes, results.deadHeroes);
    await updateAliveMonstersRedis(results.aliveMonsters);
    await removeDeadHeroNamesFromRedis(results.deadHeroes);

    const nextTurn = getNextTurn(currentTurn);
    
    await RedisInstance.setTurn(nextTurn);
    await RedisInstance.setRound(results.nextRound);

    if (currentTurn === Turn.HEROES) await RedisInstance.clearAttackingHeroes();
    
    if (results.isBattleOver === true) {
        const winner = results.winner!;
        const alive = results.aliveHeroes.length ? results.aliveHeroes : results.aliveMonsters;
        await twitchClient.say(ChannelName.SLIPPERYTOADS, `${winner} won the battle!`);
        await TDungeonDB.BattleCollection.updateBattle(battleId, { winner, alive });

        if (winner === "Heroes") await distributeLoot(results.aliveHeroes);;
    
        const heroParticipants = await RedisInstance.getHeroBattleParticipants();
        await RedisInstance.clearHeroes(heroParticipants);
        await RedisInstance.clearBattle();
    } else {
        if (nextTurn === Turn.HEROES) await HeroInputQueue.add(`battle:heroInput:${round + 1}`, { battleId, round: round + 1 });
        else await RoundQueue.add(`battle:${battleId}:round:${round + 1}`, { battleId, round: round + 1 }, { delay: 30000 });
    }
    return true;
}, { connection: RedisConfig });


const getHeroNames = async(currentTurn: string) => {
    try {
        if (currentTurn === Turn.HEROES) {
            const heroes = await RedisInstance.getAttackingHeroes();
            if (heroes.length === 0) {
                return await RedisInstance.getAliveHeroes();
            } else {
                return heroes;
            }
        } else {
            return await RedisInstance.getAliveHeroes();
        }
    } catch(error) {
        console.error('[getHeroNames]', error);
        throw error;
    }
}

const getRedisHeroRecords = async (heroNames: string[]) => {
    try {
        const redisHeroRecords: IHeroDBStats[] = [];
        await Promise.all(heroNames.map(async heroName => {
            const redisHeroRecord = await RedisInstance.getHero(heroName);
            redisHeroRecords.push({
                id: redisHeroRecord!.id,
                name: redisHeroRecord!.name,
                type: redisHeroRecord!.type,
                hitPoints: redisHeroRecord!.hitPoints,
                armor: redisHeroRecord!.armor,
                weapons: redisHeroRecord!.weapons
            });
        }));
        return redisHeroRecords;
    } catch(error) {
        console.error('[getHeroes]', error);
        throw error;
    }
}

const updateHeroesRedis = async(aliveHeroes: IHero[], deadHeroes: IHero[]) => {
    try {
        return await Promise.all([...aliveHeroes, ...deadHeroes].map(async hero => {
            return await RedisInstance.updateHeroStat(hero);
        }));
    } catch(error) {
        console.error('[updateHeroesRedis]', error);
        throw error;
    }
}

const updateAliveMonstersRedis = async (aliveMonsters: IMonster[]) => {
    try {
        if (aliveMonsters.length) {
            await RedisInstance.delAliveMontsers();
            await RedisInstance.setAliveMonsters(aliveMonsters);
        }
        return true;
    } catch(error) {
        console.error('[updateAliveMonstersRedis]', error);
        throw error;
    }
}

const removeDeadHeroNamesFromRedis = async (deadHeroes: IHero[]) => {
    try {
        if (deadHeroes.length) {
            await Promise.all(deadHeroes.map(async hero => {
                return await RedisInstance.delAliveHero(hero.name);
            }));
        }
    } catch(error) {
        console.error('[removeDeadHeroNamesFromRedis]', error);
        throw error;
    }
}

const createMonsters = (aliveMonsterStrings: string[]) => {
    return aliveMonsterStrings.map(aliveMonsterString => {;
        const parsedString = aliveMonsterString.split(":");
        const monsterStats = { id: parsedString[0], type: parsedString[1], currentHitPoints: parsedString[2] };
        return monsterFactory(monsterStats);
    });
}

const distributeLoot = async (aliveHeroes: IHero[]) => {
    try {
        await Promise.all(aliveHeroes.map(async hero => {
            const droppedItem = getDroppedItem();
            const heroInventory = await TDungeonDB.InventoryCollection.getInventory(hero.id!);
            if (droppedItem.armor) {
                if (heroInventory!.armorInventory.length < 20) {
                    heroInventory!.armorInventory.push({ 
                        name: droppedItem.armor.name,
                        type: droppedItem.armor.type,
                        slot: droppedItem.armor.slot
                    });
                    await TDungeonDB.InventoryCollection.updateArmorInventory({
                        heroId: hero.id!,
                        armorInventory: heroInventory!.armorInventory
                    });
                }
            } else {
                if (heroInventory!.weaponInventory.length < 20) {
                    heroInventory!.weaponInventory.push({ 
                        name: droppedItem.weapon!.name,
                        type: droppedItem.weapon!.type,
                    });
                    await TDungeonDB.InventoryCollection.updateWeaponInventory({
                        heroId: hero.id!,
                        weaponInventory: heroInventory!.weaponInventory
                    });
                }
            }
            return true;
        }));
    } catch(error) {
        console.error('[distributeLoot]', error);
        throw error;
    }
}

export { NewBattleWorker };