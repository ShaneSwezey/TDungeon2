import { IArmorRecord } from './armor';
import { IWeaponRecord } from './weapon';

export interface IInventoryFactoryArgs {
    weaponInventory: IWeaponRecord[];
    armorInventory: IArmorRecord[];
}