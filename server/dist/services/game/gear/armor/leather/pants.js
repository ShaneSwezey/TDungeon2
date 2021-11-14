"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leatherPantsFactory = exports.LeatherPantsName = void 0;
const rarity_1 = require("../../rarity");
const __1 = require("..");
var LeatherPantsName;
(function (LeatherPantsName) {
    LeatherPantsName["BUGINFESTEDLEATHERPANTS"] = "Bug Infested Leather Pants";
    LeatherPantsName["DANCERSCHAPS"] = "Dancers Chaps";
    LeatherPantsName["DIRTYPANTS"] = "Dirty Pants";
    LeatherPantsName["PATCHEDPANTS"] = "Patched Pants";
    LeatherPantsName["MUSHROOMINFECTEDPANTS"] = "Mushroom Infected Pants";
})(LeatherPantsName = exports.LeatherPantsName || (exports.LeatherPantsName = {}));
const leatherPantsFactory = (leatherPantsName) => {
    switch (leatherPantsName) {
        case LeatherPantsName.DIRTYPANTS:
            return dirtyPants();
        case LeatherPantsName.PATCHEDPANTS:
            return patchedPants();
        case LeatherPantsName.DANCERSCHAPS:
            return dancersChaps();
        case LeatherPantsName.MUSHROOMINFECTEDPANTS:
            return mushroomInfectedPants();
        default:
            return bugInfestedLeatherPants();
    }
};
exports.leatherPantsFactory = leatherPantsFactory;
const bugInfestedLeatherPants = () => ({
    name: LeatherPantsName.BUGINFESTEDLEATHERPANTS,
    hitPoints: 0,
    type: __1.ArmorType.LEATHER,
    slot: __1.ArmorSlot.PANTS,
    rarity: rarity_1.ItemRarity.LEGENDARY
});
const dirtyPants = () => ({
    name: LeatherPantsName.DIRTYPANTS,
    hitPoints: 4,
    type: __1.ArmorType.LEATHER,
    slot: __1.ArmorSlot.PANTS,
    rarity: rarity_1.ItemRarity.COMMON
});
const patchedPants = () => ({
    name: LeatherPantsName.PATCHEDPANTS,
    hitPoints: 4,
    type: __1.ArmorType.LEATHER,
    slot: __1.ArmorSlot.PANTS,
    rarity: rarity_1.ItemRarity.COMMON
});
const dancersChaps = () => ({
    name: LeatherPantsName.DANCERSCHAPS,
    hitPoints: 6,
    type: __1.ArmorType.LEATHER,
    slot: __1.ArmorSlot.PANTS,
    rarity: rarity_1.ItemRarity.UNCOMMON
});
const mushroomInfectedPants = () => ({
    name: LeatherPantsName.BUGINFESTEDLEATHERPANTS,
    hitPoints: 6,
    attackPower: 4,
    type: __1.ArmorType.LEATHER,
    slot: __1.ArmorSlot.PANTS,
    rarity: rarity_1.ItemRarity.RARE
});
