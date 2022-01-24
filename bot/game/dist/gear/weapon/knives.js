"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomKnife = exports.knifeFactory = void 0;
const weapon_1 = require("../../enums/weapon");
const item_1 = require("../../enums/item");
const math_1 = require("../../utils/math");
const knifeFactory = (knifeName) => {
    switch (knifeName) {
        case weapon_1.KnifeName.BUTTERKNIFE:
            return butterKnife();
        case weapon_1.KnifeName.KRISBLADE:
            return krisBlade();
        case weapon_1.KnifeName.LETTEROPENER:
            return letterOpener();
        case weapon_1.KnifeName.THIEFBLADE:
            return thiefBlade();
        case weapon_1.KnifeName.SHANK:
            return shank();
        default:
            throw new Error(`Knife: ${knifeName} was not found!`);
    }
};
exports.knifeFactory = knifeFactory;
const getRandomKnife = (rarity) => {
    switch (rarity) {
        case item_1.CurrentAvailiableItemRarity.COMMON:
            return getRandomCommonKnife();
        case item_1.CurrentAvailiableItemRarity.UNCOMMON:
            return getRandomUncommonKnife();
        case item_1.CurrentAvailiableItemRarity.RARE:
            return getRandomRareKnife();
        default:
            return getRandomCommonKnife();
    }
};
exports.getRandomKnife = getRandomKnife;
const getRandomCommonKnife = () => {
    const randInt = (0, math_1.getRandomInt)(1, 2);
    if (randInt === 1) {
        return butterKnife();
    }
    else {
        return krisBlade();
    }
};
const getRandomRareKnife = () => {
    return shank();
};
const getRandomUncommonKnife = () => {
    const randInt = (0, math_1.getRandomInt)(1, 2);
    if (randInt === 1) {
        return letterOpener();
    }
    else {
        return thiefBlade();
    }
};
const butterKnife = () => ({
    name: weapon_1.KnifeName.BUTTERKNIFE,
    type: weapon_1.WeaponType.KNIFE,
    rarity: item_1.ItemRarity.COMMON,
    damage: {
        low: 1,
        high: 3
    },
    crit: {
        chance: 5,
        multiplier: 2,
    },
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/weapons/knife/butter-common.svg"
});
const krisBlade = () => ({
    name: weapon_1.KnifeName.KRISBLADE,
    type: weapon_1.WeaponType.KNIFE,
    rarity: item_1.ItemRarity.COMMON,
    damage: {
        low: 2,
        high: 4
    },
    crit: {
        chance: 7,
        multiplier: 2
    },
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/weapons/knife/bone-knife-common.svg"
});
const letterOpener = () => ({
    name: weapon_1.KnifeName.LETTEROPENER,
    type: weapon_1.WeaponType.KNIFE,
    rarity: item_1.ItemRarity.UNCOMMON,
    damage: {
        low: 3,
        high: 5
    },
    crit: {
        chance: 7,
        multiplier: 2
    },
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/weapons/knife/switch-blade-uncommon.svg"
});
const thiefBlade = () => ({
    name: weapon_1.KnifeName.THIEFBLADE,
    type: weapon_1.WeaponType.KNIFE,
    rarity: item_1.ItemRarity.UNCOMMON,
    damage: {
        high: 7,
        low: 4,
    },
    crit: {
        chance: 9,
        multiplier: 1.5
    },
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/weapons/knife/bowie-knife-uncommon.svg"
});
const shank = () => ({
    name: weapon_1.KnifeName.SHANK,
    type: weapon_1.WeaponType.KNIFE,
    rarity: item_1.ItemRarity.RARE,
    damage: {
        high: 10,
        low: 5,
    },
    crit: {
        chance: 12,
        multiplier: 2,
    },
    flurry: {
        chance: 15,
        num: {
            high: 3,
            low: 2
        }
    },
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/weapons/knife/shank-rare.svg"
});
