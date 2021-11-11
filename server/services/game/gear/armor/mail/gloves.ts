import { ItemRarity } from "../../rarity";
import { ArmorSlot, ArmorType } from "..";
import { Mail } from ".";

export interface MailGloves extends Mail {
    name: MailGlovesName;
    slot: ArmorSlot.GLOVES;
}

export enum MailGlovesName {
    BUGINFESTEDCHAINGLOVES = "Bug Infested Chain Gloves",
    CHAINGLOVES = "Chain Gloves",
    ELVENCHAINGLOVES = "Elven Chain Gloves",
    SQUIRETRAININGGLOVES = "Squire Training Gloves",
    SPIDERSILKGLOVES = "Spider Silk Gloves"
}

export const mailGlovesFactory = (mailGlovesName: string) => {
    switch(mailGlovesName) {
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
}

const mailGloves = {
    type: ArmorType.MAIL,
    slot: ArmorSlot.GLOVES,
}

const bugInfestedChainGloves = (): MailGloves => ({
    name: MailGlovesName.BUGINFESTEDCHAINGLOVES,
    type: ArmorType.MAIL,
    slot: ArmorSlot.GLOVES,
    hitPoints: 0,
    rarity: ItemRarity.LEGENDARY,
});

const chainGloves = (): MailGloves => ({
    name: MailGlovesName.CHAINGLOVES,
    type: ArmorType.MAIL,
    slot: ArmorSlot.GLOVES,
    hitPoints: 5,
    rarity: ItemRarity.COMMON,
});

const elvenChainGloves = (): MailGloves => ({
    name: MailGlovesName.ELVENCHAINGLOVES,
    type: ArmorType.MAIL,
    slot: ArmorSlot.GLOVES,
    hitPoints: 8,
    rarity: ItemRarity.UNCOMMON
});

const squireTrainingGloves = (): MailGloves => ({
    name: MailGlovesName.SQUIRETRAININGGLOVES,
    type: ArmorType.MAIL,
    slot: ArmorSlot.GLOVES,
    hitPoints: 7,
    rarity: ItemRarity.UNCOMMON
});

const spiderSilkGloves = (): MailGloves => ({
    name: MailGlovesName.ELVENCHAINGLOVES,
    type: ArmorType.MAIL,
    slot: ArmorSlot.GLOVES,
    hitPoints: 11,
    attackPower: 5,
    rarity: ItemRarity.RARE,
    description: "Spider's silk is very strong"
});