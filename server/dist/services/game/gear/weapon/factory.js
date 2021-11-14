"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.weaponsFactory = void 0;
const rarity_1 = require("../rarity");
const knives_1 = require("./knives");
const oneHandedAxes_1 = require("./oneHandedAxes");
const oneHandedSwords_1 = require("./oneHandedSwords");
const staffs_1 = require("./staffs");
const _1 = require(".");
const weaponsFactory = (weaponStrings) => weaponStrings.map(weaponString => weaponSwitch(weaponString));
exports.weaponsFactory = weaponsFactory;
const weaponSwitch = (weaponString) => {
    const parsedString = weaponString.split(":");
    const weaponRecord = {
        name: parsedString[0],
        type: parsedString[1]
    };
    switch (weaponRecord.type) {
        // case WeaponType.CROSSBOW:
        //     return;
        // case WeaponType.DOUBLEHANDEDAXE:
        //     return;
        // case WeaponType.DOUBLEHANDEDSWORD:
        //     return;
        case _1.WeaponType.KNIFE:
            return knives_1.knifeFactory(weaponRecord.name);
        // case WeaponType.LONGBOW:
        //     return;
        case _1.WeaponType.ONEHANDEDAXE:
            return oneHandedAxes_1.oneHandedAxeFactory(weaponRecord.name);
        case _1.WeaponType.ONEHANDEDSWORD:
            return oneHandedSwords_1.oneHandedSwordFactory(weaponRecord.name);
        case _1.WeaponType.STAFF:
            return staffs_1.staffFactory(weaponRecord.name);
        default:
            return { name: "Fist", type: _1.WeaponType.UNARMED, rarity: rarity_1.ItemRarity.COMMON, damage: { low: 1, high: 2 }, effects: [] };
    }
};
