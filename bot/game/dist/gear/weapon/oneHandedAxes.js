"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomOneHandedAxe = exports.oneHandedAxeFactory = void 0;
const item_1 = require("../../enums/item");
const weapon_1 = require("../../enums/weapon");
const math_1 = require("../../utils/math");
const oneHandedAxeFactory = (oneHandedAxeName) => {
    switch (oneHandedAxeName) {
        case weapon_1.OneHandedAxeName.RUSTYAXE:
            return rustyAxe();
        case weapon_1.OneHandedAxeName.HATCHET:
            return hatchet();
        case weapon_1.OneHandedAxeName.LUMBERWICKER:
            return lumberWicker();
        default:
            throw new Error(`One handed axe: ${oneHandedAxeName} was not found`);
    }
};
exports.oneHandedAxeFactory = oneHandedAxeFactory;
const getRandomOneHandedAxe = (rarity) => {
    switch (rarity) {
        case item_1.CurrentAvailiableItemRarity.COMMON:
            return getRandomCommonOneHandedAxe();
        case item_1.CurrentAvailiableItemRarity.UNCOMMON:
            return getRandomUncommonOneHandedAxe();
        case item_1.CurrentAvailiableItemRarity.RARE:
            return getRandomUncommonOneHandedAxe();
        default:
            return getRandomCommonOneHandedAxe();
    }
};
exports.getRandomOneHandedAxe = getRandomOneHandedAxe;
const getRandomCommonOneHandedAxe = () => {
    const randInt = (0, math_1.getRandomInt)(1, 2);
    if (randInt === 1) {
        return rustyAxe();
    }
    else {
        return hatchet();
    }
};
const getRandomUncommonOneHandedAxe = () => {
    return lumberWicker();
};
const rustyAxe = () => ({
    name: weapon_1.OneHandedAxeName.RUSTYAXE,
    type: weapon_1.WeaponType.ONEHANDEDAXE,
    rarity: item_1.ItemRarity.COMMON,
    damage: {
        low: 2,
        high: 4,
    },
    crit: {
        chance: 5,
        multiplier: 2,
    },
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/weapons/onehandedaxe/stone-axe-common.svg"
});
const hatchet = () => ({
    name: weapon_1.OneHandedAxeName.HATCHET,
    type: weapon_1.WeaponType.ONEHANDEDAXE,
    rarity: item_1.ItemRarity.COMMON,
    damage: {
        low: 5,
        high: 9,
    },
    crit: {
        chance: 6,
        multiplier: 2,
    },
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/weapons/onehandedaxe/hatchet-common.svg"
});
const lumberWicker = () => ({
    name: weapon_1.OneHandedAxeName.LUMBERWICKER,
    type: weapon_1.WeaponType.ONEHANDEDAXE,
    rarity: item_1.ItemRarity.UNCOMMON,
    damage: {
        low: 6,
        high: 11,
    },
    crit: {
        chance: 8,
        multiplier: 2
    },
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/weapons/onehandedaxe/axe-in-stump-uncommon.svg"
});
