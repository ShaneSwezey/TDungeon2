import { CurrentAvailiableItemRarity, ItemRarity } from "../../enums/item";
import { WeaponType } from "../../enums/weapon";
import { IWeapon, IWeaponRecord } from "../../interfaces/weapon";
import { getRandomInt } from "../../utils/math";
import { bowFactory, getRandomBow } from "./bow";
import { getRandomKnife, knifeFactory } from "./knives";
import { getRandomOneHandedAxe, oneHandedAxeFactory } from "./oneHandedAxes";
import { getRandomOneHandedSword, oneHandedSwordFactory } from "./oneHandedSwords";
import { getRandomStaff, staffFactory } from "./staffs";
import { getRandomTwoHandedAxe, twoHandedAxeFactory } from "./twoHandedAxes";
import { getRandomTwoHandedSword, twoHandedSwordFactory } from "./twoHandedSword";

export const weaponsFactory = (weaponRecords: IWeaponRecord[]): IWeapon[] => weaponRecords.map(weaponRecord => weaponSwitch(weaponRecord));

const weaponSwitch = (weaponRecord: IWeaponRecord): IWeapon => {
    switch(weaponRecord.type) {
        // case WeaponType.CROSSBOW:
        //     return;
        case WeaponType.TWOHANDEDAXE:
            return twoHandedAxeFactory(weaponRecord.name);
        case WeaponType.TWOHANDEDSWORD:
            return twoHandedSwordFactory(weaponRecord.name);
        case WeaponType.KNIFE:
            return knifeFactory(weaponRecord.name);
        case WeaponType.BOW:
            return bowFactory(weaponRecord.name);
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
                crit: {
                    chance: 2,
                    multiplier: 2
                },
                damage: { 
                    low: 1, 
                    high: 2 
                },
                imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/weapons/default/fist.svg" 
            };
    }
}

export const getRandomWeapon = (rarity: CurrentAvailiableItemRarity): IWeapon => {
    const randInt = getRandomInt(1, 7);
    if (randInt === 1) {
        return getRandomKnife(rarity);
    } else if (randInt === 2) {
        return getRandomOneHandedAxe(rarity);
    } else if (randInt === 3) {
        return getRandomOneHandedSword(rarity);
    } else if (randInt === 4) {
        return getRandomStaff(rarity);
    } else if (randInt === 5) {
        return getRandomTwoHandedAxe(rarity);
    } else if (randInt === 6) {
        return getRandomTwoHandedSword(rarity);
    } else {
        return getRandomBow(rarity);
    }
}