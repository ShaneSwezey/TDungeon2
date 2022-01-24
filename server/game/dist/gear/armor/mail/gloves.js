"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomMailGloves = exports.mailGlovesFactory = void 0;
const armor_1 = require("../../../enums/armor");
const item_1 = require("../../../enums/item");
const math_1 = require("../../../utils/math");
const mailGlovesFactory = (mailGlovesName) => {
    switch (mailGlovesName) {
        case armor_1.MailGlovesName.CHAINGLOVES:
            return chainGloves();
        case armor_1.MailGlovesName.ELVENCHAINGLOVES:
            return elvenChainGloves();
        case armor_1.MailGlovesName.SPIDERSILKGLOVES:
            return spiderSilkGloves();
        case armor_1.MailGlovesName.SQUIRETRAININGGLOVES:
            return squireTrainingGloves();
        default:
            return bugInfestedChainGloves();
    }
};
exports.mailGlovesFactory = mailGlovesFactory;
const getRandomMailGloves = (rarity) => {
    switch (rarity) {
        case item_1.CurrentAvailiableItemRarity.COMMON:
            return getRandomCommonMailGloves();
        case item_1.CurrentAvailiableItemRarity.UNCOMMON:
            return getRandomUncommonMailGloves();
        case item_1.CurrentAvailiableItemRarity.RARE:
            return getRandomRareMailGloves();
        default:
            return getRandomCommonMailGloves();
    }
};
exports.getRandomMailGloves = getRandomMailGloves;
const getRandomCommonMailGloves = () => {
    return chainGloves();
};
const getRandomUncommonMailGloves = () => {
    const randInt = (0, math_1.getRandomInt)(1, 2);
    if (randInt === 1) {
        return elvenChainGloves();
    }
    else {
        return squireTrainingGloves();
    }
};
const getRandomRareMailGloves = () => {
    return spiderSilkGloves();
};
const bugInfestedChainGloves = () => ({
    name: armor_1.MailGlovesName.BUGINFESTEDCHAINGLOVES,
    type: armor_1.ArmorType.MAIL,
    slot: armor_1.ArmorSlot.GLOVES,
    hitPoints: 0,
    rarity: item_1.ItemRarity.LEGENDARY,
    imgSrc: ""
});
const chainGloves = () => ({
    name: armor_1.MailGlovesName.CHAINGLOVES,
    type: armor_1.ArmorType.MAIL,
    slot: armor_1.ArmorSlot.GLOVES,
    hitPoints: 5,
    rarity: item_1.ItemRarity.COMMON,
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/armor/mail/gloves/revolt-common.svg"
});
const elvenChainGloves = () => ({
    name: armor_1.MailGlovesName.ELVENCHAINGLOVES,
    type: armor_1.ArmorType.MAIL,
    slot: armor_1.ArmorSlot.GLOVES,
    hitPoints: 8,
    rarity: item_1.ItemRarity.UNCOMMON,
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/armor/mail/gloves/mailed-fist-uncommon.svg"
});
const squireTrainingGloves = () => ({
    name: armor_1.MailGlovesName.SQUIRETRAININGGLOVES,
    type: armor_1.ArmorType.MAIL,
    slot: armor_1.ArmorSlot.GLOVES,
    hitPoints: 7,
    rarity: item_1.ItemRarity.UNCOMMON,
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/armor/mail/gloves/winter-gloves-uncommon.svg"
});
const spiderSilkGloves = () => ({
    name: armor_1.MailGlovesName.ELVENCHAINGLOVES,
    type: armor_1.ArmorType.MAIL,
    slot: armor_1.ArmorSlot.GLOVES,
    hitPoints: 11,
    attackPower: 5,
    rarity: item_1.ItemRarity.RARE,
    description: "Ahhh Spider's silk, very strong",
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/armor/mail/gloves/gloves-rare.svg"
});
