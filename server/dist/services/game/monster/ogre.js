// import { AbilityTitle } from "../abilities/ability";
// import { getFrenzy, setFrenzy } from "../buffs/frenzy";
// import { attackHeroes } from "../actions/attack";
// import { Hero } from "../hero";
// import { getStaminaPercentage, getUuid, selectRandomHeroes } from "../utils/math";
// import { Monster, MonsterType } from ".";
// import { MonsterAttackType } from "../stats/attack";
// export interface Ogre extends Monster {
//     type: MonsterType.Ogre;
// }
// export const orge = (): Ogre => ({
//     id: getUuid(),
//     type: MonsterType.Ogre,
//     stamina: {
//         maxHitPoints: 20,
//         hitPoints: 20,
//     },
//     attack: {
//         low: 5,
//         high: 10,
//         attackPower: 0,
//         type: MonsterAttackType.PUNCHED,
//     }
// });
// const ogreRage = (ogre: Ogre) => {
//     if  (getStaminaPercentage(ogre.stamina) <= 50 && !ogre.buffs.find(buff => buff.title === AbilityTitle.Frenzy)) {
//         const frenzy = getFrenzy(10);
//         setFrenzy(ogre, frenzy);
//         return 'Ogre begins to rage - gachiHYPER'
//     };
//     return;
// }
// export const executeOgreAttack = (ogre: Ogre, heroes: Hero[]) => {
//     // check if orge health is 50% or less
//     //const message = ogreRage(ogre);
//     // select up to 5 heroes for the orge to attack
//     const selectedHeroes = selectRandomHeroes(heroes, 5);
//     // attack
//     attackHeroes(selectedHeroes, [ogre]);
//     //const heroesWithBackhand = chanceToApplyBackhand({ heroes, duration: 1, chance: 5 });
//     return { monster: ogre, heroes, message: undefined };
// }
