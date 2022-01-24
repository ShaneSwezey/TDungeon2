"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomTwoHandedAxe = exports.twoHandedAxeFactory = void 0;
const weapon_1 = require("../../enums/weapon");
const item_1 = require("../../enums/item");
const twoHandedAxeFactory = (twoHandedAxeName) => {
    switch (twoHandedAxeName) {
        case weapon_1.TwoHandedAxeName.LUMBERAXE:
            return lumberAxe();
        case weapon_1.TwoHandedAxeName.BARRACKAXE:
            return barrackAxe();
        case weapon_1.TwoHandedAxeName.MOGROKSLOSTAXE:
            return mogroksLostAxe();
        default:
            throw new Error(`Two handed axe ${twoHandedAxeName} was not found!`);
    }
};
exports.twoHandedAxeFactory = twoHandedAxeFactory;
const getRandomTwoHandedAxe = (rarity) => {
    switch (rarity) {
        case item_1.CurrentAvailiableItemRarity.COMMON:
            return getRandomCommonTwoHandedAxe();
        case item_1.CurrentAvailiableItemRarity.UNCOMMON:
            return getRandomUncommonTwoHandedAxe();
        case item_1.CurrentAvailiableItemRarity.RARE:
            return getRandomRareTwoHandedAxe();
        default:
            return getRandomCommonTwoHandedAxe();
    }
};
exports.getRandomTwoHandedAxe = getRandomTwoHandedAxe;
const getRandomCommonTwoHandedAxe = () => {
    return lumberAxe();
};
const getRandomUncommonTwoHandedAxe = () => {
    return barrackAxe();
};
const getRandomRareTwoHandedAxe = () => {
    return mogroksLostAxe();
};
const lumberAxe = () => ({
    name: weapon_1.TwoHandedAxeName.LUMBERAXE,
    type: weapon_1.WeaponType.TWOHANDEDAXE,
    rarity: item_1.ItemRarity.COMMON,
    damage: {
        low: 5,
        high: 8
    },
    crit: {
        chance: 5,
        multiplier: 2
    },
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/weapons/twohandedaxe/axe-in-log-common.svg"
});
const barrackAxe = () => ({
    name: weapon_1.TwoHandedAxeName.BARRACKAXE,
    type: weapon_1.WeaponType.TWOHANDEDAXE,
    rarity: item_1.ItemRarity.UNCOMMON,
    damage: {
        low: 7,
        high: 12,
    },
    crit: {
        chance: 7,
        multiplier: 2
    },
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/weapons/twohandedaxe/battered-axe-uncommon.svg"
});
const mogroksLostAxe = () => ({
    name: weapon_1.TwoHandedAxeName.MOGROKSLOSTAXE,
    type: weapon_1.WeaponType.TWOHANDEDAXE,
    rarity: item_1.ItemRarity.RARE,
    damage: {
        low: 12,
        high: 24,
    },
    crit: {
        chance: 14,
        multiplier: 1.5
    },
    cleave: {
        chance: 15,
        num: {
            low: 2,
            high: 2
        }
    },
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/weapons/twohandedaxe/war-axe-rare.svg"
});
