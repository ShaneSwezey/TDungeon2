"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomLeatherPants = exports.leatherPantsFactory = void 0;
const armor_1 = require("../../../enums/armor");
const item_1 = require("../../../enums/item");
const math_1 = require("../../../utils/math");
const leatherPantsFactory = (leatherPantsName) => {
    switch (leatherPantsName) {
        case armor_1.LeatherPantsName.DIRTYPANTS:
            return dirtyPants();
        case armor_1.LeatherPantsName.PATCHEDPANTS:
            return patchedPants();
        case armor_1.LeatherPantsName.DANCERSCHAPS:
            return dancersChaps();
        case armor_1.LeatherPantsName.MUSHROOMINFECTEDPANTS:
            return mushroomInfectedPants();
        default:
            return bugInfestedLeatherPants();
    }
};
exports.leatherPantsFactory = leatherPantsFactory;
const getRandomLeatherPants = (rarity) => {
    switch (rarity) {
        case item_1.CurrentAvailiableItemRarity.COMMON:
            return getRandomCommonLeatherPants();
        case item_1.CurrentAvailiableItemRarity.UNCOMMON:
            return getRandomUncommonLeatherPants();
        case item_1.CurrentAvailiableItemRarity.RARE:
            return getRandomRareLeatherPants();
        default:
            return getRandomCommonLeatherPants();
    }
};
exports.getRandomLeatherPants = getRandomLeatherPants;
const getRandomCommonLeatherPants = () => {
    const randInt = (0, math_1.getRandomInt)(1, 2);
    if (randInt === 1) {
        return dirtyPants();
    }
    else {
        return patchedPants();
    }
};
const getRandomUncommonLeatherPants = () => {
    return dancersChaps();
};
const getRandomRareLeatherPants = () => {
    return mushroomInfectedPants();
};
const bugInfestedLeatherPants = () => ({
    name: armor_1.LeatherPantsName.BUGINFESTEDLEATHERPANTS,
    hitPoints: 0,
    type: armor_1.ArmorType.LEATHER,
    slot: armor_1.ArmorSlot.PANTS,
    rarity: item_1.ItemRarity.LEGENDARY,
    imgSrc: ""
});
const dirtyPants = () => ({
    name: armor_1.LeatherPantsName.DIRTYPANTS,
    hitPoints: 2,
    type: armor_1.ArmorType.LEATHER,
    slot: armor_1.ArmorSlot.PANTS,
    rarity: item_1.ItemRarity.COMMON,
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/armor/leather/pants/trousers-common.svg"
});
const patchedPants = () => ({
    name: armor_1.LeatherPantsName.PATCHEDPANTS,
    hitPoints: 3,
    type: armor_1.ArmorType.LEATHER,
    slot: armor_1.ArmorSlot.PANTS,
    rarity: item_1.ItemRarity.COMMON,
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/armor/leather/pants/shorts-common.svg"
});
const dancersChaps = () => ({
    name: armor_1.LeatherPantsName.DANCERSCHAPS,
    hitPoints: 4,
    type: armor_1.ArmorType.LEATHER,
    slot: armor_1.ArmorSlot.PANTS,
    rarity: item_1.ItemRarity.UNCOMMON,
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/armor/leather/pants/underwear-uncommon.svg"
});
const mushroomInfectedPants = () => ({
    name: armor_1.LeatherPantsName.MUSHROOMINFECTEDPANTS,
    hitPoints: 6,
    attackPower: 3,
    type: armor_1.ArmorType.LEATHER,
    slot: armor_1.ArmorSlot.PANTS,
    rarity: item_1.ItemRarity.RARE,
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/armor/leather/pants/mushrooms-rare.svg"
});
