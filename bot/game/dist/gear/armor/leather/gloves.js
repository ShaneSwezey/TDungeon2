"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomLeatherGloves = exports.leatherGloveFactory = void 0;
const armor_1 = require("../../../enums/armor");
const item_1 = require("../../../enums/item");
const math_1 = require("../../../utils/math");
const leatherGloveFactory = (leatherGloveName) => {
    switch (leatherGloveName) {
        case armor_1.LeatherGlovesName.DUSTYGLOVES:
            return dustyGloves();
        case armor_1.LeatherGlovesName.DWARFMININGGLOVES:
            return dwarfMingingGloves();
        case armor_1.LeatherGlovesName.SHREDDEDGLOVES:
            return shreddedGloves();
        case armor_1.LeatherGlovesName.THIEFGLOVES:
            return thiefGloves();
        default:
            return bugInfestedLeatherGloves();
    }
};
exports.leatherGloveFactory = leatherGloveFactory;
const getRandomLeatherGloves = (rarity) => {
    switch (rarity) {
        case item_1.CurrentAvailiableItemRarity.COMMON:
            return getRandomCommonLeatherGloves();
        case item_1.CurrentAvailiableItemRarity.UNCOMMON:
            return getRandomUncommonLeatherGloves();
        case item_1.CurrentAvailiableItemRarity.RARE:
            return getRandomRareLeatherGloves();
        default:
            return getRandomCommonLeatherGloves();
    }
};
exports.getRandomLeatherGloves = getRandomLeatherGloves;
const getRandomCommonLeatherGloves = () => {
    const randInt = (0, math_1.getRandomInt)(1, 2);
    if (randInt === 1) {
        return shreddedGloves();
    }
    else {
        return dustyGloves();
    }
};
const getRandomUncommonLeatherGloves = () => {
    return dwarfMingingGloves();
};
const getRandomRareLeatherGloves = () => {
    return thiefGloves();
};
const bugInfestedLeatherGloves = () => ({
    name: armor_1.LeatherGlovesName.BUGINFESTEDLEATHERGLOVES,
    hitPoints: 0,
    type: armor_1.ArmorType.LEATHER,
    slot: armor_1.ArmorSlot.GLOVES,
    rarity: item_1.ItemRarity.LEGENDARY,
    imgSrc: ""
});
const shreddedGloves = () => ({
    name: armor_1.LeatherGlovesName.SHREDDEDGLOVES,
    hitPoints: 3,
    type: armor_1.ArmorType.LEATHER,
    slot: armor_1.ArmorSlot.GLOVES,
    rarity: item_1.ItemRarity.COMMON,
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/armor/leather/gloves/hand-bandage-common.svg"
});
const dustyGloves = () => ({
    name: armor_1.LeatherGlovesName.DUSTYGLOVES,
    hitPoints: 3,
    type: armor_1.ArmorType.LEATHER,
    slot: armor_1.ArmorSlot.GLOVES,
    rarity: item_1.ItemRarity.COMMON,
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/armor/leather/gloves/gloves-common.svg"
});
const dwarfMingingGloves = () => ({
    name: armor_1.LeatherGlovesName.DWARFMININGGLOVES,
    hitPoints: 5,
    type: armor_1.ArmorType.LEATHER,
    slot: armor_1.ArmorSlot.GLOVES,
    rarity: item_1.ItemRarity.UNCOMMON,
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/armor/leather/gloves/fist-uncommon.svg"
});
const thiefGloves = () => ({
    name: armor_1.LeatherGlovesName.THIEFGLOVES,
    hitPoints: 7,
    attackPower: 2,
    type: armor_1.ArmorType.LEATHER,
    slot: armor_1.ArmorSlot.GLOVES,
    rarity: item_1.ItemRarity.RARE,
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/armor/leather/gloves/gloves-rare.svg"
});
