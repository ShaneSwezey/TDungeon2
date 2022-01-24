"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomTwoHandedSword = exports.twoHandedSwordFactory = void 0;
const weapon_1 = require("../../enums/weapon");
const item_1 = require("../../enums/item");
const math_1 = require("../../utils/math");
const twoHandedSwordFactory = (twoHandedSwordName) => {
    switch (twoHandedSwordName) {
        case weapon_1.TwoHandedSwordName.TRAININGSWORD:
            return trainingSword();
        case weapon_1.TwoHandedSwordName.SCUFFEDBLADE:
            return scuffedBlade();
        case weapon_1.TwoHandedSwordName.OLDCLAYMORE:
            return oldClaymore();
        case weapon_1.TwoHandedSwordName.LIONHEART:
            return lionHeart();
        default:
            throw new Error(`Two handed sword: ${twoHandedSwordName} was not found!`);
    }
};
exports.twoHandedSwordFactory = twoHandedSwordFactory;
const getRandomTwoHandedSword = (rarity) => {
    switch (rarity) {
        case item_1.CurrentAvailiableItemRarity.COMMON:
            return getRandomCommonTwoHandedSword();
        case item_1.CurrentAvailiableItemRarity.UNCOMMON:
            return getRandomUncommonTwoHandedSword();
        case item_1.CurrentAvailiableItemRarity.RARE:
            return getRandomRareTwoHandedSword();
        default:
            return getRandomCommonTwoHandedSword();
    }
};
exports.getRandomTwoHandedSword = getRandomTwoHandedSword;
const getRandomCommonTwoHandedSword = () => {
    const randInt = (0, math_1.getRandomInt)(1, 2);
    if (randInt === 1) {
        return trainingSword();
    }
    else {
        return scuffedBlade();
    }
};
const getRandomUncommonTwoHandedSword = () => {
    return oldClaymore();
};
const getRandomRareTwoHandedSword = () => {
    return lionHeart();
};
const trainingSword = () => ({
    name: weapon_1.TwoHandedSwordName.TRAININGSWORD,
    type: weapon_1.WeaponType.TWOHANDEDSWORD,
    rarity: item_1.ItemRarity.COMMON,
    damage: {
        low: 4,
        high: 7
    },
    crit: {
        chance: 4,
        multiplier: 2
    },
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/weapons/twohandedswords/bo-common.svg"
});
const scuffedBlade = () => ({
    name: weapon_1.TwoHandedSwordName.SCUFFEDBLADE,
    type: weapon_1.WeaponType.TWOHANDEDSWORD,
    rarity: item_1.ItemRarity.COMMON,
    damage: {
        low: 5,
        high: 10
    },
    crit: {
        chance: 7,
        multiplier: 2
    },
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/weapons/twohandedswords/ancient-sword-common.svg"
});
const oldClaymore = () => ({
    name: weapon_1.TwoHandedSwordName.OLDCLAYMORE,
    type: weapon_1.WeaponType.TWOHANDEDSWORD,
    rarity: item_1.ItemRarity.UNCOMMON,
    damage: {
        low: 11,
        high: 16
    },
    crit: {
        chance: 10,
        multiplier: 2
    },
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/weapons/twohandedswords/stiletto-uncommon.svg"
});
const lionHeart = () => ({
    name: weapon_1.TwoHandedSwordName.LIONHEART,
    type: weapon_1.WeaponType.TWOHANDEDSWORD,
    rarity: item_1.ItemRarity.RARE,
    damage: {
        low: 14,
        high: 21
    },
    crit: {
        chance: 10,
        multiplier: 1.5,
    },
    flurry: {
        chance: 15,
        num: {
            low: 2,
            high: 2
        }
    },
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/weapons/twohandedswords/pointy-sword-rare.svg"
});
