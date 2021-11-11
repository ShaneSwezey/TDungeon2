"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailChestFactory = exports.MailChestName = void 0;
var rarity_1 = require("../../rarity");
var __1 = require("..");
var MailChestName;
(function (MailChestName) {
    MailChestName["BUGINFESTEDCHAINCHEST"] = "Bug Infested Chain Chest";
    MailChestName["RUSTYCHAINCHEST"] = "Rusty Chain Chest";
    MailChestName["SOLDIERCHAINCHEST"] = "Soldier Chain Chest";
    MailChestName["ELVINSCHAINCHEST"] = "Elvins Chain Chest";
    MailChestName["OGRECAPTAINCHEST"] = "Ogre Captain Chest";
})(MailChestName = exports.MailChestName || (exports.MailChestName = {}));
var mailChestFactory = function (mailChestName) {
    switch (mailChestName) {
        case MailChestName.RUSTYCHAINCHEST:
            return rustyChainChest();
        case MailChestName.SOLDIERCHAINCHEST:
            return soldierChainChest();
        case MailChestName.ELVINSCHAINCHEST:
            return elvinsMailChest();
        case MailChestName.OGRECAPTAINCHEST:
            return ogreCaptainChest();
        default:
            return bugInfestedChainChest();
    }
};
exports.mailChestFactory = mailChestFactory;
var bugInfestedChainChest = function () { return ({
    name: MailChestName.BUGINFESTEDCHAINCHEST,
    type: __1.ArmorType.MAIL,
    slot: __1.ArmorSlot.CHEST,
    hitPoints: 0,
    rarity: rarity_1.ItemRarity.LEGENDARY,
}); };
var rustyChainChest = function () { return ({
    name: MailChestName.RUSTYCHAINCHEST,
    type: __1.ArmorType.MAIL,
    slot: __1.ArmorSlot.CHEST,
    hitPoints: 8,
    rarity: rarity_1.ItemRarity.COMMON,
}); };
var soldierChainChest = function () { return ({
    name: MailChestName.SOLDIERCHAINCHEST,
    type: __1.ArmorType.MAIL,
    slot: __1.ArmorSlot.CHEST,
    hitPoints: 10,
    rarity: rarity_1.ItemRarity.COMMON,
}); };
var elvinsMailChest = function () { return ({
    name: MailChestName.ELVINSCHAINCHEST,
    type: __1.ArmorType.MAIL,
    slot: __1.ArmorSlot.CHEST,
    hitPoints: 13,
    rarity: rarity_1.ItemRarity.UNCOMMON,
}); };
var ogreCaptainChest = function () { return ({
    name: MailChestName.OGRECAPTAINCHEST,
    type: __1.ArmorType.MAIL,
    slot: __1.ArmorSlot.CHEST,
    hitPoints: 17,
    rarity: rarity_1.ItemRarity.RARE,
}); };
