"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeAttacks = void 0;
const character_1 = require("../enums/character");
const event_1 = require("../enums/event");
const round_1 = require("../enums/round");
const monster_1 = require("../monster");
const math_1 = require("../utils/math");
// const executeMonstersAttack = (heroes: IHero[], monsters: IMonster[]) => {
//     const actionEvents: IActionEvent[] = [];
//     let iteration = 0;
//     monsters.forEach(monster => {
//         const actionsList = monsterExecutionSwitch(monster);
//         const selectedHeroes = selectRandomHeroes(getAliveHeroes(heroes), actionsList.length);
//         selectedHeroes.forEach(hero => {
//             const actions = actionsList.shift();
//             (actions || []).forEach(action => {
//                 if (hero.stamina.hitPoints <= 0)  {
//                     hero.stamina.hitPoints -= action.value!;
//                     const heroSnapShot = generateHeroSnapShot(hero);
//                     actionEvents.push({
//                         iteration,
//                         receiverType: EventCharacter.HERO,
//                         receiver: heroSnapShot,
//                         receiverAction: {
//                             type: [Event.HIT]
//                         },
//                         initiatorType: EventCharacter.MONSTER,
//                         initiator: monster,
//                         initiatorAction: action
//                     });
//                 } else if (getRandomInt(1, 100) <= hero.dodge) {
//                     const heroSnapShot = generateHeroSnapShot(hero);
//                     actionEvents.push({
//                         iteration,
//                         receiverType: EventCharacter.HERO,
//                         receiver: heroSnapShot,
//                         receiverAction: {
//                             type: [Event.DODGE]
//                         },
//                         initiatorType: EventCharacter.MONSTER,
//                         initiator: monster,
//                         initiatorAction: action
//                     });
//                 } else if (hero.block !== 0 && getRandomInt(1, 100) <= hero.block) {
//                     const heroSnapShot = generateHeroSnapShot(hero);
//                     actionEvents.push({
//                         iteration,
//                         receiverType: EventCharacter.HERO,
//                         receiver: heroSnapShot,
//                         receiverAction: {
//                             type: [Event.BLOCK]
//                         },
//                         initiatorType: EventCharacter.MONSTER,
//                         initiator: monster,
//                         initiatorAction: action
//                     });
//                 } else {
//                     hero.stamina.hitPoints -= action.value!;
//                     const heroSnapShot = generateHeroSnapShot(hero);
//                     actionEvents.push({
//                         iteration,
//                         receiverType: EventCharacter.HERO,
//                         receiver: heroSnapShot,
//                         receiverAction: {
//                             type: [Event.HIT]
//                         },
//                         initiatorType: EventCharacter.MONSTER,
//                         initiator: monster,
//                         initiatorAction: action
//                     });
//                 }
//             });
//         });
//         iteration++;
//     });
//     return actionEvents;
// };
const executeMonstersAttack = (heroes, monsters) => {
    const actionEvents = [];
    let iteration = 0;
    monsters.forEach(monster => {
        const monsterGroupValue = Math.floor(monster.stamina.maxHitPoints / 10);
        const heroAttackList = (0, math_1.getHeroAttackList)((0, math_1.getAliveHeroes)(heroes), monsterGroupValue);
        const actionsList = (0, monster_1.monsterExecutionSwitch)(monster);
        const selectedHeroes = (0, math_1.selectRandomHeroes)(heroAttackList.slice(0, actionsList.length), actionsList.length);
        selectedHeroes.forEach(hero => {
            const actions = actionsList.shift();
            (actions || []).forEach(action => {
                if (hero.stamina.hitPoints <= 0) {
                    hero.stamina.hitPoints -= action.value;
                    const heroSnapShot = generateHeroSnapShot(hero);
                    actionEvents.push({
                        iteration,
                        receiverType: character_1.EventCharacter.HERO,
                        receiver: heroSnapShot,
                        receiverAction: {
                            type: [event_1.Event.HIT]
                        },
                        initiatorType: character_1.EventCharacter.MONSTER,
                        initiator: monster,
                        initiatorAction: action
                    });
                }
                else if ((0, math_1.getRandomInt)(1, 100) <= hero.dodge) {
                    const heroSnapShot = generateHeroSnapShot(hero);
                    actionEvents.push({
                        iteration,
                        receiverType: character_1.EventCharacter.HERO,
                        receiver: heroSnapShot,
                        receiverAction: {
                            type: [event_1.Event.DODGE]
                        },
                        initiatorType: character_1.EventCharacter.MONSTER,
                        initiator: monster,
                        initiatorAction: action
                    });
                }
                else if (hero.block !== 0 && (0, math_1.getRandomInt)(1, 100) <= hero.block) {
                    const heroSnapShot = generateHeroSnapShot(hero);
                    actionEvents.push({
                        iteration,
                        receiverType: character_1.EventCharacter.HERO,
                        receiver: heroSnapShot,
                        receiverAction: {
                            type: [event_1.Event.BLOCK]
                        },
                        initiatorType: character_1.EventCharacter.MONSTER,
                        initiator: monster,
                        initiatorAction: action
                    });
                }
                else {
                    hero.stamina.hitPoints -= action.value;
                    const heroSnapShot = generateHeroSnapShot(hero);
                    actionEvents.push({
                        iteration,
                        receiverType: character_1.EventCharacter.HERO,
                        receiver: heroSnapShot,
                        receiverAction: {
                            type: [event_1.Event.HIT]
                        },
                        initiatorType: character_1.EventCharacter.MONSTER,
                        initiator: monster,
                        initiatorAction: action
                    });
                }
            });
        });
        iteration++;
    });
    return actionEvents;
};
// const executeHeroesAttack = (heroes: IHero[], monsters: IMonster[]) => {
//     const actionEvents: IActionEvent[] = [];
//     let iteration = 0;
//     heroes.forEach(hero => {
//         const actionsList = executeHeroAttack(hero);
//         const selectedMonsters = selectRandomMonsters(getAliveMonsters(monsters), actionsList.length);
//         selectedMonsters.forEach(monster => {
//             const actions = actionsList.shift();
//             (actions || []).forEach(action => {
//                 if (monster.stamina.hitPoints <= 0) {
//                     monster.stamina.hitPoints -= action.value!;
//                     const monsterSnapShot = generateMonsterSnapShot(monster);
//                     actionEvents.push({
//                         iteration,
//                         initiatorType: EventCharacter.HERO,
//                         initiator: hero,
//                         initiatorAction: action,
//                         receiverType: EventCharacter.MONSTER,
//                         receiver: monsterSnapShot,
//                         receiverAction: {
//                             type: [Event.HIT]
//                         }
//                     });
//                 } else if (getRandomInt(1, 100) <= monster.dodge) {
//                     const monsterSnapShot = generateMonsterSnapShot(monster);
//                     actionEvents.push({
//                         iteration,
//                         initiatorType: EventCharacter.HERO,
//                         initiator: hero,
//                         initiatorAction: action,
//                         receiverType: EventCharacter.MONSTER,
//                         receiver: monsterSnapShot,
//                         receiverAction: {
//                             type: [Event.DODGE]
//                         }
//                     });
//                 } else if (monster.block !== 0 && getRandomInt(1, 100) <= monster.block) {
//                     const monsterSnapShot = generateMonsterSnapShot(monster);
//                     actionEvents.push({
//                         iteration,
//                         initiatorType: EventCharacter.HERO,
//                         initiator: hero,
//                         initiatorAction: action,
//                         receiverType: EventCharacter.MONSTER,
//                         receiver: monsterSnapShot,
//                         receiverAction: {
//                             type: [Event.BLOCK]
//                         }
//                     });
//                 } else {
//                     monster.stamina.hitPoints -= action.value!;
//                     const monsterSnapShot = generateMonsterSnapShot(monster);
//                     actionEvents.push({
//                         iteration,
//                         initiatorType: EventCharacter.HERO,
//                         initiator: hero,
//                         initiatorAction: action,
//                         receiverType: EventCharacter.MONSTER,
//                         receiver: monsterSnapShot,
//                         receiverAction: {
//                             type: [Event.HIT]
//                         }
//                     });
//                 }
//             });
//         });
//         iteration++;
//     });
//     return actionEvents;
// };
const executeHeroesAttack = (heroes, monsters) => {
    const actionEvents = [];
    let iteration = 0;
    heroes.forEach(hero => {
        const heroGroupValue = Math.floor(hero.stamina.maxHitPoints / 10);
        const monsterAttackList = (0, math_1.getMonsterAttackList)((0, math_1.getAliveMonsters)(monsters), heroGroupValue);
        const actionsList = executeHeroAttack(hero);
        const selectedMonsters = (0, math_1.selectRandomMonsters)(monsterAttackList.slice(0, actionsList.length), actionsList.length);
        selectedMonsters.forEach(monster => {
            const actions = actionsList.shift();
            (actions || []).forEach(action => {
                if (monster.stamina.hitPoints <= 0) {
                    monster.stamina.hitPoints -= action.value;
                    const monsterSnapShot = generateMonsterSnapShot(monster);
                    actionEvents.push({
                        iteration,
                        initiatorType: character_1.EventCharacter.HERO,
                        initiator: hero,
                        initiatorAction: action,
                        receiverType: character_1.EventCharacter.MONSTER,
                        receiver: monsterSnapShot,
                        receiverAction: {
                            type: [event_1.Event.HIT]
                        }
                    });
                }
                else if ((0, math_1.getRandomInt)(1, 100) <= monster.dodge) {
                    const monsterSnapShot = generateMonsterSnapShot(monster);
                    actionEvents.push({
                        iteration,
                        initiatorType: character_1.EventCharacter.HERO,
                        initiator: hero,
                        initiatorAction: action,
                        receiverType: character_1.EventCharacter.MONSTER,
                        receiver: monsterSnapShot,
                        receiverAction: {
                            type: [event_1.Event.DODGE]
                        }
                    });
                }
                else if (monster.block !== 0 && (0, math_1.getRandomInt)(1, 100) <= monster.block) {
                    const monsterSnapShot = generateMonsterSnapShot(monster);
                    actionEvents.push({
                        iteration,
                        initiatorType: character_1.EventCharacter.HERO,
                        initiator: hero,
                        initiatorAction: action,
                        receiverType: character_1.EventCharacter.MONSTER,
                        receiver: monsterSnapShot,
                        receiverAction: {
                            type: [event_1.Event.BLOCK]
                        }
                    });
                }
                else {
                    monster.stamina.hitPoints -= action.value;
                    const monsterSnapShot = generateMonsterSnapShot(monster);
                    actionEvents.push({
                        iteration,
                        initiatorType: character_1.EventCharacter.HERO,
                        initiator: hero,
                        initiatorAction: action,
                        receiverType: character_1.EventCharacter.MONSTER,
                        receiver: monsterSnapShot,
                        receiverAction: {
                            type: [event_1.Event.HIT]
                        }
                    });
                }
            });
        });
        iteration++;
    });
    return actionEvents;
};
const executeHeroAttack = (hero) => {
    const actions = [];
    hero.weapons.forEach(weapon => {
        const events = [event_1.Event.PHYSICALATTACK];
        let numOfMonstersToHit = 1;
        if (weapon.cleave && (0, math_1.getRandomInt)(1, 100) <= weapon.cleave.chance) {
            numOfMonstersToHit = (0, math_1.getRandomInt)(weapon.cleave.num.low, weapon.cleave.num.high);
            events.push(event_1.Event.CLEAVE);
        }
        let numOfHitsPerMonster = 1;
        if (weapon.flurry && (0, math_1.getRandomInt)(1, 100) <= weapon.flurry.chance) {
            numOfHitsPerMonster = (0, math_1.getRandomInt)(weapon.flurry.num.low, weapon.flurry.num.high);
            events.push(event_1.Event.FLURRY);
        }
        for (let i = 0; i < numOfMonstersToHit; i++) {
            const actionsOnMonster = [];
            for (let j = 0; j < numOfHitsPerMonster; j++) {
                let attackValue = (0, math_1.getRandomInt)(weapon.damage.low, weapon.damage.high);
                let isCrit = false;
                if ((0, math_1.getRandomInt)(1, 100) <= weapon.crit.chance + hero.crit) {
                    isCrit = true;
                    attackValue = Math.floor(attackValue * weapon.crit.multiplier);
                    events.push(event_1.Event.CRITICAL);
                }
                attackValue += hero.attackPower;
                actionsOnMonster.push({
                    type: events,
                    value: attackValue,
                    isCrit,
                    weapon
                });
            }
            actions[i] ? actions[i].push(...actionsOnMonster) : actions.push(actionsOnMonster);
        }
    });
    return actions;
};
// export const executeAttacks = (turn: string, heroes: IHero[], monsters: IMonster[]) => {
//     if (turn === Turn.HEROES) {
//         return executeHeroesAttack(heroes, monsters);
//     } else {
//         return executeMonstersAttack(heroes, monsters);
//     }
// };
const executeAttacks = (turn, heroes, monsters) => {
    if (turn === round_1.Turn.HEROES) {
        return executeHeroesAttack(heroes, monsters);
    }
    else {
        return executeMonstersAttack(heroes, monsters);
    }
};
exports.executeAttacks = executeAttacks;
const generateMonsterSnapShot = (monster) => {
    return {
        ...monster,
        stamina: {
            hitPoints: monster.stamina.hitPoints,
            maxHitPoints: monster.stamina.maxHitPoints
        }
    };
};
const generateHeroSnapShot = (hero) => {
    return {
        ...hero,
        stamina: {
            hitPoints: hero.stamina.hitPoints,
            maxHitPoints: hero.stamina.maxHitPoints
        }
    };
};
