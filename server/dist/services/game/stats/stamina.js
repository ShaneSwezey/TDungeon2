"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStamina = void 0;
var getHitPointsMax = function (armor) { return armor.map(function (armor) { return armor.hitPoints; }).reduce(function (a, b) { return a + b; }); };
var getStamina = function (armor, currentHitPoints) {
    var maxStamina = getHitPointsMax(armor);
    return {
        maxHitPoints: maxStamina,
        hitPoints: currentHitPoints ? parseInt(currentHitPoints) : maxStamina
    };
};
exports.getStamina = getStamina;
