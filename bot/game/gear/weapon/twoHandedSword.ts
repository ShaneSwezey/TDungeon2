import { TwoHandedSwordName, WeaponType } from "../../enums/weapon";
import { ITwoHandedSword } from "../../interfaces/weapon";
import { CurrentAvailiableItemRarity, ItemRarity } from "../../enums/item"; 
import { getRandomInt } from "../../utils/math";

export const twoHandedSwordFactory = (twoHandedSwordName: string) => {
    switch(twoHandedSwordName) {
        case TwoHandedSwordName.TRAININGSWORD:
            return trainingSword();
        case TwoHandedSwordName.SCUFFEDBLADE:
            return scuffedBlade();
        case TwoHandedSwordName.OLDCLAYMORE:
            return oldClaymore();
        case TwoHandedSwordName.LIONHEART:
            return lionHeart();
            default:
                throw new Error(`Two handed sword: ${twoHandedSwordName} was not found!`);
    }
}

export const getRandomTwoHandedSword = (rarity: CurrentAvailiableItemRarity) => {
    switch(rarity) {
        case CurrentAvailiableItemRarity.COMMON:
            return getRandomCommonTwoHandedSword();
        case CurrentAvailiableItemRarity.UNCOMMON:
            return getRandomUncommonTwoHandedSword();
        case CurrentAvailiableItemRarity.RARE:
            return getRandomRareTwoHandedSword();
        default:
            return getRandomCommonTwoHandedSword();
    }
}

const getRandomCommonTwoHandedSword = () => {
    const randInt = getRandomInt(1, 2);
    if (randInt === 1) {
        return trainingSword();
    } else {
        return scuffedBlade();
    }
}

const getRandomUncommonTwoHandedSword = () => {
    return oldClaymore();
}

const getRandomRareTwoHandedSword = () => {
    return lionHeart();
}

const trainingSword = (): ITwoHandedSword => ({
    name: TwoHandedSwordName.TRAININGSWORD,
    type: WeaponType.TWOHANDEDSWORD,
    rarity: ItemRarity.COMMON,
    damage: {
        low: 4,
        high: 7
    },
    crit: {
        chance: 4,
        multiplier: 2
    },
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/weapons/twohandedswords/bo-common.svg"
});

const scuffedBlade = (): ITwoHandedSword => ({
    name: TwoHandedSwordName.SCUFFEDBLADE,
    type: WeaponType.TWOHANDEDSWORD,
    rarity: ItemRarity.COMMON,
    damage: {
        low: 5,
        high: 10
    },
    crit: {
        chance: 7,
        multiplier: 2
    },
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/weapons/twohandedswords/ancient-sword-common.svg"
});

const oldClaymore = (): ITwoHandedSword => ({
    name: TwoHandedSwordName.OLDCLAYMORE,
    type: WeaponType.TWOHANDEDSWORD,
    rarity: ItemRarity.UNCOMMON,
    damage: {
        low: 11,
        high: 16
    },
    crit: {
        chance: 10,
        multiplier: 2
    },
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/weapons/twohandedswords/stiletto-uncommon.svg"
})

const lionHeart = (): ITwoHandedSword => ({
    name: TwoHandedSwordName.LIONHEART,
    type: WeaponType.TWOHANDEDSWORD,
    rarity: ItemRarity.RARE,
    damage: {
        low: 14,
        high: 21
    },
    crit: {
        chance: 10,
        multiplier: 1.5,
    },
    flurry: { 
        chance: 15, 
        num: { 
            low: 2, 
            high: 2 
        } 
    },
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/weapons/twohandedswords/pointy-sword-rare.svg" 
});