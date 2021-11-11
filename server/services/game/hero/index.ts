import { Armor } from "../gear/armor";
import { Weapon } from "../gear/weapon";
import { Stamina } from "../stats/stamina";

export enum HeroType {
    Melee = "MELEE",
    Ranged = "RANGED",
    Caster = "CASTER"
}

export interface Hero {
    readonly name: string;
    readonly type: HeroType;
    readonly stamina: Stamina;
    readonly armor: Armor[];
    readonly weapons: Weapon[];
    gold: number;   
}