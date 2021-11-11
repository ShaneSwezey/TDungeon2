"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailGlovesFactory = exports.MailGlovesName = void 0;
var rarity_1 = require("../../rarity");
var __1 = require("..");
var MailGlovesName;
(function (MailGlovesName) {
    MailGlovesName["BUGINFESTEDCHAINGLOVES"] = "Bug Infested Chain Gloves";
    MailGlovesName["CHAINGLOVES"] = "Chain Gloves";
    MailGlovesName["ELVENCHAINGLOVES"] = "Elven Chain Gloves";
    MailGlovesName["SQUIRETRAININGGLOVES"] = "Squire Training Gloves";
    MailGlovesName["SPIDERSILKGLOVES"] = "Spider Silk Gloves";
})(MailGlovesName = exports.MailGlovesName || (exports.MailGlovesName = {}));
var mailGlovesFactory = function (mailGlovesName) {
    switch (mailGlovesName) {
        case MailGlovesName.CHAINGLOVES:
            return chainGloves();
        case MailGlovesName.ELVENCHAINGLOVES:
            return elvenChainGloves();
        case MailGlovesName.SPIDERSILKGLOVES:
            return spiderSilkGloves();
        case MailGlovesName.SQUIRETRAININGGLOVES:
            return squireTrainingGloves();
        default:
            return bugInfestedChainGloves();
    }
};
exports.mailGlovesFactory = mailGlovesFactory;
var mailGloves = {
    type: __1.ArmorType.MAIL,
    slot: __1.ArmorSlot.GLOVES,
};
var bugInfestedChainGloves = function () { return ({
    name: MailGlovesName.BUGINFESTEDCHAINGLOVES,
    type: __1.ArmorType.MAIL,
    slot: __1.ArmorSlot.GLOVES,
    hitPoints: 0,
    rarity: rarity_1.ItemRarity.LEGENDARY,
}); };
var chainGloves = function () { return ({
    name: MailGlovesName.CHAINGLOVES,
    type: __1.ArmorType.MAIL,
    slot: __1.ArmorSlot.GLOVES,
    hitPoints: 5,
    rarity: rarity_1.ItemRarity.COMMON,
}); };
var elvenChainGloves = function () { return ({
    name: MailGlovesName.ELVENCHAINGLOVES,
    type: __1.ArmorType.MAIL,
    slot: __1.ArmorSlot.GLOVES,
    hitPoints: 8,
    rarity: rarity_1.ItemRarity.UNCOMMON
}); };
var squireTrainingGloves = function () { return ({
    name: MailGlovesName.SQUIRETRAININGGLOVES,
    type: __1.ArmorType.MAIL,
    slot: __1.ArmorSlot.GLOVES,
    hitPoints: 7,
    rarity: rarity_1.ItemRarity.UNCOMMON
}); };
var spiderSilkGloves = function () { return ({
    name: MailGlovesName.ELVENCHAINGLOVES,
    type: __1.ArmorType.MAIL,
    slot: __1.ArmorSlot.GLOVES,
    hitPoints: 11,
    attackPower: 5,
    rarity: rarity_1.ItemRarity.RARE,
    description: "Spider's silk is very strong"
}); };
