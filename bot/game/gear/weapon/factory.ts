import { ItemRarity } from "../rarity";
import { knifeFactory } from "./knives";
import { oneHandedAxeFactory } from "./oneHandedAxes";
import { oneHandedSwordFactory } from "./oneHandedSwords";
import { staffFactory } from "./staffs";
import { Weapon, WeaponType } from ".";

// name:type
interface WeaponRecord {
    name: string;
    type: string;
}

export const weaponsFactory = (weaponStrings: string[]): Weapon[] => weaponStrings.map(weaponString => weaponSwitch(weaponString));

const weaponSwitch = (weaponString: string): Weapon => {
    const parsedString = weaponString.split(":");
    const weaponRecord = {
        name: parsedString[0],
        type: parsedString[1]
    }

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
            return { 
                name: "Fist", 
                type: WeaponType.UNARMED, 
                rarity: ItemRarity.COMMON,
                critChance: 0,
                cleave: { chance: 0},
                flurry: { chance: 0}, 
                damage: { low: 1, high: 2 }, 
                effects: [], 
            };
    }
}