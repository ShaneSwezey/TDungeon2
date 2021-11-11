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
}

export const knifeFactory = (knifeName: string): Knife => {
    switch(knifeName) {
        case KnifeName.BUTTERKNIFE:
            return butterKnife();
        case KnifeName.KRISBLADE:
            return krisBlade();
        case KnifeName.LETTEROPENER:
            return letterOpener();
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
    effects: []
});

const krisBlade = (): Knife => ({
    name: KnifeName.KRISBLADE,
    type: WeaponType.KNIFE,
    rarity: ItemRarity.COMMON,
    damage: {
        low: 2,
        high: 4
    },
    effects: []
});

const letterOpener = (): Knife => ({
    name: KnifeName.LETTEROPENER,
    type: WeaponType.KNIFE,
    rarity: ItemRarity.UNCOMMON,
    damage: {
        low: 5,
        high: 8
    },
    effects: [poisonEffectFactory(PoisonEffect.BLACKINK)]
})