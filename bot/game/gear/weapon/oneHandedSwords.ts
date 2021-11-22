import { ItemRarity } from "../rarity";
import { Weapon, WeaponType } from ".";

export interface OneHandedSword extends Weapon {
    type: WeaponType.ONEHANDEDSWORD,
}

export enum OneHandedSwordName {
    RUSTYSWORD = "Rusty Sword"
}

export const oneHandedSwordFactory = (oneHandedSwordName: string): OneHandedSword => {
    switch(oneHandedSwordName) {
        case OneHandedSwordName.RUSTYSWORD:
            return rustySword();
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
    critChance: 10,
    cleave: { chance: 0 },
    flurry: { chance: 0 }, 
});