"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomLeatherChest = exports.leatherChestFactory = void 0;
const armor_1 = require("../../../enums/armor");
const item_1 = require("../../../enums/item");
const math_1 = require("../../../utils/math");
const leatherChestFactory = (leatherChestName) => {
    switch (leatherChestName) {
        case armor_1.LeatherChestName.TATTEREDCHEST:
            return tatteredChest();
        case armor_1.LeatherChestName.JERKIN:
            return jerking();
        case armor_1.LeatherChestName.GOBLINSOLDIERLEATHERJACKET:
            return goblinSoliderLeatherJacket();
        default:
            return bugInfestedLeatherChest();
    }
};
exports.leatherChestFactory = leatherChestFactory;
const getRandomLeatherChest = (rarity) => {
    switch (rarity) {
        case item_1.CurrentAvailiableItemRarity.COMMON:
            return getRandomCommonLeatherChest();
        case item_1.CurrentAvailiableItemRarity.UNCOMMON:
            return getRandomUncommonLeatherChest();
        default:
            return getRandomCommonLeatherChest();
    }
};
exports.getRandomLeatherChest = getRandomLeatherChest;
const getRandomCommonLeatherChest = () => {
    const randInt = (0, math_1.getRandomInt)(1, 2);
    if (randInt === 1) {
        return tatteredChest();
    }
    else {
        return jerking();
    }
};
const getRandomUncommonLeatherChest = () => {
    return goblinSoliderLeatherJacket();
};
const bugInfestedLeatherChest = () => ({
    name: armor_1.LeatherChestName.BUGINFESTEDLEAHTERCHEST,
    hitPoints: 0,
    type: armor_1.ArmorType.LEATHER,
    slot: armor_1.ArmorSlot.CHEST,
    rarity: item_1.ItemRarity.LEGENDARY,
    imgSrc: ""
});
const tatteredChest = () => ({
    name: armor_1.LeatherChestName.TATTEREDCHEST,
    hitPoints: 4,
    type: armor_1.ArmorType.LEATHER,
    slot: armor_1.ArmorSlot.CHEST,
    rarity: item_1.ItemRarity.COMMON,
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/armor/leather/chest/fur-shirt-common.svg"
});
const jerking = () => ({
    name: armor_1.LeatherChestName.JERKIN,
    hitPoints: 6,
    type: armor_1.ArmorType.LEATHER,
    slot: armor_1.ArmorSlot.CHEST,
    rarity: item_1.ItemRarity.COMMON,
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/armor/leather/chest/sleeveless-jacket-common.svg"
});
const goblinSoliderLeatherJacket = () => ({
    name: armor_1.LeatherChestName.GOBLINSOLDIERLEATHERJACKET,
    hitPoints: 8,
    type: armor_1.ArmorType.LEATHER,
    slot: armor_1.ArmorSlot.CHEST,
    rarity: item_1.ItemRarity.UNCOMMON,
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/armor/leather/chest/life-jacket-uncommon.svg"
});
