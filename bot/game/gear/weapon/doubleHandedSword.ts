import { Weapon, WeaponType } from '.';
import { ItemRarity } from '../rarity';


export interface DoubleHandedSword extends Weapon {
    type: WeaponType.DOUBLEHANDEDSWORD;
}

export enum DoubleHandedSwordName {
    TRAININGSWORD = "Training Sword",
    SCUFFEDBLADE = "Scuffed Blade",
    OLDCLAYMORE = "Old Claymore",
    LIONHEART = "Lion Heart"
}

export const doubleHandedSwordFactory = (doubleHandedSwordName: string) => {
    switch(doubleHandedSwordName) {
        case DoubleHandedSwordName.TRAININGSWORD:
            return trainingSword();
        case DoubleHandedSwordName.SCUFFEDBLADE:
            return scuffedBlade();
        case DoubleHandedSwordName.LIONHEART:
            return lionHeart();
            default:
                throw new Error(`Double handed sword: ${doubleHandedSwordName} was not found!`);
    }
}

const trainingSword = (): DoubleHandedSword => ({
    name: DoubleHandedSwordName.TRAININGSWORD,
    type: WeaponType.DOUBLEHANDEDSWORD,
    rarity: ItemRarity.COMMON,
    damage: {
        low: 4,
        high: 7
    },
    effects: [],
    critChance: 5,
    cleave: { chance: 0 },
    flurry: { chance: 0 }, 
});

const scuffedBlade = (): DoubleHandedSword => ({
    name: DoubleHandedSwordName.TRAININGSWORD,
    type: WeaponType.DOUBLEHANDEDSWORD,
    rarity: ItemRarity.COMMON,
    damage: {
        low: 5,
        high: 9
    },
    effects: [],
    critChance: 7,
    cleave: { chance: 0 },
    flurry: { chance: 0 }, 
});

const oldClaymore = (): DoubleHandedSword => ({
    name: DoubleHandedSwordName.TRAININGSWORD,
    type: WeaponType.DOUBLEHANDEDSWORD,
    rarity: ItemRarity.UNCOMMON,
    damage: {
        low: 7,
        high: 11
    },
    effects: [],
    critChance: 7,
    cleave: { chance: 10, num: { low: 2, high: 2 } },
    flurry: { chance: 0 },
})

const lionHeart = (): DoubleHandedSword => ({
    name: DoubleHandedSwordName.LIONHEART,
    type: WeaponType.DOUBLEHANDEDSWORD,
    rarity: ItemRarity.RARE,
    damage: {
        low: 10,
        high: 16
    },
    effects: [],
    critChance: 6,
    cleave: { chance: 0 },
    flurry: { chance: 15, num: { low: 2, high: 3 } }, 
});