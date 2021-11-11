"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStartingStamina = void 0;
var getHitPointsMax = function (armor) { return armor.map(function (armor) { return armor.hitPoints; }).reduce(function (a, b) { return a + b; }); };
var getStartingStamina = function (armor) {
    var maxStamina = getHitPointsMax(armor);
    return {
        maxHitPoints: maxStamina,
        hitPoints: maxStamina,
    };
};
exports.getStartingStamina = getStartingStamina;
