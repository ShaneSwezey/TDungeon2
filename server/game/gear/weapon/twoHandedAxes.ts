import { TwoHandedAxeName, WeaponType } from "../../enums/weapon";
import { ITwoHandedAxe } from "../../interfaces/weapon";
import { CurrentAvailiableItemRarity, ItemRarity } from "../../enums/item";

export const twoHandedAxeFactory = (twoHandedAxeName: string) => {
    switch(twoHandedAxeName) {
        case TwoHandedAxeName.LUMBERAXE:
            return lumberAxe();
        case TwoHandedAxeName.BARRACKAXE:
            return barrackAxe();
        case TwoHandedAxeName.MOGROKSLOSTAXE:
            return mogroksLostAxe();
            default:
                throw new Error(`Two handed axe ${twoHandedAxeName} was not found!`);
    }
}

export const getRandomTwoHandedAxe = (rarity: CurrentAvailiableItemRarity) => {
    switch(rarity) {
        case CurrentAvailiableItemRarity.COMMON:
            return getRandomCommonTwoHandedAxe();
        case CurrentAvailiableItemRarity.UNCOMMON:
            return getRandomUncommonTwoHandedAxe();
        case CurrentAvailiableItemRarity.RARE:
            return getRandomRareTwoHandedAxe();
        default:
            return getRandomCommonTwoHandedAxe();
    }
}

const getRandomCommonTwoHandedAxe = () => {
    return lumberAxe();
}

const getRandomUncommonTwoHandedAxe = () => {
    return barrackAxe();
}

const getRandomRareTwoHandedAxe = () => {
    return mogroksLostAxe();
}

const lumberAxe = (): ITwoHandedAxe => ({
    name: TwoHandedAxeName.LUMBERAXE,
    type: WeaponType.TWOHANDEDAXE,
    rarity: ItemRarity.COMMON,
    damage: {
        low: 5,
        high: 8
    },
    crit: {
        chance: 5,
        multiplier: 2
    },
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/weapons/twohandedaxe/axe-in-log-common.svg"
});

const barrackAxe = (): ITwoHandedAxe => ({
    name: TwoHandedAxeName.BARRACKAXE,
    type: WeaponType.TWOHANDEDAXE,
    rarity: ItemRarity.UNCOMMON,
    damage: {
        low: 7,
        high: 12,
    },
    crit: {
        chance: 7,
        multiplier: 2
    },
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/weapons/twohandedaxe/battered-axe-uncommon.svg"
});

const mogroksLostAxe = (): ITwoHandedAxe => ({
    name: TwoHandedAxeName.MOGROKSLOSTAXE,
    type: WeaponType.TWOHANDEDAXE,
    rarity: ItemRarity.RARE,
    damage: {
        low: 12,
        high: 24,
    },
    crit: {
        chance: 14,
        multiplier: 1.5 
    },
    cleave: { 
        chance: 15, 
        num: { 
            low: 2, 
            high: 2 
        } 
    },
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/weapons/twohandedaxe/war-axe-rare.svg"
});