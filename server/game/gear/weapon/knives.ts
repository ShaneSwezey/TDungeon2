import { KnifeName, WeaponType } from "../../enums/weapon";
import { IKnife } from "../../interfaces/weapon";
import { CurrentAvailiableItemRarity, ItemRarity } from "../../enums/item";
import { getRandomInt } from "../../utils/math";

export const knifeFactory = (knifeName: string): IKnife => {
    switch(knifeName) {
        case KnifeName.BUTTERKNIFE:
            return butterKnife();
        case KnifeName.KRISBLADE:
            return krisBlade();
        case KnifeName.LETTEROPENER:
            return letterOpener();
        case KnifeName.THIEFBLADE:
            return thiefBlade();
        case KnifeName.SHANK:
            return shank();
        default:
            throw new Error(`Knife: ${knifeName} was not found!`);
    }
}

export const getRandomKnife = (rarity: CurrentAvailiableItemRarity) => {
    switch(rarity) {
        case CurrentAvailiableItemRarity.COMMON:
            return getRandomCommonKnife();
        case CurrentAvailiableItemRarity.UNCOMMON:
            return getRandomUncommonKnife();
        case CurrentAvailiableItemRarity.RARE:
            return getRandomRareKnife();
        default:
            return getRandomCommonKnife();
    }
}

const getRandomCommonKnife = () => {
    const randInt = getRandomInt(1, 2);
    if (randInt === 1) {
        return butterKnife();
    } else {
        return krisBlade();
    }
}

const getRandomRareKnife = () => {
    return shank();
}

const getRandomUncommonKnife = () => {
    const randInt = getRandomInt(1, 2);
    if (randInt === 1) {
        return letterOpener();
    } else {
        return thiefBlade();
    }
}

const butterKnife = (): IKnife => ({ 
    name: KnifeName.BUTTERKNIFE,
    type: WeaponType.KNIFE,
    rarity: ItemRarity.COMMON,
    damage: {
        low: 1,
        high: 3
    },
    crit: {
        chance: 5,
        multiplier: 2,
    },
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/weapons/knife/butter-common.svg"
});

const krisBlade = (): IKnife => ({
    name: KnifeName.KRISBLADE,
    type: WeaponType.KNIFE,
    rarity: ItemRarity.COMMON,
    damage: {
        low: 2,
        high: 4
    },
    crit: {
        chance: 7,
        multiplier: 2
    },
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/weapons/knife/bone-knife-common.svg"
});

const letterOpener = (): IKnife => ({
    name: KnifeName.LETTEROPENER,
    type: WeaponType.KNIFE,
    rarity: ItemRarity.UNCOMMON,
    damage: {
        low: 3,
        high: 5
    },
    crit: {
        chance: 7,
        multiplier: 2
    },
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/weapons/knife/switch-blade-uncommon.svg"
});

const thiefBlade = (): IKnife => ({
    name: KnifeName.THIEFBLADE,
    type: WeaponType.KNIFE,
    rarity: ItemRarity.UNCOMMON,
    damage: {
        high: 7,
        low: 4,
    },
    crit: {
        chance: 9,
        multiplier: 1.5
    },
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/weapons/knife/bowie-knife-uncommon.svg"
});

const shank = (): IKnife => ({
    name: KnifeName.SHANK,
    type: WeaponType.KNIFE,
    rarity: ItemRarity.RARE,
    damage: {
        high: 10,
        low: 5,
    },
    crit: {
        chance: 12,
        multiplier: 2,
    },
    flurry: { 
        chance: 15, 
        num: { 
            high: 3, 
            low: 2 
        } 
    },
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/weapons/knife/shank-rare.svg"
})