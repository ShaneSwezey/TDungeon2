"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.goblin = void 0;
const math_1 = require("../utils/math");
const _1 = require(".");
const attack_1 = require("../stats/attack");
const goblin = ({ id, currentHitPoints }) => ({
    id: id ? id : math_1.getUuid(),
    type: _1.MonsterType.Goblin,
    stamina: {
        maxHitPoints: 5,
        hitPoints: currentHitPoints ? parseInt(currentHitPoints) : 5,
    },
    attack: {
        low: 1,
        high: 3,
        attackPower: 0,
        type: attack_1.MonsterAttackType.STABBED,
    },
});
exports.goblin = goblin;
// export const executeGoblinAttack = (goblin: Goblin, heroes: Hero[]) => {
//     // select up to 5 heroes for the Goblin to attack
//     const selectedHeroes = selectRandomHeroes(heroes, 5);
//     // 
//     attackHeroes(selectedHeroes, [goblin]);
//     // Rend
//     // const heroesWithRend = chanceToApplyRend({ heroes, dmg: 1, duration: 3, chance: 25 });
//     return { monster: goblin, heroes , message: null }
// }
