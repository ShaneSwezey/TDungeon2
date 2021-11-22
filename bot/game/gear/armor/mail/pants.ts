import { ItemRarity } from "../../rarity";
import { ArmorSlot, ArmorType } from "..";
import { Mail } from ".";

export interface MailPants extends Mail {
    name: MailPantsName;
    slot: ArmorSlot.PANTS;
}

export enum MailPantsName {
    BUGINFESTEDMAILPANTS = "Bug Infested Mail Pants",
    COPPERPANTS = "Copper Pants",
    RUSTYPAINTS = "Rusty Pants",
    GOBLINSOLDIERPANTS = "Goblin Soldier Pants",
    BLACKSMITHSONSPANTS = "Blacksmith's Son Pants"
}


export const mailPantsFactory = (mailPantsName: string) => {
    switch(mailPantsName) {
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
}

const bugInfestedMailPaints = (): MailPants => ({
    name: MailPantsName.BUGINFESTEDMAILPANTS,
    type: ArmorType.MAIL,
    slot: ArmorSlot.PANTS,
    hitPoints: 0,
    rarity: ItemRarity.LEGENDARY,
});


const copperPants = (): MailPants => ({
    name: MailPantsName.COPPERPANTS,
    type: ArmorType.MAIL,
    slot: ArmorSlot.PANTS,
    hitPoints: 5,
    rarity: ItemRarity.COMMON,
});

const rustyPants = (): MailPants => ({
    name: MailPantsName.RUSTYPAINTS,
    type: ArmorType.MAIL,
    slot: ArmorSlot.PANTS,
    hitPoints: 4,
    rarity: ItemRarity.COMMON,
});

const golbinSoldierPants = (): MailPants => ({
    name: MailPantsName.GOBLINSOLDIERPANTS,
    type: ArmorType.MAIL,
    slot: ArmorSlot.PANTS,
    hitPoints: 7,
    rarity: ItemRarity.UNCOMMON,
});

const blacksmithSonPants = (): MailPants => ({
    name: MailPantsName.BLACKSMITHSONSPANTS,
    type: ArmorType.MAIL,
    slot: ArmorSlot.PANTS,
    hitPoints: 10,
    attackPower: 4,
    rarity: ItemRarity.RARE,
    description: "This is the work of an apprentice, not to shabby but lacks the polish of a professional!"
});