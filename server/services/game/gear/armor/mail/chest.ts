import { ItemRarity } from '../../rarity';
import { ArmorType, ArmorSlot } from '..';
import { Mail } from '.';

export interface MailChest extends Mail {
    name: MailChestName;
    slot: ArmorSlot.CHEST;
}

export enum MailChestName {
    BUGINFESTEDCHAINCHEST = "Bug Infested Chain Chest",
    RUSTYCHAINCHEST = "Rusty Chain Chest", 
    SOLDIERCHAINCHEST = "Soldier Chain Chest",
    ELVINSCHAINCHEST = "Elvins Chain Chest",
    OGRECAPTAINCHEST = "Ogre Captain Chest"
}

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

const bugInfestedChainChest = (): MailChest => ({
    name: MailChestName.BUGINFESTEDCHAINCHEST,
    type: ArmorType.MAIL,
    slot: ArmorSlot.CHEST,
    hitPoints: 0,
    rarity: ItemRarity.LEGENDARY,
});

const rustyChainChest = (): MailChest => ({
    name: MailChestName.RUSTYCHAINCHEST,
    type: ArmorType.MAIL,
    slot: ArmorSlot.CHEST,
    hitPoints: 8,
    rarity: ItemRarity.COMMON,
});

const soldierChainChest = (): MailChest => ({
    name: MailChestName.SOLDIERCHAINCHEST,
    type: ArmorType.MAIL,
    slot: ArmorSlot.CHEST,
    hitPoints: 10,
    rarity: ItemRarity.COMMON,
});

const elvinsMailChest = (): MailChest => ({
    name: MailChestName.ELVINSCHAINCHEST,
    type: ArmorType.MAIL,
    slot: ArmorSlot.CHEST,
    hitPoints: 13,
    rarity: ItemRarity.UNCOMMON,
}); 

const ogreCaptainChest = (): MailChest => ({
    name: MailChestName.OGRECAPTAINCHEST,
    type: ArmorType.MAIL,
    slot: ArmorSlot.CHEST,
    hitPoints: 17,
    rarity: ItemRarity.RARE,
})