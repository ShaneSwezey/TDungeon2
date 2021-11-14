"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attackMonsters = exports.attackHeroes = void 0;
const math_1 = require("../utils/math");
// export const monsterTurn = (heroes: Hero[], monsters: Monster[]): ExecutionPayload => {
//     const messages: string[] = [];
//     monsters.forEach(monster => {
//         const result = monsterExecutionSwitch(monster, heroes);
//         if (result.message) messages.push(result.message);  
//     });
//     return { heroes, monsters, messages };
// }
// const monsterExecutionSwitch = (monster: Monster, heroes: Hero[]) => {
//     switch(monster.type) {
//         case MonsterType.Ogre:
//             return executeOgreAttack(monster as Ogre, heroes);
//         case MonsterType.Goblin:
//             return executeGoblinAttack(monster as Goblin, heroes);
//         case MonsterType.Spiderling:
//             return executeSpiderlingAttack(monster as SpiderLing, heroes);
//         default:
//             throw new Error(`${monster.type} does not exist`);
//     }
// }
const isDeathBlow = (stamina) => {
    return stamina.hitPoints <= 0;
};
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
                    deathBlow: isDeathBlow(currentHeroStatus.stamina),
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
                const attackDodged = false;
                const isCrit = false;
                const value = math_1.getRandomInt(weapon.damage.low, weapon.damage.high);
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
                        type: EventType.PHSYICALATTACK,
                        value,
                        isCrit,
                        deathBlow: isDeathBlow(currentMonsterStatus.stamina),
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
            });
        }
    });
    return actionEvents;
};
exports.attackMonsters = attackMonsters;
var EventType;
(function (EventType) {
    EventType["PHSYICALATTACK"] = "Physical Attack";
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
