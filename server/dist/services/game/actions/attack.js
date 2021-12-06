"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attackMonsters = exports.attackHeroes = exports.isDeathBlow = exports.executeHeroesAttack = exports.executeMonstersAttack = void 0;
const monster_1 = require("../monster");
const ghoul_1 = require("../monster/ghoul");
const goblin_1 = require("../monster/goblin");
const orc_1 = require("../monster/orc");
const math_1 = require("../utils/math");
// export const monsterTurn = (heroes: Hero[], monsters: Monster[]): ExecutionPayload => {
//     const messages: string[] = [];
//     monsters.forEach(monster => {
//         const result = monsterExecutionSwitch(monster, heroes);
//         if (result.message) messages.push(result.message);  
//     });
//     return { heroes, monsters, messages };
// }
const monsterExecutionSwitch = (monster, heroes) => {
    switch (monster.type) {
        case monster_1.MonsterType.Orc:
            return orc_1.ExecuteOrcAttack(monster, heroes);
        case monster_1.MonsterType.Goblin:
            return goblin_1.executeGoblinAttack(monster, heroes);
        case monster_1.MonsterType.GHOUL:
            return ghoul_1.executeGhoulAttack(monster, heroes);
        default:
            throw new Error(`${monster.type} does not exist`);
    }
};
const executeMonstersAttack = (heroes, monsters, battleId, round) => {
    const actionEvents = [];
    let iteration = 0;
    monsters.forEach(monster => {
        const events = monsterExecutionSwitch(monster, heroes);
        events.forEach(event => actionEvents.push({ battleId, round, iteration, event, createdAt: new Date().toUTCString(), updatedAt: new Date().toUTCString() }));
        iteration++;
    });
    return actionEvents;
};
exports.executeMonstersAttack = executeMonstersAttack;
const executeHeroesAttack = (heroes, monsters, battleId, round) => {
    const actionEvents = [];
    let iteration = 0;
    heroes.forEach(hero => {
        const events = hero.attack(monsters);
        events.forEach(event => actionEvents.push({ battleId, round, iteration, event, createdAt: new Date().toUTCString(), updatedAt: new Date().toUTCString() }));
        iteration++;
    });
    return actionEvents;
};
exports.executeHeroesAttack = executeHeroesAttack;
const isDeathBlow = (stamina) => {
    return stamina.hitPoints <= 0;
};
exports.isDeathBlow = isDeathBlow;
const attackHeroes = (heroes, monsters, battleId, round) => {
    const actionEvents = [];
    let iteration = 0;
    monsters.forEach(monster => {
        iteration++;
        const aliveHeroes = heroes.filter(hero => hero.stamina.hitPoints > 0);
        if (aliveHeroes.length > 0) {
            const selectedHero = math_1.selectRandom(aliveHeroes, 1)[0];
            const value = math_1.getRandomInt(monster.attack.low, monster.attack.high) + monster.attack.attackPower;
            const isCrit = false;
            const currentHeroStatus = {
                ...selectedHero,
                stamina: {
                    hitPoints: selectedHero.stamina.hitPoints,
                    maxHitPoints: selectedHero.stamina.maxHitPoints
                },
            };
            currentHeroStatus.stamina.hitPoints -= value;
            actionEvents.push({
                battleId,
                round,
                iteration,
                event: {
                    type: EventType.PHSYICALATTACK,
                    value,
                    isCrit,
                    deathBlow: exports.isDeathBlow(currentHeroStatus.stamina),
                    to: currentHeroStatus,
                    from: monster,
                },
                createdAt: new Date().toUTCString(),
                updatedAt: new Date().toUTCString(),
            });
            selectedHero.stamina.hitPoints -= value;
        }
    });
    return actionEvents;
};
exports.attackHeroes = attackHeroes;
// add crit
const attackMonsters = (heroes, monsters, battleId, round) => {
    const actionEvents = [];
    let iteration = 0;
    heroes.forEach(hero => {
        const aliveMonsters = monsters.filter(monster => monster.stamina.hitPoints > 0);
        if (aliveMonsters.length > 0) {
            const monster = math_1.selectRandom(aliveMonsters, 1)[0];
            iteration++;
            hero.weapons.forEach(weapon => {
                let numOfAttacks = 1;
                let attackType = "Physical Attack";
                if (hero.type === "Ranged") {
                    if (math_1.getRandomInt(1, 100) <= 20) {
                        numOfAttacks = math_1.getRandomInt(2, 3);
                        attackType = "Flurry";
                    }
                }
                for (let i = 0; i < numOfAttacks; i++) {
                    const attackDodged = false;
                    let isCrit = false;
                    let value = math_1.getRandomInt(weapon.damage.low, weapon.damage.high);
                    if (math_1.getRandomInt(1, 100) <= 10) {
                        isCrit = true;
                        value *= 2;
                    }
                    const currentMonsterStatus = {
                        ...monster,
                        stamina: {
                            hitPoints: monster.stamina.hitPoints,
                            maxHitPoints: monster.stamina.maxHitPoints,
                        }
                    };
                    currentMonsterStatus.stamina.hitPoints -= value;
                    const actionEvent = {
                        battleId,
                        round,
                        iteration,
                        event: {
                            type: attackType,
                            value,
                            isCrit,
                            deathBlow: exports.isDeathBlow(currentMonsterStatus.stamina),
                            to: currentMonsterStatus,
                            from: {
                                id: hero.id,
                                name: hero.name,
                                type: hero.type,
                                stamina: hero.stamina,
                                weapon,
                                armor: hero.armor,
                            },
                        },
                        createdAt: new Date().toUTCString(),
                        updatedAt: new Date().toUTCString(),
                    };
                    actionEvents.push(actionEvent);
                    monster.stamina.hitPoints -= value;
                }
            });
        }
    });
    return actionEvents;
};
exports.attackMonsters = attackMonsters;
var EventType;
(function (EventType) {
    EventType["PHSYICALATTACK"] = "Physical Attack";
    EventType["FLURRY"] = "Flurry";
})(EventType || (EventType = {}));
// export interface ActionEvent {
//     battleId: string;
//     round: number;
//     iteration: number;
//     event: {
//         type: EventType; // change to enum
//         value: number;
//         isCrit: boolean;
//         deathBlow: boolean;
//         to: Object; // add stricter typing later
//         from: Object;   
//     }
//     createdAt: string;
//     updatedAt: string
// }
