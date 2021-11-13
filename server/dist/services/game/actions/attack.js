"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.attackMonsters = exports.attackHeroes = void 0;
var math_1 = require("../utils/math");
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
var isDeathBlow = function (stamina) {
    return stamina.hitPoints <= 0;
};
var attackHeroes = function (heroes, monsters, battleId, round) {
    var actionEvents = [];
    var iteration = 0;
    monsters.forEach(function (monster) {
        iteration++;
        var aliveHeroes = heroes.filter(function (hero) { return hero.stamina.hitPoints > 0; });
        if (aliveHeroes.length > 0) {
            var selectedHero = math_1.selectRandom(aliveHeroes, 1)[0];
            var value = math_1.getRandomInt(monster.attack.low, monster.attack.high) + monster.attack.attackPower;
            var isCrit = false;
            var currentHeroStatus = __assign(__assign({}, selectedHero), { stamina: {
                    hitPoints: selectedHero.stamina.hitPoints,
                    maxHitPoints: selectedHero.stamina.maxHitPoints
                } });
            currentHeroStatus.stamina.hitPoints -= value;
            actionEvents.push({
                battleId: battleId,
                round: round,
                iteration: iteration,
                event: {
                    type: EventType.PHSYICALATTACK,
                    value: value,
                    isCrit: isCrit,
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
var attackMonsters = function (heroes, monsters, battleId, round) {
    var actionEvents = [];
    var iteration = 0;
    heroes.forEach(function (hero) {
        var aliveMonsters = monsters.filter(function (monster) { return monster.stamina.hitPoints > 0; });
        if (aliveMonsters.length > 0) {
            var monster_1 = math_1.selectRandom(aliveMonsters, 1)[0];
            iteration++;
            hero.weapons.forEach(function (weapon) {
                var attackDodged = false;
                var isCrit = false;
                var value = math_1.getRandomInt(weapon.damage.low, weapon.damage.high);
                var currentMonsterStatus = __assign(__assign({}, monster_1), { stamina: {
                        hitPoints: monster_1.stamina.hitPoints,
                        maxHitPoints: monster_1.stamina.maxHitPoints,
                    } });
                currentMonsterStatus.stamina.hitPoints -= value;
                var actionEvent = {
                    battleId: battleId,
                    round: round,
                    iteration: iteration,
                    event: {
                        type: EventType.PHSYICALATTACK,
                        value: value,
                        isCrit: isCrit,
                        deathBlow: isDeathBlow(currentMonsterStatus.stamina),
                        to: currentMonsterStatus,
                        from: {
                            id: hero.id,
                            name: hero.name,
                            type: hero.type,
                            stamina: hero.stamina,
                            weapon: weapon,
                            armor: hero.armor,
                        },
                    },
                    createdAt: new Date().toUTCString(),
                    updatedAt: new Date().toUTCString(),
                };
                actionEvents.push(actionEvent);
                monster_1.stamina.hitPoints -= value;
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
