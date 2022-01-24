import { HeroType } from "../enums/hero";
import { IArmor } from "./armor";
import { IStamina } from "./stamina";
import { IWeapon } from "./weapon";

export interface IHero {
    id?: string;
    crit: number;
    dodge: number;
    block: number;
    attackPower: number;
    readonly active: boolean;
    readonly name: string;
    readonly type: HeroType;
    readonly armor: IArmor[];
    readonly weapons: IWeapon[];
    readonly stamina: IStamina;
}

export interface IHeroDBStats {
    id?: string;
    name: string;
    type: string;
    hitPoints?: string;
    armor?: string[];
    weapons?: string[];
}

export interface IHeroStats {
    id?: string;
    stamina: IStamina;
    crit: number;
    dodge: number;
    attackPower: number;   
    readonly name: string;
    readonly type: HeroType;
    readonly armor: IArmor[];
    readonly weapons: IWeapon[];
}

export interface IBattleEventHero {
    id?: string;
    crit: number;
    dodge: number;
    block: number;
    attackPower: number;
    readonly active: boolean;
    readonly name: string;
    readonly heroType: HeroType;
    readonly armor: IArmor[];
    readonly weapons: IWeapon[];
    readonly stamina: IStamina;
}
