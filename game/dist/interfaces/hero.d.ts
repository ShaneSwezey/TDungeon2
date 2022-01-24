import { HeroType } from "../enums/hero";
import { IArmor, IArmorRecord } from "./armor";
import { IStamina } from "./stamina";
import { IWeapon, IWeaponRecord } from "./weapon";
export interface IHero {
    id?: string;
    crit: number;
    dodge: number;
    block: number;
    attackPower: number;
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
    armor?: IArmorRecord[];
    weapons?: IWeaponRecord[];
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
export interface newHeroArgs {
    readonly name: string;
    readonly type: HeroType;
}
//# sourceMappingURL=hero.d.ts.map