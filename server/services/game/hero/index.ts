import { Armor } from "../gear/armor";
import { Weapon } from "../gear/weapon";
import { Stamina } from "../stats/stamina";

export enum HeroType {
    Melee = "Melee",
    Ranged = "Ranged",
    Caster = "Caster"
}

export interface Hero {
    id?: string;
    stamina: Stamina;
    gold: number;   
    readonly name: string;
    readonly type: HeroType;
    readonly armor: Armor[];
    readonly weapons: Weapon[];
}