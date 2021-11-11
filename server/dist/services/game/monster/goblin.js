"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeGoblinAttack = exports.goblin = void 0;
var attack_1 = require("../actions/attack");
var math_1 = require("../utils/math");
var monster_1 = require("../monster");
var goblin = function () { return ({
    type: monster_1.MonsterType.Goblin,
    stamina: {
        maxHitPoints: 5,
        hitPoints: 5,
    },
    attack: {
        low: 1,
        high: 3,
        attackPower: 0,
    },
}); };
exports.goblin = goblin;
var executeGoblinAttack = function (goblin, heroes) {
    // select up to 5 heroes for the Goblin to attack
    var selectedHeroes = math_1.selectRandomHeroes(heroes, 5);
    // 
    attack_1.attackHeroes(selectedHeroes, [goblin]);
    // Rend
    // const heroesWithRend = chanceToApplyRend({ heroes, dmg: 1, duration: 3, chance: 25 });
    return { monster: goblin, heroes: heroes, message: null };
};
exports.executeGoblinAttack = executeGoblinAttack;
