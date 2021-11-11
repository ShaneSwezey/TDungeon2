import { Effect } from "../../effects";
import { ItemRarity } from "../rarity";

export enum WeaponType {
    ONEHANDEDSWORD = "One Handed Sword",
    DOUBLEHANDEDSWORD = "Double Handed Sword",
    ONEHANDEDAXE = "One Handed Axe",
    DOUBLEHANDEDAXE = "Double Handed Axe",
    KNIFE = "Knife",
    LONGBOW = "Long Bow",
    CROSSBOW = "Cross Bow",
    STAFF = "Staff",
    UNARMED = "Unarmed"
}

export interface WeaponDamage {
    low: number;
    high: number;
}

export interface Weapon {
    readonly name: string
    readonly damage: WeaponDamage;
    readonly type: WeaponType;
    readonly rarity: ItemRarity;
    readonly effects: Effect[];
    readonly description?: string; 
}

export interface WeaponAttack extends Weapon {
    attack: {
        value: number;
        isCrit: boolean
    };
}