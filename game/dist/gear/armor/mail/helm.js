"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomMailHelm = exports.mailHelmFactory = void 0;
const armor_1 = require("../../../enums/armor");
const item_1 = require("../../../enums/item");
const mailHelmFactory = (mailHelmName) => {
    switch (mailHelmName) {
        case armor_1.MailHelmName.BROKENCOPPERHELM:
            return brokenCopperHelm();
        case armor_1.MailHelmName.SKULLCAP:
            return skullCap();
        case armor_1.MailHelmName.GLISTENINGCOIF:
            return glisteningCoif();
        default:
            return bugInfestedMailHelm();
    }
};
exports.mailHelmFactory = mailHelmFactory;
const getRandomMailHelm = (rarity) => {
    switch (rarity) {
        case item_1.CurrentAvailiableItemRarity.COMMON:
            return getRandomCommonMailHelm();
        case item_1.CurrentAvailiableItemRarity.UNCOMMON:
            return getRandomUncommonMailHelm();
        case item_1.CurrentAvailiableItemRarity.RARE:
            return getRandomRareMailHelm();
        default:
            return getRandomCommonMailHelm();
    }
};
exports.getRandomMailHelm = getRandomMailHelm;
const getRandomCommonMailHelm = () => {
    return brokenCopperHelm();
};
const getRandomUncommonMailHelm = () => {
    return skullCap();
};
const getRandomRareMailHelm = () => {
    return glisteningCoif();
};
const bugInfestedMailHelm = () => ({
    name: armor_1.MailHelmName.BUGINFESTEDMAILHELM,
    type: armor_1.ArmorType.MAIL,
    slot: armor_1.ArmorSlot.HELM,
    hitPoints: 0,
    rarity: item_1.ItemRarity.LEGENDARY,
    imgSrc: ""
});
const brokenCopperHelm = () => ({
    name: armor_1.MailHelmName.BROKENCOPPERHELM,
    type: armor_1.ArmorType.MAIL,
    slot: armor_1.ArmorSlot.HELM,
    hitPoints: 4,
    rarity: item_1.ItemRarity.COMMON,
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/armor/mail/helm/cracked-helm-common.svg"
});
const skullCap = () => ({
    name: armor_1.MailHelmName.SKULLCAP,
    type: armor_1.ArmorType.MAIL,
    slot: armor_1.ArmorSlot.HELM,
    hitPoints: 7,
    rarity: item_1.ItemRarity.UNCOMMON,
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/armor/mail/helm/gauls-helm-uncommon.svg"
});
const glisteningCoif = () => ({
    name: armor_1.MailHelmName.GLISTENINGCOIF,
    type: armor_1.ArmorType.MAIL,
    slot: armor_1.ArmorSlot.HELM,
    hitPoints: 10,
    attackPower: 10,
    rarity: item_1.ItemRarity.RARE,
    description: "Gleams of gold...",
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/armor/mail/helm/light-helm-rare.svg"
});
