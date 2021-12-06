import { ItemRarity } from "../rarity";
import { Weapon, WeaponType } from ".";
import { PoisonEffect, poisonEffectFactory } from "../../effects/debuff/damage/poison";

export interface Knife extends Weapon {
    name: KnifeName,
    type: WeaponType.KNIFE
}

export enum KnifeName {
    BUTTERKNIFE = "Butter Knife",
    KRISBLADE = "Kris Blade",
    LETTEROPENER = "Letter Opener",
    THIEFBLADE = "Thief Blade",
    SHANK = "Shank"
}

export const knifeFactory = (knifeName: string): Knife => {
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

const butterKnife = (): Knife => ({ 
    name: KnifeName.BUTTERKNIFE,
    type: WeaponType.KNIFE,
    rarity: ItemRarity.COMMON,
    damage: {
        low: 1,
        high: 3
    },
    effects: [],
    critChance: 5,
    cleave: { chance: 0 },
    flurry: { chance: 0 }, 
}); 

const krisBlade = (): Knife => ({
    name: KnifeName.KRISBLADE,
    type: WeaponType.KNIFE,
    rarity: ItemRarity.COMMON,
    damage: {
        low: 2,
        high: 4
    },
    effects: [],
    critChance: 6,
    cleave: { chance: 0 },
    flurry: { chance: 0 }, 
});

const letterOpener = (): Knife => ({
    name: KnifeName.LETTEROPENER,
    type: WeaponType.KNIFE,
    rarity: ItemRarity.UNCOMMON,
    damage: {
        low: 3,
        high: 7
    },
    critChance: 10,
    cleave: { chance: 0 },
    flurry: { chance: 0 }, 
    effects: [poisonEffectFactory(PoisonEffect.BLACKINK)]
});

const thiefBlade = (): Knife => ({
    name: KnifeName.THIEFBLADE,
    type: WeaponType.KNIFE,
    rarity: ItemRarity.UNCOMMON,
    damage: {
        high: 8,
        low: 6,
    },
    critChance: 5,
    cleave: { chance: 0 },
    flurry: { chance: 10, num: { high: 2, low: 2 } },
    effects: []
});

const shank = (): Knife => ({
    name: KnifeName.SHANK,
    type: WeaponType.KNIFE,
    rarity: ItemRarity.RARE,
    damage: {
        high: 10,
        low: 7,
    },
    critChance: 10,
    cleave: { chance: 0 },
    flurry: { chance: 25, num: { high: 3, low: 2 } },
    effects: []
})