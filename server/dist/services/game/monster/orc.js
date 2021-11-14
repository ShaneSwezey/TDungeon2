"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orc = void 0;
const _1 = require(".");
const attack_1 = require("../stats/attack");
const math_1 = require("../utils/math");
const orc = ({ id, currentHitPoints }) => ({
    id: id ? id : math_1.getUuid(),
    type: _1.MonsterType.Orc,
    stamina: {
        maxHitPoints: 10,
        hitPoints: currentHitPoints ? parseInt(currentHitPoints) : 10
    },
    attack: {
        low: 3,
        high: 5,
        attackPower: 0,
        type: attack_1.MonsterAttackType.SLASH,
    }
});
exports.orc = orc;
