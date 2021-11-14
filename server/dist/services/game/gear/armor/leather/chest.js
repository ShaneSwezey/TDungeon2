"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leatherChestFactory = exports.LeatherChestName = void 0;
const rarity_1 = require("../../rarity");
const __1 = require("..");
var LeatherChestName;
(function (LeatherChestName) {
    LeatherChestName["BUGINFESTEDLEAHTERCHEST"] = "Bug Infested Leather Chest";
    LeatherChestName["TATTEREDCHEST"] = "Tattered Chest";
    LeatherChestName["JERKIN"] = "Jerkin";
    LeatherChestName["GOBLINSOLDIERLEATHERJACKET"] = "Goblin Soldier's Leather Jacket";
})(LeatherChestName = exports.LeatherChestName || (exports.LeatherChestName = {}));
const leatherChestFactory = (leatherChestName) => {
    switch (leatherChestName) {
        case LeatherChestName.TATTEREDCHEST:
            return tatteredChest();
        case LeatherChestName.JERKIN:
            return jerking();
        case LeatherChestName.GOBLINSOLDIERLEATHERJACKET:
            return goblinSoliderLeatherJacket();
        default:
            return bugInfestedLeatherChest();
    }
};
exports.leatherChestFactory = leatherChestFactory;
const bugInfestedLeatherChest = () => ({
    name: LeatherChestName.BUGINFESTEDLEAHTERCHEST,
    hitPoints: 0,
    type: __1.ArmorType.LEATHER,
    slot: __1.ArmorSlot.CHEST,
    rarity: rarity_1.ItemRarity.LEGENDARY
});
const tatteredChest = () => ({
    name: LeatherChestName.TATTEREDCHEST,
    hitPoints: 4,
    type: __1.ArmorType.LEATHER,
    slot: __1.ArmorSlot.CHEST,
    rarity: rarity_1.ItemRarity.COMMON
});
const jerking = () => ({
    name: LeatherChestName.JERKIN,
    hitPoints: 6,
    type: __1.ArmorType.LEATHER,
    slot: __1.ArmorSlot.CHEST,
    rarity: rarity_1.ItemRarity.COMMON
});
const goblinSoliderLeatherJacket = () => ({
    name: LeatherChestName.GOBLINSOLDIERLEATHERJACKET,
    hitPoints: 8,
    type: __1.ArmorType.LEATHER,
    slot: __1.ArmorSlot.CHEST,
    rarity: rarity_1.ItemRarity.UNCOMMON
});
