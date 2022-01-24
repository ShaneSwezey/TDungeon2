import { IArmor } from "../interfaces/armor";
import { IDroppedItem } from "../interfaces/gear";
import { IInventoryFactoryArgs } from "../interfaces/inventory";
import { IWeapon } from "../interfaces/weapon";
export declare const inventoryFactory: ({ weaponInventory, armorInventory }: IInventoryFactoryArgs) => {
    armor: IArmor[];
    weapons: IWeapon[];
};
export declare const getDroppedItem: () => IDroppedItem;
//# sourceMappingURL=inventory.d.ts.map