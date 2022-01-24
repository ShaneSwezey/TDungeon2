import { ArmorSlot, ArmorType, MailChestName } from "../../../enums/armor";
import { CurrentAvailiableItemRarity, ItemRarity } from "../../../enums/item";
import { IMailChest } from "../../../interfaces/armor";
import { getRandomInt } from "../../../utils/math";

export const mailChestFactory = (mailChestName: string) => {
    switch(mailChestName) {
        case MailChestName.RUSTYCHAINCHEST:
            return rustyChainChest();
        case MailChestName.SOLDIERCHAINCHEST:
            return soldierChainChest();
        case MailChestName.ELVINSCHAINCHEST:
            return elvinsMailChest();
        case MailChestName.OGRECAPTAINCHEST:
            return ogreCaptainChest();
        default:
            return bugInfestedChainChest();
    }
}

export const getRandomMailChest = (rarity: CurrentAvailiableItemRarity) => {
    switch(rarity) {
        case CurrentAvailiableItemRarity.COMMON:
            return getRandomCommonMailChest();
        case CurrentAvailiableItemRarity.UNCOMMON:
            return getRandomUncommonMailChest();
        case CurrentAvailiableItemRarity.RARE:
            return getRandomRareMailChest();
        default:
            return getRandomCommonMailChest();
    }
}

const getRandomCommonMailChest = () => {
    const randInt = getRandomInt(1, 2);
    if (randInt === 1) {
        return rustyChainChest();
    } else {
        return soldierChainChest();
    }
}

const getRandomUncommonMailChest = () => {
    return elvinsMailChest();
}

const getRandomRareMailChest = () => {
    return ogreCaptainChest();
}

const bugInfestedChainChest = (): IMailChest => ({
    name: MailChestName.BUGINFESTEDCHAINCHEST,
    type: ArmorType.MAIL,
    slot: ArmorSlot.CHEST,
    hitPoints: 0,
    rarity: ItemRarity.LEGENDARY,
    imgSrc: ""
});

const rustyChainChest = (): IMailChest => ({
    name: MailChestName.RUSTYCHAINCHEST,
    type: ArmorType.MAIL,
    slot: ArmorSlot.CHEST,
    hitPoints: 8,
    rarity: ItemRarity.COMMON,
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/armor/mail/chest/scale-mail-common.svg"
});

const soldierChainChest = (): IMailChest => ({
    name: MailChestName.SOLDIERCHAINCHEST,
    type: ArmorType.MAIL,
    slot: ArmorSlot.CHEST,
    hitPoints: 10,
    rarity: ItemRarity.COMMON,
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/armor/mail/chest/mail-shirt-common.svg"
});

const elvinsMailChest = (): IMailChest => ({
    name: MailChestName.ELVINSCHAINCHEST,
    type: ArmorType.MAIL,
    slot: ArmorSlot.CHEST,
    hitPoints: 13,
    rarity: ItemRarity.UNCOMMON,
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/armor/mail/chest/chain-mail-uncommon.svg"
}); 

const ogreCaptainChest = (): IMailChest => ({
    name: MailChestName.OGRECAPTAINCHEST,
    type: ArmorType.MAIL,
    slot: ArmorSlot.CHEST,
    hitPoints: 17,
    rarity: ItemRarity.RARE,
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/armor/mail/chest/kevlar-rare.svg"
})