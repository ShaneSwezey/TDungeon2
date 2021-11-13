"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orc = void 0;
var _1 = require(".");
var attack_1 = require("../stats/attack");
var math_1 = require("../utils/math");
var orc = function (_a) {
    var id = _a.id, currentHitPoints = _a.currentHitPoints;
    return ({
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
};
exports.orc = orc;
