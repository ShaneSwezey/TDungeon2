// // import { RedisGraph } from './redisGraph';
// // import { createNewHero } from '../../game/creation/hero';
// import { Hero } from '../../game/hero';
// // import { v4 as uuuid } from 'uuid';
// // import { BattleCollection } from '../mongo/collections/battle';
// import { createHeroes, createMonsters } from '../../../test/util/creation';
// import { getRandomTurn, getUuid } from '../../game/utils/math';
// import { RedisInstance } from './instance';
// import { heroFactory, HeroStats } from '../../game/creation/hero';
// import { monsterFactory } from '../../game/creation/monster';
// import { Monster } from '../../game/monster';

// // const runRedisTests = async () => {
// //     try {
// //         const redisGraph = new RedisGraph();

// //         const battleId = uuuid();
// //         await redisGraph.createBattle(battleId);

// //         await redisGraph.createRoundAndAttach(battleId, 1);

// //         const hero = createNewHero("Shane", HeroType.Melee);
// //         const hero2 = createNewHero("Jordan", HeroType.Melee);

// //         await redisGraph.loadHero(hero);
// //         await redisGraph.loadHero(hero2);

// //         await redisGraph.attachHeroToBattle(hero, battleId)
        
// //         await redisGraph.setHeroToAttack(hero, 1);

// //     } catch(error) {
// //         console.error('[runRedisTests]', error);
// //         throw error;
// //     }
// // }

// const runRedisGetAliveTest = async () => {
//     try {
//         console.log('Running H/M creation and persistence to redis');
        
//         // create battle
//         await RedisInstance.setBattleId(getUuid());

//         await RedisInstance.setTurn(getRandomTurn());

//         // create heroes 
//         const heroes = createHeroes(1, 3);
//         // create monsters
//         const monsters = createMonsters(1, 3);

//         // add heroes to redis
//         const loadHeroes = await heroes.map(async hero => {
//             return await RedisInstance.setHero(hero);
//         });

//         // add monsters to redis
//         await RedisInstance.setAliveMonsters(monsters);
        
//         const redisHeroObjects: any[] = [];
//         await Promise.all(heroes.map(async hero => {
//             const derp = await RedisInstance.getHero(hero.name);
//             redisHeroObjects.push(derp);
//         }));
        
//         const aliveMonsterStrings = await RedisInstance.getAliveMonsters();

        
//         console.log('redisHeroObjects:', redisHeroObjects);
//         console.log('aliveMonsterStrings:', aliveMonsterStrings);

//         // build heroes and monsters
//         const builtHeroes: Hero[] = redisHeroObjects.map(redisHeroObject => (heroFactory(redisHeroObject)));
//         const builtMonsters: Monster[] = aliveMonsterStrings.map(monsterString => {
//             const parsedString = monsterString.split(":");
//             return monsterFactory({ id: parsedString[0], type: parsedString[1], currentHitPoints: parsedString[2] })
//         })

//         console.log('builtHeroes:', builtHeroes);
//         console.log('builtMonsters:', builtMonsters);

//     } catch(error) {
//         throw error;
//     }
// }



// runRedisGetAliveTest()
//     .then(() => process.exit(0))
//     .catch(error => {
//         console.error('[runRedisTests]', error);
//         process.exit(1);
//     })