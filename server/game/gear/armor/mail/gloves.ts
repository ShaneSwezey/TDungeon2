import { ArmorSlot, ArmorType, MailGlovesName } from "../../../enums/armor";
import { CurrentAvailiableItemRarity, ItemRarity } from "../../../enums/item";
import { IMailGloves } from "../../../interfaces/armor";
import { getRandomInt } from "../../../utils/math";

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

export const getRandomMailGloves = (rarity: CurrentAvailiableItemRarity) => {
    switch(rarity) {
        case CurrentAvailiableItemRarity.COMMON:
            return getRandomCommonMailGloves();
        case CurrentAvailiableItemRarity.UNCOMMON:
            return getRandomUncommonMailGloves();
        case CurrentAvailiableItemRarity.RARE:
            return getRandomRareMailGloves();
        default:
            return getRandomCommonMailGloves();
    }
}

const getRandomCommonMailGloves = () => {
    return chainGloves();
}

const getRandomUncommonMailGloves = () => {
    const randInt = getRandomInt(1, 2);
    if (randInt === 1) {
        return elvenChainGloves();
    } else {
        return squireTrainingGloves();
    }
}

const getRandomRareMailGloves = () => {
    return spiderSilkGloves();
}


const bugInfestedChainGloves = (): IMailGloves => ({
    name: MailGlovesName.BUGINFESTEDCHAINGLOVES,
    type: ArmorType.MAIL,
    slot: ArmorSlot.GLOVES,
    hitPoints: 0,
    rarity: ItemRarity.LEGENDARY,
    imgSrc: ""
});

const chainGloves = (): IMailGloves => ({
    name: MailGlovesName.CHAINGLOVES,
    type: ArmorType.MAIL,
    slot: ArmorSlot.GLOVES,
    hitPoints: 5,
    rarity: ItemRarity.COMMON,
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/armor/mail/gloves/revolt-common.svg"
});

const elvenChainGloves = (): IMailGloves => ({
    name: MailGlovesName.ELVENCHAINGLOVES,
    type: ArmorType.MAIL,
    slot: ArmorSlot.GLOVES,
    hitPoints: 8,
    rarity: ItemRarity.UNCOMMON,
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/armor/mail/gloves/mailed-fist-uncommon.svg"
});

const squireTrainingGloves = (): IMailGloves => ({
    name: MailGlovesName.SQUIRETRAININGGLOVES,
    type: ArmorType.MAIL,
    slot: ArmorSlot.GLOVES,
    hitPoints: 7,
    rarity: ItemRarity.UNCOMMON,
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/armor/mail/gloves/winter-gloves-uncommon.svg"
});

const spiderSilkGloves = (): IMailGloves => ({
    name: MailGlovesName.ELVENCHAINGLOVES,
    type: ArmorType.MAIL,
    slot: ArmorSlot.GLOVES,
    hitPoints: 11,
    attackPower: 5,
    rarity: ItemRarity.RARE,
    description: "Ahhh Spider's silk, very strong",
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/armor/mail/gloves/gloves-rare.svg"
});