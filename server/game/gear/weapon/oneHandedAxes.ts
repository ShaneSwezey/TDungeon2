import { CurrentAvailiableItemRarity, ItemRarity } from "../../enums/item";
import { OneHandedAxeName, WeaponType } from "../../enums/weapon";
import { IOneHandedAxe } from "../../interfaces/weapon";
import { getRandomInt } from "../../utils/math";

export const oneHandedAxeFactory = (oneHandedAxeName: string): IOneHandedAxe => {
    switch(oneHandedAxeName) {
        case OneHandedAxeName.RUSTYAXE:
            return rustyAxe();
        case OneHandedAxeName.HATCHET:
            return hatchet();
        case OneHandedAxeName.LUMBERWICKER:
            return lumberWicker();
        default:
            throw new Error(`One handed axe: ${oneHandedAxeName} was not found`);
    }
}

export const getRandomOneHandedAxe = (rarity: CurrentAvailiableItemRarity) => {
    switch(rarity) {
        case CurrentAvailiableItemRarity.COMMON:
            return getRandomCommonOneHandedAxe();
        case CurrentAvailiableItemRarity.UNCOMMON:
            return getRandomUncommonOneHandedAxe();
        case CurrentAvailiableItemRarity.RARE:
            return getRandomUncommonOneHandedAxe();
        default:
            return getRandomCommonOneHandedAxe();
    }
}

const getRandomCommonOneHandedAxe = () => {
    const randInt = getRandomInt(1, 2);
    if ( randInt === 1) {
        return rustyAxe();
    } else {
        return hatchet();
    }
}

const getRandomUncommonOneHandedAxe = () => {
    return lumberWicker();
}

const rustyAxe = (): IOneHandedAxe => ({
    name: OneHandedAxeName.RUSTYAXE,
    type: WeaponType.ONEHANDEDAXE,
    rarity: ItemRarity.COMMON,
    damage: {
        low: 2,
        high: 4,
    },
    crit: {
        chance: 5,
        multiplier: 2,
    },
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/weapons/onehandedaxe/stone-axe-common.svg"
});

const hatchet = (): IOneHandedAxe => ({
    name: OneHandedAxeName.HATCHET,
    type: WeaponType.ONEHANDEDAXE,
    rarity: ItemRarity.COMMON,
    damage: {
        low: 5,
        high: 9,
    },
    crit: {
        chance: 6,
        multiplier: 2,
    },
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/weapons/onehandedaxe/hatchet-common.svg"
});

const lumberWicker = (): IOneHandedAxe => ({
    name: OneHandedAxeName.LUMBERWICKER,
    type: WeaponType.ONEHANDEDAXE,
    rarity: ItemRarity.UNCOMMON,
    damage: {
        low: 6,
        high: 11,
    },
    crit: {
        chance: 8,
        multiplier: 2
    },
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/weapons/onehandedaxe/axe-in-stump-uncommon.svg"
});

