"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leatherGloveFactory = exports.LeatherGlovesName = void 0;
const rarity_1 = require("../../rarity");
const __1 = require("..");
var LeatherGlovesName;
(function (LeatherGlovesName) {
    LeatherGlovesName["BUGINFESTEDLEATHERGLOVES"] = "Bug Infested Leather Gloves";
    LeatherGlovesName["SHREDDEDGLOVES"] = "Shredded Gloves";
    LeatherGlovesName["DUSTYGLOVES"] = "Dusty Gloves";
    LeatherGlovesName["DWARFMININGGLOVES"] = "Dwarf Mining Gloves";
    LeatherGlovesName["THIEFGLOVES"] = "Theif Gloves";
})(LeatherGlovesName = exports.LeatherGlovesName || (exports.LeatherGlovesName = {}));
const leatherGloveFactory = (leatherGloveName) => {
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
const bugInfestedLeatherGloves = () => ({
    name: LeatherGlovesName.BUGINFESTEDLEATHERGLOVES,
    hitPoints: 0,
    type: __1.ArmorType.LEATHER,
    slot: __1.ArmorSlot.GLOVES,
    rarity: rarity_1.ItemRarity.LEGENDARY
});
const shreddedGloves = () => ({
    name: LeatherGlovesName.SHREDDEDGLOVES,
    hitPoints: 3,
    type: __1.ArmorType.LEATHER,
    slot: __1.ArmorSlot.GLOVES,
    rarity: rarity_1.ItemRarity.COMMON
});
const dustyGloves = () => ({
    name: LeatherGlovesName.DUSTYGLOVES,
    hitPoints: 3,
    type: __1.ArmorType.LEATHER,
    slot: __1.ArmorSlot.GLOVES,
    rarity: rarity_1.ItemRarity.COMMON
});
const dwarfMingingGloves = () => ({
    name: LeatherGlovesName.DWARFMININGGLOVES,
    hitPoints: 5,
    type: __1.ArmorType.LEATHER,
    slot: __1.ArmorSlot.GLOVES,
    rarity: rarity_1.ItemRarity.UNCOMMON
});
const thiefGloves = () => ({
    name: LeatherGlovesName.THIEFGLOVES,
    hitPoints: 7,
    attackPower: 2,
    type: __1.ArmorType.LEATHER,
    slot: __1.ArmorSlot.GLOVES,
    rarity: rarity_1.ItemRarity.RARE
});
