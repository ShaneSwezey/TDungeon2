"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ghoul = void 0;
const _1 = require(".");
const attack_1 = require("../stats/attack");
const math_1 = require("../utils/math");
const ghoul = ({ id, currentHitPoints }) => ({
    id: id ? id : math_1.getUuid(),
    type: _1.MonsterType.GHOUL,
    stamina: {
        maxHitPoints: 5,
        hitPoints: currentHitPoints ? parseInt(currentHitPoints) : 5,
    },
    attack: {
        low: 1,
        high: 3,
        attackPower: 0,
        type: attack_1.MonsterAttackType.SCRATCH,
    },
});
exports.ghoul = ghoul;
