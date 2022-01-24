import { CurrentAvailiableItemRarity } from "../enums/item";
import { IArmor } from "../interfaces/armor";
import { IDroppedItem } from "../interfaces/gear";
import { IInventoryFactoryArgs } from "../interfaces/inventory";
import { IWeapon } from "../interfaces/weapon";
import { getRandomInt, probabilityDistributor } from "../utils/math";
import { armorFactory, getRandomArmor } from "./armor/factory";
import { getRandomWeapon, weaponsFactory } from "./weapon/factory";

export const inventoryFactory = ({ weaponInventory, armorInventory }: IInventoryFactoryArgs) => {
    let armor: IArmor[] = [];
    let weapons: IWeapon[] = [];
    if (armorInventory.length) armor = armorFactory(armorInventory);
    if (weaponInventory.length) weapons = weaponsFactory(weaponInventory);
    return { armor, weapons };
};

export const getDroppedItem = () => {
    const rarity = probabilityDistributor(Object.values(CurrentAvailiableItemRarity), [20, 10, 1]);
    const rand = getRandomInt(1, 2);
    const droppedItem: IDroppedItem = { armor: undefined, weapon: undefined };
    if (rand === 1) {
        // armor
        droppedItem.armor = getRandomArmor(rarity);
    } else {
        // weapon   
        droppedItem.weapon = getRandomWeapon(rarity);
    }
    return droppedItem;
}