"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailHelmFactory = exports.MailHelmName = void 0;
const rarity_1 = require("../../rarity");
const __1 = require("..");
var MailHelmName;
(function (MailHelmName) {
    MailHelmName["BUGINFESTEDMAILHELM"] = "Bug Infested Mail Helm";
    MailHelmName["BROKENCOPPERHELM"] = "Broken Copper Helm";
    MailHelmName["SKULLCAP"] = "Skullcap";
    MailHelmName["GLISTENINGCOIF"] = "Glistening Coif";
})(MailHelmName = exports.MailHelmName || (exports.MailHelmName = {}));
const mailHelmFactory = (mailHelmName) => {
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
const bugInfestedMailHelm = () => ({
    name: MailHelmName.BUGINFESTEDMAILHELM,
    type: __1.ArmorType.MAIL,
    slot: __1.ArmorSlot.HELM,
    hitPoints: 0,
    rarity: rarity_1.ItemRarity.LEGENDARY,
});
const brokenCopperHelm = () => ({
    name: MailHelmName.BROKENCOPPERHELM,
    type: __1.ArmorType.MAIL,
    slot: __1.ArmorSlot.HELM,
    hitPoints: 4,
    rarity: rarity_1.ItemRarity.COMMON,
});
const skullCap = () => ({
    name: MailHelmName.SKULLCAP,
    type: __1.ArmorType.MAIL,
    slot: __1.ArmorSlot.HELM,
    hitPoints: 7,
    rarity: rarity_1.ItemRarity.UNCOMMON,
});
const glisteningCoif = () => ({
    name: MailHelmName.GLISTENINGCOIF,
    type: __1.ArmorType.MAIL,
    slot: __1.ArmorSlot.HELM,
    hitPoints: 10,
    attackPower: 10,
    rarity: rarity_1.ItemRarity.RARE,
    description: "Gleams of gold..."
});
