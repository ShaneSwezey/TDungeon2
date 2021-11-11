"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orc = void 0;
var _1 = require(".");
var orc = function () { return ({
    type: _1.MonsterType.Orc,
    stamina: {
        maxHitPoints: 10,
        hitPoints: 10
    },
    attack: {
        low: 3,
        high: 5,
        attackPower: 0,
    }
}); };
exports.orc = orc;
