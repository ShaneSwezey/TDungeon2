import { Weapon, WeaponType } from ".";
import { ItemRarity } from "../rarity";

export interface DoubleHandedAxe extends Weapon {
    type: WeaponType.DOUBLEHANDEDAXE;
}

export enum DoubleHandedAxeName {
    BARRACKAXE = "Barrack Axe",
    LUMBERAXE = "Lumber Axe",
    MOGROKSLOSTAXE = "Mogrok's Lost Axe"
}

export const doubleHandedAxeFactory = (doubleHandedAxeName: string) => {
    switch(doubleHandedAxeName) {
        case DoubleHandedAxeName.LUMBERAXE:
            return lumberAxe();
        case DoubleHandedAxeName.BARRACKAXE:
            return barrackAxe();
        case DoubleHandedAxeName.MOGROKSLOSTAXE:
            return mogroksLostAxe();
            default:
                throw new Error(`One handed sword: ${doubleHandedAxeName} was not found!`);
    }
}

const lumberAxe = (): DoubleHandedAxe => ({
    name: DoubleHandedAxeName.LUMBERAXE,
    type: WeaponType.DOUBLEHANDEDAXE,
    rarity: ItemRarity.COMMON,
    damage: {
        low: 5,
        high: 8
    },
    effects: [],
    critChance: 5,
    cleave: { chance: 0 },
    flurry: { chance: 0 }, 
});

const barrackAxe = (): DoubleHandedAxe => ({
    name: DoubleHandedAxeName.BARRACKAXE,
    type: WeaponType.DOUBLEHANDEDAXE,
    rarity: ItemRarity.UNCOMMON,
    damage: {
        low: 7,
        high: 12,
    },
    effects: [],
    critChance: 7,
    cleave: { chance: 0 },
    flurry: { chance: 0 }, 
});

const mogroksLostAxe = (): DoubleHandedAxe => ({
    name: DoubleHandedAxeName.MOGROKSLOSTAXE,
    type: WeaponType.DOUBLEHANDEDAXE,
    rarity: ItemRarity.RARE,
    damage: {
        low: 12,
        high: 19,
    },
    effects: [],
    critChance: 10,
    cleave: { chance: 15, num: { low: 2, high: 3 } },
    flurry: { chance: 0 }, 
});