import { ItemRarity } from "../rarity";
import { Weapon, WeaponType } from ".";

export interface OneHandedSword extends Weapon {
    type: WeaponType.ONEHANDEDSWORD,
}

export enum OneHandedSwordName {
    RUSTYSWORD = "Rusty Sword",
    SABRE = "Sabre",
    COPPERBLADE = "Copper Blade",
    KNIGHTSSIDE= "Knight's Side"
}

export const oneHandedSwordFactory = (oneHandedSwordName: string): OneHandedSword => {
    switch(oneHandedSwordName) {
        case OneHandedSwordName.RUSTYSWORD:
            return rustySword();
        case OneHandedSwordName.SABRE:
            return sabre();
        case OneHandedSwordName.KNIGHTSSIDE:
            return knightsSide();
        case OneHandedSwordName.COPPERBLADE:
            return copperBlade();
        default:
            throw new Error(`One handed sword: ${oneHandedSwordName} was not found!`);
    }
}

const rustySword = (): OneHandedSword => ({
    name: OneHandedSwordName.RUSTYSWORD,
    type: WeaponType.ONEHANDEDSWORD,
    rarity: ItemRarity.COMMON,
    damage: {
        low: 3,
        high: 5
    },
    effects: [],
    critChance: 5,
    cleave: { chance: 0 },
    flurry: { chance: 0 }, 
});

const sabre = (): OneHandedSword => ({
    name: OneHandedSwordName.SABRE,
    type: WeaponType.ONEHANDEDSWORD,
    rarity: ItemRarity.COMMON,
    damage: {
        low: 4,
        high: 6,
    },
    effects: [],
    critChance: 6,
    cleave: { chance: 0 },
    flurry: { chance: 0 },
});

const copperBlade = (): OneHandedSword => ({
    name: OneHandedSwordName.COPPERBLADE,
    type: WeaponType.ONEHANDEDSWORD,
    rarity: ItemRarity.UNCOMMON,
    critChance: 8,
    damage: {
        low: 7,
        high: 11,
    },
    cleave: { chance: 0 },
    flurry: { chance: 0 },
    effects: []
});

const knightsSide = (): OneHandedSword => ({
    name: OneHandedSwordName.KNIGHTSSIDE,
    type: WeaponType.ONEHANDEDSWORD,
    rarity: ItemRarity.RARE,
    damage: {
        low: 9,
        high: 15
    },
    effects: [],
    critChance: 15,
    cleave: { chance: 0 },
    flurry: { chance: 15, num: { high: 3, low: 2 } }
});