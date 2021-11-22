import { ItemRarity } from "../../rarity";
import { ArmorSlot, ArmorType } from "..";
import { Mail } from ".";

export interface MailHelm extends Mail {
    name: MailHelmName,
    slot: ArmorSlot.HELM,
}

export enum MailHelmName {
    BUGINFESTEDMAILHELM = "Bug Infested Mail Helm",
    BROKENCOPPERHELM = "Broken Copper Helm",
    SKULLCAP = "Skullcap",
    GLISTENINGCOIF = "Glistening Coif",
}

export const mailHelmFactory = (mailHelmName: string) => {
    switch(mailHelmName) {
        case MailHelmName.BROKENCOPPERHELM:
            return brokenCopperHelm();
        case MailHelmName.SKULLCAP:
            return skullCap();
        case MailHelmName.GLISTENINGCOIF:
            return glisteningCoif();
        default:
            return bugInfestedMailHelm();
    }
}

const bugInfestedMailHelm = (): MailHelm => ({
    name: MailHelmName.BUGINFESTEDMAILHELM,
    type: ArmorType.MAIL,
    slot: ArmorSlot.HELM,
    hitPoints: 0,
    rarity: ItemRarity.LEGENDARY,
});

const brokenCopperHelm = (): MailHelm => ({
    name: MailHelmName.BROKENCOPPERHELM,
    type: ArmorType.MAIL,
    slot: ArmorSlot.HELM,
    hitPoints: 4,
    rarity: ItemRarity.COMMON,
});

const skullCap = (): MailHelm => ({
    name: MailHelmName.SKULLCAP,
    type: ArmorType.MAIL,
    slot: ArmorSlot.HELM,
    hitPoints: 7,
    rarity: ItemRarity.UNCOMMON,
});

const glisteningCoif = (): MailHelm => ({
    name: MailHelmName.GLISTENINGCOIF,
    type: ArmorType.MAIL,
    slot: ArmorSlot.HELM,
    hitPoints: 10,
    attackPower: 10,
    rarity: ItemRarity.RARE,
    description: "Gleams of gold..."
});