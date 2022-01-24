"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomCommonLeatherHelm = exports.getRandomLeatherHelm = exports.leatherHelmFactory = void 0;
const armor_1 = require("../../../enums/armor");
const item_1 = require("../../../enums/item");
const math_1 = require("../../../utils/math");
const leatherHelmFactory = (leatherHelmName) => {
    switch (leatherHelmName) {
        case armor_1.LeatherHelmName.LEATHERHEADBAND:
            return leatherHeadBand();
        case armor_1.LeatherHelmName.TRIBALWARHELM:
            return tribalWarHelm();
        default:
            return bugInfestedLeatherHelm();
    }
};
exports.leatherHelmFactory = leatherHelmFactory;
const getRandomLeatherHelm = (rarity) => {
    switch (rarity) {
        case item_1.CurrentAvailiableItemRarity.COMMON:
            return (0, exports.getRandomCommonLeatherHelm)();
        case item_1.CurrentAvailiableItemRarity.UNCOMMON:
            return (0, exports.getRandomCommonLeatherHelm)(); // placeholder
        case item_1.CurrentAvailiableItemRarity.RARE:
            return (0, exports.getRandomCommonLeatherHelm)(); // placeholder
        default:
            return (0, exports.getRandomCommonLeatherHelm)(); // placeholder
    }
};
exports.getRandomLeatherHelm = getRandomLeatherHelm;
const getRandomCommonLeatherHelm = () => {
    const randInt = (0, math_1.getRandomInt)(1, 2);
    if (randInt === 1) {
        return leatherHeadBand();
    }
    else {
        return tribalWarHelm();
    }
};
exports.getRandomCommonLeatherHelm = getRandomCommonLeatherHelm;
const bugInfestedLeatherHelm = () => ({
    name: armor_1.LeatherHelmName.BUGINFESTEDLEATHERHELM,
    hitPoints: 0,
    type: armor_1.ArmorType.LEATHER,
    slot: armor_1.ArmorSlot.HELM,
    rarity: item_1.ItemRarity.LEGENDARY,
    imgSrc: ""
});
const leatherHeadBand = () => ({
    name: armor_1.LeatherHelmName.LEATHERHEADBAND,
    hitPoints: 4,
    type: armor_1.ArmorType.LEATHER,
    slot: armor_1.ArmorSlot.HELM,
    rarity: item_1.ItemRarity.COMMON,
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/armor/leather/helm/headband-knot-common.svg"
});
const tribalWarHelm = () => ({
    name: armor_1.LeatherHelmName.TRIBALWARHELM,
    hitPoints: 5,
    type: armor_1.ArmorType.LEATHER,
    slot: armor_1.ArmorSlot.HELM,
    rarity: item_1.ItemRarity.COMMON,
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/armor/leather/helm/tribal-mask-common.svg"
});
