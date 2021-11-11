import { ItemRarity } from "../rarity";
import { knifeFactory } from "./knives";
import { oneHandedAxeFactory } from "./oneHandedAxes";
import { oneHandedSwordFactory } from "./oneHandedSwords";
import { staffFactory } from "./staffs";
import { Weapon, WeaponType } from ".";

interface WeaponRecord {
    name: string;
    type: string;
}

export const weaponsFactory = (weaponRecords: WeaponRecord[]): Weapon[] => weaponRecords.map(weaponRecord => weaponSwitch(weaponRecord));

const weaponSwitch = (weaponRecord: WeaponRecord): Weapon => {
    switch(weaponRecord.type) {
        // case WeaponType.CROSSBOW:
        //     return;
        // case WeaponType.DOUBLEHANDEDAXE:
        //     return;
        // case WeaponType.DOUBLEHANDEDSWORD:
        //     return;
        case WeaponType.KNIFE:
            return knifeFactory(weaponRecord.name);
        // case WeaponType.LONGBOW:
        //     return;
        case WeaponType.ONEHANDEDAXE:
            return oneHandedAxeFactory(weaponRecord.name);
        case WeaponType.ONEHANDEDSWORD:
            return oneHandedSwordFactory(weaponRecord.name);
        case WeaponType.STAFF:
            return staffFactory(weaponRecord.name);
        default:
            return { name: "Fist", type: WeaponType.UNARMED, rarity: ItemRarity.COMMON, damage: { low: 1, high: 2 }, effects: [] };
    }
}