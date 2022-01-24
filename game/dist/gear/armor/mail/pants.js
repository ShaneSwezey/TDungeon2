"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomUncommonMailPants = exports.getRandomCommonMailPants = exports.getRandomMailPants = exports.mailPantsFactory = void 0;
const armor_1 = require("../../../enums/armor");
const item_1 = require("../../../enums/item");
const math_1 = require("../../../utils/math");
const mailPantsFactory = (mailPantsName) => {
    switch (mailPantsName) {
        case armor_1.MailPantsName.BLACKSMITHSONSPANTS:
            return blacksmithSonPants();
        case armor_1.MailPantsName.COPPERPANTS:
            return copperPants();
        case armor_1.MailPantsName.GOBLINSOLDIERPANTS:
            return golbinSoldierPants();
        case armor_1.MailPantsName.RUSTYPAINTS:
            return rustyPants();
        default:
            return bugInfestedMailPaints();
    }
};
exports.mailPantsFactory = mailPantsFactory;
const getRandomMailPants = (rarity) => {
    switch (rarity) {
        case item_1.CurrentAvailiableItemRarity.COMMON:
            return (0, exports.getRandomCommonMailPants)();
        case item_1.CurrentAvailiableItemRarity.UNCOMMON:
            return (0, exports.getRandomUncommonMailPants)();
        case item_1.CurrentAvailiableItemRarity.RARE:
            return (0, exports.getRandomUncommonMailPants)(); // placeholder
        default:
            return (0, exports.getRandomCommonMailPants)();
    }
};
exports.getRandomMailPants = getRandomMailPants;
const getRandomCommonMailPants = () => {
    const randInt = (0, math_1.getRandomInt)(1, 2);
    if (randInt === 1) {
        return copperPants();
    }
    else {
        return rustyPants();
    }
};
exports.getRandomCommonMailPants = getRandomCommonMailPants;
const getRandomUncommonMailPants = () => {
    const randInt = (0, math_1.getRandomInt)(1, 2);
    if (randInt === 1) {
        return golbinSoldierPants();
    }
    else {
        return blacksmithSonPants();
    }
};
exports.getRandomUncommonMailPants = getRandomUncommonMailPants;
const bugInfestedMailPaints = () => ({
    name: armor_1.MailPantsName.BUGINFESTEDMAILPANTS,
    type: armor_1.ArmorType.MAIL,
    slot: armor_1.ArmorSlot.PANTS,
    hitPoints: 0,
    rarity: item_1.ItemRarity.LEGENDARY,
    imgSrc: ""
});
const copperPants = () => ({
    name: armor_1.MailPantsName.COPPERPANTS,
    type: armor_1.ArmorType.MAIL,
    slot: armor_1.ArmorSlot.PANTS,
    hitPoints: 5,
    rarity: item_1.ItemRarity.COMMON,
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/armor/mail/pants/armored-pants-common.svg"
});
const rustyPants = () => ({
    name: armor_1.MailPantsName.RUSTYPAINTS,
    type: armor_1.ArmorType.MAIL,
    slot: armor_1.ArmorSlot.PANTS,
    hitPoints: 4,
    rarity: item_1.ItemRarity.COMMON,
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/armor/mail/pants/armored-pants-common.svg"
});
const golbinSoldierPants = () => ({
    name: armor_1.MailPantsName.GOBLINSOLDIERPANTS,
    type: armor_1.ArmorType.MAIL,
    slot: armor_1.ArmorSlot.PANTS,
    hitPoints: 7,
    rarity: item_1.ItemRarity.UNCOMMON,
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/armor/mail/pants/elbow-pad-uncommon.svg"
});
const blacksmithSonPants = () => ({
    name: armor_1.MailPantsName.BLACKSMITHSONSPANTS,
    type: armor_1.ArmorType.MAIL,
    slot: armor_1.ArmorSlot.PANTS,
    hitPoints: 10,
    rarity: item_1.ItemRarity.UNCOMMON,
    description: "This is the work of an apprentice, not to shabby but lacks the polish of a Master.",
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/armor/mail/pants/leg-armor-uncommon.svg"
});
