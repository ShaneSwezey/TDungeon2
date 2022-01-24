import { ArmorSlot, ArmorType, MailPantsName } from "../../../enums/armor";
import { CurrentAvailiableItemRarity, ItemRarity } from "../../../enums/item";
import { IMailPants } from "../../../interfaces/armor";
import { getRandomInt } from "../../../utils/math";

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

export const getRandomMailPants = (rarity: CurrentAvailiableItemRarity) => {
    switch(rarity) {
        case CurrentAvailiableItemRarity.COMMON:
            return getRandomCommonMailPants();
        case CurrentAvailiableItemRarity.UNCOMMON:
            return getRandomUncommonMailPants();
        case CurrentAvailiableItemRarity.RARE:
            return getRandomUncommonMailPants() // placeholder
        default:
            return getRandomCommonMailPants();
    }
} 

export const getRandomCommonMailPants = () => {
    const randInt = getRandomInt(1, 2);
    if (randInt === 1) {
        return copperPants();
    } else {
        return rustyPants();
    }
}

export const getRandomUncommonMailPants = () => {
    const randInt = getRandomInt(1, 2);
    if (randInt === 1) {
        return golbinSoldierPants();
    } else {
        return blacksmithSonPants();
    }
}

const bugInfestedMailPaints = (): IMailPants => ({
    name: MailPantsName.BUGINFESTEDMAILPANTS,
    type: ArmorType.MAIL,
    slot: ArmorSlot.PANTS,
    hitPoints: 0,
    rarity: ItemRarity.LEGENDARY,
    imgSrc: ""
});


const copperPants = (): IMailPants => ({
    name: MailPantsName.COPPERPANTS,
    type: ArmorType.MAIL,
    slot: ArmorSlot.PANTS,
    hitPoints: 5,
    rarity: ItemRarity.COMMON,
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/armor/mail/pants/armored-pants-common.svg"
});

const rustyPants = (): IMailPants => ({
    name: MailPantsName.RUSTYPAINTS,
    type: ArmorType.MAIL,
    slot: ArmorSlot.PANTS,
    hitPoints: 4,
    rarity: ItemRarity.COMMON,
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/armor/mail/pants/armored-pants-common.svg"
});

const golbinSoldierPants = (): IMailPants => ({
    name: MailPantsName.GOBLINSOLDIERPANTS,
    type: ArmorType.MAIL,
    slot: ArmorSlot.PANTS,
    hitPoints: 7,
    rarity: ItemRarity.UNCOMMON,
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/armor/mail/pants/elbow-pad-uncommon.svg"
});

const blacksmithSonPants = (): IMailPants => ({
    name: MailPantsName.BLACKSMITHSONSPANTS,
    type: ArmorType.MAIL,
    slot: ArmorSlot.PANTS,
    hitPoints: 10,
    rarity: ItemRarity.UNCOMMON,
    description: "This is the work of an apprentice, not to shabby but lacks the polish of a Master.",
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/armor/mail/pants/leg-armor-uncommon.svg"
});