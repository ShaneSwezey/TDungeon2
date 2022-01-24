import { CurrentAvailiableItemRarity, ItemRarity } from "../../enums/item";
import { OneHandedSwordName, WeaponType } from "../../enums/weapon";
import { IOneHandedSword } from "../../interfaces/weapon";
import { getRandomInt } from "../../utils/math";

export const oneHandedSwordFactory = (oneHandedSwordName: string): IOneHandedSword => {
    switch(oneHandedSwordName) {
        case OneHandedSwordName.RUSTYSWORD:
            return rustySword();
        case OneHandedSwordName.CRACKEDSABRE:
            return crackedSabre();
        case OneHandedSwordName.KNIGHTSSIDE:
            return knightsSide();
        case OneHandedSwordName.COPPERBLADE:
            return copperBlade();
        default:
            throw new Error(`One handed sword: ${oneHandedSwordName} was not found!`);
    }
}

export const getRandomOneHandedSword = (rarity: CurrentAvailiableItemRarity) => {
    switch(rarity) {
        case CurrentAvailiableItemRarity.COMMON:
            return getRandomCommonOneHandedSword();
        case CurrentAvailiableItemRarity.UNCOMMON:
            return getRandomUncommonOneHandedSword();
        case CurrentAvailiableItemRarity.RARE:
            return getRandomRareOneHandedSword();
        default:
            return getRandomCommonOneHandedSword();
    }
}

const getRandomCommonOneHandedSword = () => {
    const randInt = getRandomInt(1, 2);
    if (randInt === 1) {
        return rustySword();
    } else {   
        return crackedSabre();
    }
}

const getRandomUncommonOneHandedSword = () => {
    return copperBlade();
}

const getRandomRareOneHandedSword = () => {
    return knightsSide();
}

const rustySword = (): IOneHandedSword => ({
    name: OneHandedSwordName.RUSTYSWORD,
    type: WeaponType.ONEHANDEDSWORD,
    rarity: ItemRarity.COMMON,
    damage: {
        low: 3,
        high: 5
    },
    crit: {
        chance: 5,
        multiplier: 2,
    },
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/weapons/onehandedswords/rusty-sword-common.svg"    
});

const crackedSabre = (): IOneHandedSword => ({
    name: OneHandedSwordName.CRACKEDSABRE,
    type: WeaponType.ONEHANDEDSWORD,
    rarity: ItemRarity.COMMON,
    damage: {
        low: 4,
        high: 7,
    },
    crit: {
        chance: 6,
        multiplier: 1.5
    },
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/weapons/onehandedswords/cracked-saber-common.svg"
});

const copperBlade = (): IOneHandedSword => ({
    name: OneHandedSwordName.COPPERBLADE,
    type: WeaponType.ONEHANDEDSWORD,
    rarity: ItemRarity.UNCOMMON,
    damage: {
        low: 7,
        high: 11,
    },
    crit: {
        chance: 7,
        multiplier: 1.5
    },
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/weapons/onehandedswords/croc-sword-uncommon.svg"
});

const knightsSide = (): IOneHandedSword => ({
    name: OneHandedSwordName.KNIGHTSSIDE,
    type: WeaponType.ONEHANDEDSWORD,
    rarity: ItemRarity.RARE,
    damage: {
        low: 9,
        high: 15
    },
    crit: {
        chance: 9,
        multiplier: 2
    },
    flurry: { 
        chance: 15, 
        num: { 
            high: 3, 
            low: 2 
        } 
    },
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/weapons/onehandedswords/dripping-sword-rare.svg"
});