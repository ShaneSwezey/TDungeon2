"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailPantsFactory = exports.MailPantsName = void 0;
const rarity_1 = require("../../rarity");
const __1 = require("..");
var MailPantsName;
(function (MailPantsName) {
    MailPantsName["BUGINFESTEDMAILPANTS"] = "Bug Infested Mail Pants";
    MailPantsName["COPPERPANTS"] = "Copper Pants";
    MailPantsName["RUSTYPAINTS"] = "Rusty Pants";
    MailPantsName["GOBLINSOLDIERPANTS"] = "Goblin Soldier Pants";
    MailPantsName["BLACKSMITHSONSPANTS"] = "Blacksmith's Son Pants";
})(MailPantsName = exports.MailPantsName || (exports.MailPantsName = {}));
const mailPantsFactory = (mailPantsName) => {
    switch (mailPantsName) {
        case MailPantsName.BLACKSMITHSONSPANTS:
            return blacksmithSonPants();
        case MailPantsName.COPPERPANTS:
            return copperPants();
        case MailPantsName.GOBLINSOLDIERPANTS:
            return golbinSoldierPants();
        case MailPantsName.RUSTYPAINTS:
            return rustyPants();
        default:
            return bugInfestedMailPaints();
    }
};
exports.mailPantsFactory = mailPantsFactory;
const bugInfestedMailPaints = () => ({
    name: MailPantsName.BUGINFESTEDMAILPANTS,
    type: __1.ArmorType.MAIL,
    slot: __1.ArmorSlot.PANTS,
    hitPoints: 0,
    rarity: rarity_1.ItemRarity.LEGENDARY,
});
const copperPants = () => ({
    name: MailPantsName.COPPERPANTS,
    type: __1.ArmorType.MAIL,
    slot: __1.ArmorSlot.PANTS,
    hitPoints: 5,
    rarity: rarity_1.ItemRarity.COMMON,
});
const rustyPants = () => ({
    name: MailPantsName.RUSTYPAINTS,
    type: __1.ArmorType.MAIL,
    slot: __1.ArmorSlot.PANTS,
    hitPoints: 4,
    rarity: rarity_1.ItemRarity.COMMON,
});
const golbinSoldierPants = () => ({
    name: MailPantsName.GOBLINSOLDIERPANTS,
    type: __1.ArmorType.MAIL,
    slot: __1.ArmorSlot.PANTS,
    hitPoints: 7,
    rarity: rarity_1.ItemRarity.UNCOMMON,
});
const blacksmithSonPants = () => ({
    name: MailPantsName.BLACKSMITHSONSPANTS,
    type: __1.ArmorType.MAIL,
    slot: __1.ArmorSlot.PANTS,
    hitPoints: 10,
    attackPower: 4,
    rarity: rarity_1.ItemRarity.RARE,
    description: "This is the work of an apprentice, not to shabby but lacks the polish of a professional!"
});
