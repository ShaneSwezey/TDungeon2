import { IArmor } from "./armor";
import { IWeapon } from "./weapon";

export interface IInventory {
    heroId: string;
    gold: number;
    armorInventory: IArmor[];
    weaponInventory: IWeapon[];
}