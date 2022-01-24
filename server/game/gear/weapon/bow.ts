import { CurrentAvailiableItemRarity, ItemRarity } from "../../enums/item";
import { BowName, WeaponType } from "../../enums/weapon";
import { IBow } from "../../interfaces/weapon";
import { getRandomInt } from "../../utils/math";


export const bowFactory = (bowName: string): IBow => {
    switch(bowName) {
        case BowName.TWIGBOW:
            return twigBow();
        case BowName.CRACKEDOAKBOW:
            return crackedOakBow();
        case BowName.WOODSMANBOW:
            return woodsmanBow();
        case BowName.ELEVENSOLIDERBOW:
            return elevenSoliderBow();
        case BowName.PLAINSTROLLBOW:
            return plainsTrollBow();
        default:
            throw new Error(`Bow: ${bowName} was not found!`);
    }
}

export const getRandomBow = (rarity: CurrentAvailiableItemRarity) => {
    switch(rarity) {
        case CurrentAvailiableItemRarity.COMMON:
            return getRandomCommonBow();
        case CurrentAvailiableItemRarity.UNCOMMON:
            return getRandomUncommonBow();
        case CurrentAvailiableItemRarity.RARE:
            return getRandomRareBow();
        default:
            return getRandomCommonBow();
    }
}

const getRandomCommonBow = () => {
    const randInt = getRandomInt(1, 2);
    if (randInt === 1) {
        return twigBow();
    } else {
        return crackedOakBow();
    }
}

const getRandomUncommonBow = () => {
    const randInt = getRandomInt(1, 2);
    if (randInt === 1) {
        return woodsmanBow();
    } else {
        return elevenSoliderBow();
    }
}

const getRandomRareBow = () => {
    return plainsTrollBow();
}

const twigBow = (): IBow => ({
    name: BowName.TWIGBOW,
    type: WeaponType.BOW,
    rarity: ItemRarity.COMMON,
    damage: {
        low: 3,
        high: 4
    },
    crit: {
        chance: 6,
        multiplier: 2
    },
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/weapons/bow/bow-arrow-common.svg"
});

const crackedOakBow = (): IBow => ({
    name: BowName.CRACKEDOAKBOW,
    type: WeaponType.BOW,
    rarity: ItemRarity.COMMON,
    damage: {
        low: 5,
        high: 8
    },
    crit: {
        chance: 7,
        multiplier: 2
    },
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/weapons/bow/bow-string-common.svg"
});

const woodsmanBow = (): IBow => ({
    name: BowName.WOODSMANBOW,
    type: WeaponType.BOW,
    rarity: ItemRarity.UNCOMMON,
    damage: {
        low: 7,
        high: 11
    },
    crit: {
        chance: 10,
        multiplier: 1.5
    },
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/weapons/bow/high-shot-uncommon.svg"
});

const elevenSoliderBow = (): IBow => ({
    name: BowName.ELEVENSOLIDERBOW,
    type: WeaponType.BOW,
    rarity: ItemRarity.UNCOMMON,
    damage: {
        low: 9,
        high: 15
    },
    crit: {
        chance: 10,
        multiplier: 2
    },
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/weapons/bow/pocket-bow-uncommon.svg"
});

const plainsTrollBow = (): IBow => ({
    name: BowName.PLAINSTROLLBOW,
    type: WeaponType.BOW,
    rarity: ItemRarity.RARE,
    damage: {
        low: 11,
        high: 19
    },
    crit: {
        chance: 12,
        multiplier: 1.75
    },
    flurry: {
        chance: 15,
        num: {
            low: 2,
            high: 2
        }
    },
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/weapons/bow/heavy-arrow-rare.svg"
})