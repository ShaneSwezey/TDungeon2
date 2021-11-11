"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailHelmFactory = exports.MailHelmName = void 0;
var rarity_1 = require("../../rarity");
var __1 = require("..");
var MailHelmName;
(function (MailHelmName) {
    MailHelmName["BUGINFESTEDMAILHELM"] = "Bug Infested Mail Helm";
    MailHelmName["BROKENCOPPERHELM"] = "Broken Copper Helm";
    MailHelmName["SKULLCAP"] = "Skullcap";
    MailHelmName["GLISTENINGCOIF"] = "Glistening Coif";
})(MailHelmName = exports.MailHelmName || (exports.MailHelmName = {}));
var mailHelmFactory = function (mailHelmName) {
    switch (mailHelmName) {
        case MailHelmName.BROKENCOPPERHELM:
            return brokenCopperHelm();
        case MailHelmName.SKULLCAP:
            return skullCap();
        case MailHelmName.GLISTENINGCOIF:
            return glisteningCoif();
        default:
            return bugInfestedMailHelm();
    }
};
exports.mailHelmFactory = mailHelmFactory;
var bugInfestedMailHelm = function () { return ({
    name: MailHelmName.BUGINFESTEDMAILHELM,
    type: __1.ArmorType.MAIL,
    slot: __1.ArmorSlot.HELM,
    hitPoints: 0,
    rarity: rarity_1.ItemRarity.LEGENDARY,
}); };
var brokenCopperHelm = function () { return ({
    name: MailHelmName.BROKENCOPPERHELM,
    type: __1.ArmorType.MAIL,
    slot: __1.ArmorSlot.HELM,
    hitPoints: 4,
    rarity: rarity_1.ItemRarity.COMMON,
}); };
var skullCap = function () { return ({
    name: MailHelmName.SKULLCAP,
    type: __1.ArmorType.MAIL,
    slot: __1.ArmorSlot.HELM,
    hitPoints: 7,
    rarity: rarity_1.ItemRarity.UNCOMMON,
}); };
var glisteningCoif = function () { return ({
    name: MailHelmName.GLISTENINGCOIF,
    type: __1.ArmorType.MAIL,
    slot: __1.ArmorSlot.HELM,
    hitPoints: 10,
    attackPower: 10,
    rarity: rarity_1.ItemRarity.RARE,
    description: "Gleams of gold..."
}); };
