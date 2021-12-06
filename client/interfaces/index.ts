export interface Battle {
    _id: string;
    winner: string;
    createdAt: string;
}

export interface BattleEvent {
    _id: string;
    battleId: string;
    round: number;
    iteration: number;
    event: Event;
    createdAt: string;
    updatedAt: string;
}

export interface Event {
    type: string;
    value: number;
    isCrit: boolean;
    deathBlow: boolean;
    to: Monster | Hero ;
    from: HeroAttack | Monster;
}

export interface Stamina {
    maxHitPoints: number;
    hitPoints: number;  // current hit points;
}

export interface HeroAttack {
    id: string;
    name: string;
    type: string;
    stamina: Stamina;
    weapon: Weapon;
    armor: Armor[];
}

export interface Hero {
    id?: string;
    stamina: Stamina;
    gold: number;   
    readonly name: string;
    readonly type: HeroType;
    readonly armor: Armor[];
    readonly weapons: Weapon[];
    readonly inventory?: (Armor|Weapon)[]
}

export enum HeroType {
    Melee = "Melee",
    Ranged = "Ranged",
    Caster = "Caster"
}

export interface Monster {
    id?: string;
    stamina: Stamina;
    readonly type: string;
    readonly attack: MonsterAttack;
}

export interface MonsterAttack {
    high: number;
    low: number;
    attackPower: number;
    type: MonsterAttackType;
}

export enum MonsterAttackType {
    SLASH = "Slash",
    STABBED = "Stabbed",
    PUNCHED = "Punched",
}

export interface Weapon {
    readonly name: string
    readonly rarity: string;
    readonly damage: WeaponDamage;
    readonly type: WeaponType;
    //readonly effects: Effect[];
    readonly description?: string; 
    
}

export interface Armor {
    readonly name: string;
    readonly hitPoints: number;
    readonly rarity: string;
    readonly type: ArmorType;
    readonly slot: ArmorSlot;
    readonly description?: string;
    readonly attackPower?: number;
}

export enum ArmorType {
    CLOTH = "Cloth",
    LEATHER = "Leather",
    MAIL = "Mail",
    PLATE = "Plate"
}

export enum ArmorSlot {
    HELM = "Helm",
    CHEST = "Chest",
    GLOVES = "Gloves",
    PANTS = "Pants",
}

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