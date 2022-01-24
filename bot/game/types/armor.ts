import { ArmorType } from "../enums/armor";

export type MELEEARMOR = ArmorType.PLATE | ArmorType.MAIL | ArmorType.LEATHER;
export type RANGEDARMOR = ArmorType.MAIL | ArmorType.LEATHER;
export type ROGUEARMOR = ArmorType.LEATHER;
export type CASTERARMOR = ArmorType.CLOTH;