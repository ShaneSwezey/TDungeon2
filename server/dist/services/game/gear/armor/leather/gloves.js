"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leatherGloveFactory = exports.LeatherGlovesName = void 0;
var rarity_1 = require("../../rarity");
var __1 = require("..");
var LeatherGlovesName;
(function (LeatherGlovesName) {
    LeatherGlovesName["BUGINFESTEDLEATHERGLOVES"] = "Bug Infested Leather Gloves";
    LeatherGlovesName["SHREDDEDGLOVES"] = "Shredded Gloves";
    LeatherGlovesName["DUSTYGLOVES"] = "Dusty Gloves";
    LeatherGlovesName["DWARFMININGGLOVES"] = "Dwarf Mining Gloves";
    LeatherGlovesName["THIEFGLOVES"] = "Theif Gloves";
})(LeatherGlovesName = exports.LeatherGlovesName || (exports.LeatherGlovesName = {}));
var leatherGloveFactory = function (leatherGloveName) {
    switch (leatherGloveName) {
        case LeatherGlovesName.DUSTYGLOVES:
            return dustyGloves();
        case LeatherGlovesName.DWARFMININGGLOVES:
            return dwarfMingingGloves();
        case LeatherGlovesName.SHREDDEDGLOVES:
            return shreddedGloves();
        case LeatherGlovesName.THIEFGLOVES:
            return thiefGloves();
        default:
            return bugInfestedLeatherGloves();
    }
};
exports.leatherGloveFactory = leatherGloveFactory;
var bugInfestedLeatherGloves = function () { return ({
    name: LeatherGlovesName.BUGINFESTEDLEATHERGLOVES,
    hitPoints: 0,
    type: __1.ArmorType.LEATHER,
    slot: __1.ArmorSlot.GLOVES,
    rarity: rarity_1.ItemRarity.LEGENDARY
}); };
var shreddedGloves = function () { return ({
    name: LeatherGlovesName.SHREDDEDGLOVES,
    hitPoints: 3,
    type: __1.ArmorType.LEATHER,
    slot: __1.ArmorSlot.GLOVES,
    rarity: rarity_1.ItemRarity.COMMON
}); };
var dustyGloves = function () { return ({
    name: LeatherGlovesName.DUSTYGLOVES,
    hitPoints: 3,
    type: __1.ArmorType.LEATHER,
    slot: __1.ArmorSlot.GLOVES,
    rarity: rarity_1.ItemRarity.COMMON
}); };
var dwarfMingingGloves = function () { return ({
    name: LeatherGlovesName.DWARFMININGGLOVES,
    hitPoints: 5,
    type: __1.ArmorType.LEATHER,
    slot: __1.ArmorSlot.GLOVES,
    rarity: rarity_1.ItemRarity.UNCOMMON
}); };
var thiefGloves = function () { return ({
    name: LeatherGlovesName.THIEFGLOVES,
    hitPoints: 7,
    attackPower: 5,
    type: __1.ArmorType.LEATHER,
    slot: __1.ArmorSlot.GLOVES,
    rarity: rarity_1.ItemRarity.RARE
}); };
