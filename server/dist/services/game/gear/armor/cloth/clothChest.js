"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clothChestFactory = exports.ClothChestName = void 0;
var rarity_1 = require("../../rarity");
var __1 = require("..");
var ClothChestName;
(function (ClothChestName) {
    ClothChestName["DUSTYROBES"] = "Dusty Robes";
    ClothChestName["DIRTYTUNIC"] = "Dirty Tunic";
    ClothChestName["CLEANSHIRT"] = "Clean Shirt";
    ClothChestName["BUGCLOTHCHEST"] = "Bug Infested Cloth Chest";
})(ClothChestName = exports.ClothChestName || (exports.ClothChestName = {}));
var clothChestFactory = function (clothChestName) {
    switch (clothChestName) {
        case ClothChestName.DUSTYROBES:
            return dustyRobes();
        case ClothChestName.DIRTYTUNIC:
            return dirtyTunic();
        case ClothChestName.CLEANSHIRT:
            return cleanShirt();
        default:
            return bugClothChest();
    }
};
exports.clothChestFactory = clothChestFactory;
var bugClothChest = function () { return ({
    name: ClothChestName.BUGCLOTHCHEST,
    hitPoints: 0,
    type: __1.ArmorType.CLOTH,
    slot: __1.ArmorSlot.CHEST,
    rarity: rarity_1.ItemRarity.LEGENDARY
}); };
var dustyRobes = function () { return ({
    name: ClothChestName.DUSTYROBES,
    hitPoints: 3,
    type: __1.ArmorType.CLOTH,
    slot: __1.ArmorSlot.CHEST,
    rarity: rarity_1.ItemRarity.COMMON
}); };
var dirtyTunic = function () { return ({
    name: ClothChestName.DIRTYTUNIC,
    hitPoints: 4,
    type: __1.ArmorType.CLOTH,
    slot: __1.ArmorSlot.CHEST,
    rarity: rarity_1.ItemRarity.COMMON
}); };
var cleanShirt = function () { return ({
    name: ClothChestName.CLEANSHIRT,
    hitPoints: 5,
    type: __1.ArmorType.CLOTH,
    slot: __1.ArmorSlot.CHEST,
    rarity: rarity_1.ItemRarity.COMMON
}); };
