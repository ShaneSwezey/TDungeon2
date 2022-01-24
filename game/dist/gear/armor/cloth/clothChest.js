"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clothChestFactory = void 0;
const armor_1 = require("../../../enums/armor");
const item_1 = require("../../../enums/item");
const clothChestFactory = (clothChestName) => {
    switch (clothChestName) {
        case armor_1.ClothChestName.DUSTYROBES:
            return dustyRobes();
        case armor_1.ClothChestName.DIRTYTUNIC:
            return dirtyTunic();
        case armor_1.ClothChestName.CLEANSHIRT:
            return cleanShirt();
        default:
            return bugClothChest();
    }
};
exports.clothChestFactory = clothChestFactory;
const bugClothChest = () => ({
    name: armor_1.ClothChestName.BUGCLOTHCHEST,
    hitPoints: 0,
    type: armor_1.ArmorType.CLOTH,
    slot: armor_1.ArmorSlot.CHEST,
    rarity: item_1.ItemRarity.LEGENDARY,
    imgSrc: ""
});
const dustyRobes = () => ({
    name: armor_1.ClothChestName.DUSTYROBES,
    hitPoints: 3,
    type: armor_1.ArmorType.CLOTH,
    slot: armor_1.ArmorSlot.CHEST,
    rarity: item_1.ItemRarity.COMMON,
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/armor/cloth/chest/cloak-common.svg"
});
const dirtyTunic = () => ({
    name: armor_1.ClothChestName.DIRTYTUNIC,
    hitPoints: 4,
    type: armor_1.ArmorType.CLOTH,
    slot: armor_1.ArmorSlot.CHEST,
    rarity: item_1.ItemRarity.COMMON,
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/armor/cloth/chest/fur-shirt-common.svg"
});
const cleanShirt = () => ({
    name: armor_1.ClothChestName.CLEANSHIRT,
    hitPoints: 5,
    type: armor_1.ArmorType.CLOTH,
    slot: armor_1.ArmorSlot.CHEST,
    rarity: item_1.ItemRarity.COMMON,
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/armor/cloth/chest/t-shirt-common.svg"
});
