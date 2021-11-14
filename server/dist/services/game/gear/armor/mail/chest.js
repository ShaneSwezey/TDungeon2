"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailChestFactory = exports.MailChestName = void 0;
const rarity_1 = require("../../rarity");
const __1 = require("..");
var MailChestName;
(function (MailChestName) {
    MailChestName["BUGINFESTEDCHAINCHEST"] = "Bug Infested Chain Chest";
    MailChestName["RUSTYCHAINCHEST"] = "Rusty Chain Chest";
    MailChestName["SOLDIERCHAINCHEST"] = "Soldier Chain Chest";
    MailChestName["ELVINSCHAINCHEST"] = "Elvins Chain Chest";
    MailChestName["OGRECAPTAINCHEST"] = "Ogre Captain Chest";
})(MailChestName = exports.MailChestName || (exports.MailChestName = {}));
const mailChestFactory = (mailChestName) => {
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
const bugInfestedChainChest = () => ({
    name: MailChestName.BUGINFESTEDCHAINCHEST,
    type: __1.ArmorType.MAIL,
    slot: __1.ArmorSlot.CHEST,
    hitPoints: 0,
    rarity: rarity_1.ItemRarity.LEGENDARY,
});
const rustyChainChest = () => ({
    name: MailChestName.RUSTYCHAINCHEST,
    type: __1.ArmorType.MAIL,
    slot: __1.ArmorSlot.CHEST,
    hitPoints: 8,
    rarity: rarity_1.ItemRarity.COMMON,
});
const soldierChainChest = () => ({
    name: MailChestName.SOLDIERCHAINCHEST,
    type: __1.ArmorType.MAIL,
    slot: __1.ArmorSlot.CHEST,
    hitPoints: 10,
    rarity: rarity_1.ItemRarity.COMMON,
});
const elvinsMailChest = () => ({
    name: MailChestName.ELVINSCHAINCHEST,
    type: __1.ArmorType.MAIL,
    slot: __1.ArmorSlot.CHEST,
    hitPoints: 13,
    rarity: rarity_1.ItemRarity.UNCOMMON,
});
const ogreCaptainChest = () => ({
    name: MailChestName.OGRECAPTAINCHEST,
    type: __1.ArmorType.MAIL,
    slot: __1.ArmorSlot.CHEST,
    hitPoints: 17,
    rarity: rarity_1.ItemRarity.RARE,
});
