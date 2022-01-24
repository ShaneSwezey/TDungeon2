import { IArmor, IArmorRecord } from "../game/interfaces/armor";
import { IWeapon, IWeaponRecord } from "../game/interfaces/weapon";

export interface IInventory {
    heroId: string;
    gold: number;
    armorInventory: IArmor[];
    weaponInventory: IWeapon[];
}

export interface IArmorInventory {
    heroId: string;
    armorInventory: IArmorRecord[];
}

export interface IWeaponInventory {
    heroId: string;
    weaponInventory: IWeaponRecord[];
}