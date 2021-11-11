"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leatherChestFactory = exports.LeatherChestName = void 0;
var rarity_1 = require("../../rarity");
var __1 = require("..");
var LeatherChestName;
(function (LeatherChestName) {
    LeatherChestName["BUGINFESTEDLEAHTERCHEST"] = "Bug Infested Leather Chest";
    LeatherChestName["TATTEREDCHEST"] = "Tattered Chest";
    LeatherChestName["JERKIN"] = "Jerkin";
    LeatherChestName["GOBLINSOLDIERLEATHERJACKET"] = "Goblin Soldier's Leather Jacket";
})(LeatherChestName = exports.LeatherChestName || (exports.LeatherChestName = {}));
var leatherChestFactory = function (leatherChestName) {
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
var bugInfestedLeatherChest = function () { return ({
    name: LeatherChestName.BUGINFESTEDLEAHTERCHEST,
    hitPoints: 0,
    type: __1.ArmorType.LEATHER,
    slot: __1.ArmorSlot.CHEST,
    rarity: rarity_1.ItemRarity.LEGENDARY
}); };
var tatteredChest = function () { return ({
    name: LeatherChestName.TATTEREDCHEST,
    hitPoints: 2,
    type: __1.ArmorType.LEATHER,
    slot: __1.ArmorSlot.CHEST,
    rarity: rarity_1.ItemRarity.COMMON
}); };
var jerking = function () { return ({
    name: LeatherChestName.JERKIN,
    hitPoints: 4,
    type: __1.ArmorType.LEATHER,
    slot: __1.ArmorSlot.CHEST,
    rarity: rarity_1.ItemRarity.COMMON
}); };
var goblinSoliderLeatherJacket = function () { return ({
    name: LeatherChestName.GOBLINSOLDIERLEATHERJACKET,
    hitPoints: 8,
    type: __1.ArmorType.LEATHER,
    slot: __1.ArmorSlot.CHEST,
    rarity: rarity_1.ItemRarity.UNCOMMON
}); };
