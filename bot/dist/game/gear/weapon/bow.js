"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomBow = exports.bowFactory = void 0;
const item_1 = require("../../enums/item");
const weapon_1 = require("../../enums/weapon");
const math_1 = require("../../utils/math");
const bowFactory = (bowName) => {
    switch (bowName) {
        case weapon_1.BowName.TWIGBOW:
            return twigBow();
        case weapon_1.BowName.CRACKEDOAKBOW:
            return crackedOakBow();
        case weapon_1.BowName.WOODSMANBOW:
            return woodsmanBow();
        case weapon_1.BowName.ELEVENSOLIDERBOW:
            return elevenSoliderBow();
        case weapon_1.BowName.PLAINSTROLLBOW:
            return plainsTrollBow();
        default:
            throw new Error(`Bow: ${bowName} was not found!`);
    }
};
exports.bowFactory = bowFactory;
const getRandomBow = (rarity) => {
    switch (rarity) {
        case item_1.CurrentAvailiableItemRarity.COMMON:
            return getRandomCommonBow();
        case item_1.CurrentAvailiableItemRarity.UNCOMMON:
            return getRandomUncommonBow();
        case item_1.CurrentAvailiableItemRarity.RARE:
            return getRandomRareBow();
        default:
            return getRandomCommonBow();
    }
};
exports.getRandomBow = getRandomBow;
const getRandomCommonBow = () => {
    const randInt = (0, math_1.getRandomInt)(1, 2);
    if (randInt === 1) {
        return twigBow();
    }
    else {
        return crackedOakBow();
    }
};
const getRandomUncommonBow = () => {
    const randInt = (0, math_1.getRandomInt)(1, 2);
    if (randInt === 1) {
        return woodsmanBow();
    }
    else {
        return elevenSoliderBow();
    }
};
const getRandomRareBow = () => {
    return plainsTrollBow();
};
const twigBow = () => ({
    name: weapon_1.BowName.TWIGBOW,
    type: weapon_1.WeaponType.BOW,
    rarity: item_1.ItemRarity.COMMON,
    damage: {
        low: 3,
        high: 4
    },
    crit: {
        chance: 6,
        multiplier: 2
    },
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/weapons/bow/bow-arrow-common.svg"
});
const crackedOakBow = () => ({
    name: weapon_1.BowName.CRACKEDOAKBOW,
    type: weapon_1.WeaponType.BOW,
    rarity: item_1.ItemRarity.COMMON,
    damage: {
        low: 5,
        high: 8
    },
    crit: {
        chance: 7,
        multiplier: 2
    },
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/weapons/bow/bow-string-common.svg"
});
const woodsmanBow = () => ({
    name: weapon_1.BowName.WOODSMANBOW,
    type: weapon_1.WeaponType.BOW,
    rarity: item_1.ItemRarity.UNCOMMON,
    damage: {
        low: 7,
        high: 11
    },
    crit: {
        chance: 10,
        multiplier: 1.5
    },
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/weapons/bow/high-shot-uncommon.svg"
});
const elevenSoliderBow = () => ({
    name: weapon_1.BowName.ELEVENSOLIDERBOW,
    type: weapon_1.WeaponType.BOW,
    rarity: item_1.ItemRarity.UNCOMMON,
    damage: {
        low: 9,
        high: 15
    },
    crit: {
        chance: 10,
        multiplier: 2
    },
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/weapons/bow/pocket-bow-uncommon.svg"
});
const plainsTrollBow = () => ({
    name: weapon_1.BowName.PLAINSTROLLBOW,
    type: weapon_1.WeaponType.BOW,
    rarity: item_1.ItemRarity.RARE,
    damage: {
        low: 11,
        high: 19
    },
    crit: {
        chance: 12,
        multiplier: 1.75
    },
    flurry: {
        chance: 15,
        num: {
            low: 2,
            high: 2
        }
    },
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/weapons/bow/heavy-arrow-rare.svg"
});
