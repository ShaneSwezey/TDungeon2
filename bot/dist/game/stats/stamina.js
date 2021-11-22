"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStamina = void 0;
const getHitPointsMax = (armor) => armor.map(armor => armor.hitPoints).reduce((a, b) => a + b);
const getStamina = (armor, currentHitPoints) => {
    const maxStamina = getHitPointsMax(armor);
    return {
        maxHitPoints: maxStamina,
        hitPoints: currentHitPoints ? parseInt(currentHitPoints) : maxStamina
    };
};
exports.getStamina = getStamina;
