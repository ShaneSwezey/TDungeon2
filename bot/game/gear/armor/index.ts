import { ItemRarity } from "../rarity";

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

export interface Armor {
    readonly name: string;
    readonly hitPoints: number;
    readonly type: ArmorType;
    readonly slot: ArmorSlot
    readonly rarity: ItemRarity,
    readonly description?: string;
    readonly attackPower?: number;
}


type MELEEARMOR = ArmorType.PLATE | ArmorType.MAIL | ArmorType.LEATHER;
type RANGEDARMOR = ArmorType.MAIL | ArmorType.LEATHER;
type CASTERARMOR = ArmorType.CLOTH;