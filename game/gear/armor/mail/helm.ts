import { ArmorSlot, ArmorType, MailHelmName } from "../../../enums/armor";
import { CurrentAvailiableItemRarity, ItemRarity } from "../../../enums/item";
import { IMailHelm } from "../../../interfaces/armor";

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

export const getRandomMailHelm = (rarity: CurrentAvailiableItemRarity) => {
    switch(rarity) {
        case CurrentAvailiableItemRarity.COMMON:
            return getRandomCommonMailHelm();
        case CurrentAvailiableItemRarity.UNCOMMON:
            return getRandomUncommonMailHelm();
        case CurrentAvailiableItemRarity.RARE:
            return getRandomRareMailHelm();
        default:
            return getRandomCommonMailHelm();
    }
}

const getRandomCommonMailHelm = () => {
    return brokenCopperHelm();
}

const getRandomUncommonMailHelm = () => {
    return skullCap();
}

const getRandomRareMailHelm = () => {
    return glisteningCoif();
}

const bugInfestedMailHelm = (): IMailHelm => ({
    name: MailHelmName.BUGINFESTEDMAILHELM,
    type: ArmorType.MAIL,
    slot: ArmorSlot.HELM,
    hitPoints: 0,
    rarity: ItemRarity.LEGENDARY,
    imgSrc: ""
});

const brokenCopperHelm = (): IMailHelm => ({
    name: MailHelmName.BROKENCOPPERHELM,
    type: ArmorType.MAIL,
    slot: ArmorSlot.HELM,
    hitPoints: 4,
    rarity: ItemRarity.COMMON,
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/armor/mail/helm/cracked-helm-common.svg"
});

const skullCap = (): IMailHelm => ({
    name: MailHelmName.SKULLCAP,
    type: ArmorType.MAIL,
    slot: ArmorSlot.HELM,
    hitPoints: 7,
    rarity: ItemRarity.UNCOMMON,
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/armor/mail/helm/gauls-helm-uncommon.svg"
});

const glisteningCoif = (): IMailHelm => ({
    name: MailHelmName.GLISTENINGCOIF,
    type: ArmorType.MAIL,
    slot: ArmorSlot.HELM,
    hitPoints: 10,
    attackPower: 10,
    rarity: ItemRarity.RARE,
    description: "Gleams of gold...",
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/armor/mail/helm/light-helm-rare.svg"
});