import { KnifeName, BowName, OneHandedAxeName, OneHandedSwordName, StaffName, TwoHandedAxeName, TwoHandedSwordName, WeaponType } from "../enums/weapon";
import { ItemRarity } from "../enums/item";
export interface IWeapon {
    readonly name: string;
    readonly damage: IWeaponDamage;
    readonly type: WeaponType;
    readonly rarity: ItemRarity;
    readonly crit: ICrit;
    readonly imgSrc: string;
    readonly attackPower?: number;
    readonly cleave?: ICleave;
    readonly flurry?: IFlurry;
    readonly description?: string;
}
export interface IWeaponRecord {
    name: string;
    type: string;
}
export interface IWeaponDamage {
    low: number;
    high: number;
}
export interface IWeaponAttack extends IWeapon {
    attack: {
        value: number;
        isCrit: boolean;
    };
}
export interface ICleave {
    chance: number;
    num: {
        low: number;
        high: number;
    };
}
export interface IFlurry {
    chance: number;
    num: {
        low: number;
        high: number;
    };
}
export interface ICrit {
    chance: number;
    multiplier: number;
}
export interface ITwoHandedAxe extends IWeapon {
    name: TwoHandedAxeName;
    type: WeaponType.TWOHANDEDAXE;
}
export interface IKnife extends IWeapon {
    name: KnifeName;
    type: WeaponType.KNIFE;
}
export interface ITwoHandedSword extends IWeapon {
    name: TwoHandedSwordName;
    type: WeaponType.TWOHANDEDSWORD;
}
export interface IOneHandedAxe extends IWeapon {
    name: OneHandedAxeName;
    type: WeaponType.ONEHANDEDAXE;
}
export interface IOneHandedSword extends IWeapon {
    name: OneHandedSwordName;
    type: WeaponType.ONEHANDEDSWORD;
}
export interface IStaff extends IWeapon {
    name: StaffName;
    type: WeaponType.STAFF;
}
export interface IBow extends IWeapon {
    name: BowName;
    type: WeaponType.BOW;
}
//# sourceMappingURL=weapon.d.ts.map