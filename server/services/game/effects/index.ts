import { Hero } from "../hero";
import { Monster } from "../monster";

export enum EffectAppliedTo {
    HERO = "Hero",
    MONSTER = "Monster",
    OPPONENT = "Opponent"
}

export enum EffectType {
    BUFF = "Buff",
    DEBUFF = "Debuff"
}

export interface Effect {
    name: string;
    description?: string;
    type: EffectType;
    appliedTo: EffectAppliedTo;
    rounds: number;
}

export enum BuffType {
    STAT = "STAT",
    HEAL = "HEAL",
    DAMAGE = "DAMAGE"
}

export enum SubBuffType {
    MULTIWEAPONATTACK = "Multiple Weapon Attack",
}

export enum DebuffType {
    DAMAGE = "DAMAGE",
    STAT = "STAT"
}

export interface DamageDebuffEffect extends Effect {
    type: EffectType.DEBUFF;
    debuff: {
        type: DebuffType.DAMAGE;
        damage: EffectDamage;
    }
}

export interface DamageBuffEffect extends Effect {
    type: EffectType.BUFF;
    buff: {
        type: BuffType.DAMAGE;
        subType: SubBuffType
    }
}

export interface MultiWeaponDamageBuffEffect extends Effect {
    type: EffectType.BUFF;
    buff: {
        type: BuffType.DAMAGE;
        subType: SubBuffType.MULTIWEAPONATTACK
        attack: {
            chance: number;
            low: number;
            high: number;
        }
    }
}

interface EffectDamage {
    chance: number;
    low: number;
    high: number;
    critChance?: number;
}