"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomMailChest = exports.mailChestFactory = void 0;
const armor_1 = require("../../../enums/armor");
const item_1 = require("../../../enums/item");
const math_1 = require("../../../utils/math");
const mailChestFactory = (mailChestName) => {
    switch (mailChestName) {
        case armor_1.MailChestName.RUSTYCHAINCHEST:
            return rustyChainChest();
        case armor_1.MailChestName.SOLDIERCHAINCHEST:
            return soldierChainChest();
        case armor_1.MailChestName.ELVINSCHAINCHEST:
            return elvinsMailChest();
        case armor_1.MailChestName.OGRECAPTAINCHEST:
            return ogreCaptainChest();
        default:
            return bugInfestedChainChest();
    }
};
exports.mailChestFactory = mailChestFactory;
const getRandomMailChest = (rarity) => {
    switch (rarity) {
        case item_1.CurrentAvailiableItemRarity.COMMON:
            return getRandomCommonMailChest();
        case item_1.CurrentAvailiableItemRarity.UNCOMMON:
            return getRandomUncommonMailChest();
        case item_1.CurrentAvailiableItemRarity.RARE:
            return getRandomRareMailChest();
        default:
            return getRandomCommonMailChest();
    }
};
exports.getRandomMailChest = getRandomMailChest;
const getRandomCommonMailChest = () => {
    const randInt = (0, math_1.getRandomInt)(1, 2);
    if (randInt === 1) {
        return rustyChainChest();
    }
    else {
        return soldierChainChest();
    }
};
const getRandomUncommonMailChest = () => {
    return elvinsMailChest();
};
const getRandomRareMailChest = () => {
    return ogreCaptainChest();
};
const bugInfestedChainChest = () => ({
    name: armor_1.MailChestName.BUGINFESTEDCHAINCHEST,
    type: armor_1.ArmorType.MAIL,
    slot: armor_1.ArmorSlot.CHEST,
    hitPoints: 0,
    rarity: item_1.ItemRarity.LEGENDARY,
    imgSrc: ""
});
const rustyChainChest = () => ({
    name: armor_1.MailChestName.RUSTYCHAINCHEST,
    type: armor_1.ArmorType.MAIL,
    slot: armor_1.ArmorSlot.CHEST,
    hitPoints: 8,
    rarity: item_1.ItemRarity.COMMON,
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/armor/mail/chest/scale-mail-common.svg"
});
const soldierChainChest = () => ({
    name: armor_1.MailChestName.SOLDIERCHAINCHEST,
    type: armor_1.ArmorType.MAIL,
    slot: armor_1.ArmorSlot.CHEST,
    hitPoints: 10,
    rarity: item_1.ItemRarity.COMMON,
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/armor/mail/chest/mail-shirt-common.svg"
});
const elvinsMailChest = () => ({
    name: armor_1.MailChestName.ELVINSCHAINCHEST,
    type: armor_1.ArmorType.MAIL,
    slot: armor_1.ArmorSlot.CHEST,
    hitPoints: 13,
    rarity: item_1.ItemRarity.UNCOMMON,
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/armor/mail/chest/chain-mail-uncommon.svg"
});
const ogreCaptainChest = () => ({
    name: armor_1.MailChestName.OGRECAPTAINCHEST,
    type: armor_1.ArmorType.MAIL,
    slot: armor_1.ArmorSlot.CHEST,
    hitPoints: 17,
    rarity: item_1.ItemRarity.RARE,
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/armor/mail/chest/kevlar-rare.svg"
});
