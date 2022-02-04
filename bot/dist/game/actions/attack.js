"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeAttacks = void 0;
const event_1 = require("../enums/event");
const round_1 = require("../enums/round");
const monster_1 = require("../monster");
const math_1 = require("../utils/math");
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
            let events = [];
            let hit = false;
            (actions || []).forEach(action => {
                if (hero.stamina.hitPoints <= 0) {
                    hero.stamina.hitPoints -= action.value;
                    events = [event_1.Event.HIT];
                    hit = true;
                }
                else if ((0, math_1.getRandomInt)(1, 100) <= hero.dodge) {
                    events = [event_1.Event.DODGE];
                }
                else if (hero.block !== 0 && (0, math_1.getRandomInt)(1, 100) <= hero.block) {
                    events = [event_1.Event.BLOCK];
                }
                else {
                    hero.stamina.hitPoints -= action.value;
                    events = [event_1.Event.HIT];
                    hit = true;
                }
                actionEvents.push({
                    iteration,
                    receiver: {
                        character: generateHeroSnapShot(hero, hit),
                        action: {
                            events
                        },
                    },
                    initiator: {
                        character: generateMonsterSnapShot(monster, false),
                        action
                    }
                });
            });
        });
        iteration++;
    });
    return actionEvents;
};
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
            let events = [];
            let hit = false;
            (actions || []).forEach(action => {
                if (monster.stamina.hitPoints <= 0) {
                    monster.stamina.hitPoints -= action.value;
                    events = [event_1.Event.HIT];
                    hit = true;
                }
                else if ((0, math_1.getRandomInt)(1, 100) <= monster.dodge) {
                    events = [event_1.Event.DODGE];
                }
                else if (monster.block !== 0 && (0, math_1.getRandomInt)(1, 100) <= monster.block) {
                    events = [event_1.Event.BLOCK];
                }
                else {
                    monster.stamina.hitPoints -= action.value;
                    events = [event_1.Event.HIT];
                    hit = true;
                }
                actionEvents.push({
                    iteration,
                    initiator: {
                        character: generateHeroSnapShot(hero, false),
                        action,
                    },
                    receiver: {
                        character: generateMonsterSnapShot(monster, hit),
                        action: {
                            events
                        }
                    }
                });
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
                    events,
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
const executeAttacks = (turn, heroes, monsters) => {
    if (turn === round_1.Turn.HEROES) {
        return executeHeroesAttack(heroes, monsters);
    }
    else {
        return executeMonstersAttack(heroes, monsters);
    }
};
exports.executeAttacks = executeAttacks;
const generateMonsterSnapShot = (monster, hit) => {
    return {
        id: monster.id,
        type: monster.type,
        crit: monster.crit,
        dodge: monster.dodge,
        attackPower: monster.attackPower,
        block: monster.block,
        weapons: monster.weapons,
        stamina: {
            hitPoints: monster.stamina.hitPoints,
            maxHitPoints: monster.stamina.maxHitPoints
        },
        imgSrc: hit ? monster.monsterHitImgSrc : monster.monsterImgSrc
    };
};
const generateHeroSnapShot = (hero, hit) => {
    return {
        id: hero.id,
        name: hero.name,
        type: hero.type,
        crit: hero.crit,
        dodge: hero.dodge,
        block: hero.block,
        attackPower: hero.attackPower,
        armor: hero.armor,
        weapons: hero.weapons,
        stamina: {
            hitPoints: hero.stamina.hitPoints,
            maxHitPoints: hero.stamina.maxHitPoints
        },
        imgSrc: hit ? hero.heroHitImgSrc : hero.heroImgSrc
    };
};
