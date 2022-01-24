"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomOneHandedSword = exports.oneHandedSwordFactory = void 0;
const item_1 = require("../../enums/item");
const weapon_1 = require("../../enums/weapon");
const math_1 = require("../../utils/math");
const oneHandedSwordFactory = (oneHandedSwordName) => {
    switch (oneHandedSwordName) {
        case weapon_1.OneHandedSwordName.RUSTYSWORD:
            return rustySword();
        case weapon_1.OneHandedSwordName.CRACKEDSABRE:
            return crackedSabre();
        case weapon_1.OneHandedSwordName.KNIGHTSSIDE:
            return knightsSide();
        case weapon_1.OneHandedSwordName.COPPERBLADE:
            return copperBlade();
        default:
            throw new Error(`One handed sword: ${oneHandedSwordName} was not found!`);
    }
};
exports.oneHandedSwordFactory = oneHandedSwordFactory;
const getRandomOneHandedSword = (rarity) => {
    switch (rarity) {
        case item_1.CurrentAvailiableItemRarity.COMMON:
            return getRandomCommonOneHandedSword();
        case item_1.CurrentAvailiableItemRarity.UNCOMMON:
            return getRandomUncommonOneHandedSword();
        case item_1.CurrentAvailiableItemRarity.RARE:
            return getRandomRareOneHandedSword();
        default:
            return getRandomCommonOneHandedSword();
    }
};
exports.getRandomOneHandedSword = getRandomOneHandedSword;
const getRandomCommonOneHandedSword = () => {
    const randInt = (0, math_1.getRandomInt)(1, 2);
    if (randInt === 1) {
        return rustySword();
    }
    else {
        return crackedSabre();
    }
};
const getRandomUncommonOneHandedSword = () => {
    return copperBlade();
};
const getRandomRareOneHandedSword = () => {
    return knightsSide();
};
const rustySword = () => ({
    name: weapon_1.OneHandedSwordName.RUSTYSWORD,
    type: weapon_1.WeaponType.ONEHANDEDSWORD,
    rarity: item_1.ItemRarity.COMMON,
    damage: {
        low: 3,
        high: 5
    },
    crit: {
        chance: 5,
        multiplier: 2,
    },
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/weapons/onehandedswords/rusty-sword-common.svg"
});
const crackedSabre = () => ({
    name: weapon_1.OneHandedSwordName.CRACKEDSABRE,
    type: weapon_1.WeaponType.ONEHANDEDSWORD,
    rarity: item_1.ItemRarity.COMMON,
    damage: {
        low: 4,
        high: 7,
    },
    crit: {
        chance: 6,
        multiplier: 1.5
    },
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/weapons/onehandedswords/cracked-saber-common.svg"
});
const copperBlade = () => ({
    name: weapon_1.OneHandedSwordName.COPPERBLADE,
    type: weapon_1.WeaponType.ONEHANDEDSWORD,
    rarity: item_1.ItemRarity.UNCOMMON,
    damage: {
        low: 7,
        high: 11,
    },
    crit: {
        chance: 7,
        multiplier: 1.5
    },
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/weapons/onehandedswords/croc-sword-uncommon.svg"
});
const knightsSide = () => ({
    name: weapon_1.OneHandedSwordName.KNIGHTSSIDE,
    type: weapon_1.WeaponType.ONEHANDEDSWORD,
    rarity: item_1.ItemRarity.RARE,
    damage: {
        low: 9,
        high: 15
    },
    crit: {
        chance: 9,
        multiplier: 2
    },
    flurry: {
        chance: 15,
        num: {
            high: 3,
            low: 2
        }
    },
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/weapons/onehandedswords/dripping-sword-rare.svg"
});
