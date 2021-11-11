"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.weaponsFactory = void 0;
var rarity_1 = require("../rarity");
var knives_1 = require("./knives");
var oneHandedAxes_1 = require("./oneHandedAxes");
var oneHandedSwords_1 = require("./oneHandedSwords");
var staffs_1 = require("./staffs");
var _1 = require(".");
var weaponsFactory = function (weaponRecords) { return weaponRecords.map(function (weaponRecord) { return weaponSwitch(weaponRecord); }); };
exports.weaponsFactory = weaponsFactory;
var weaponSwitch = function (weaponRecord) {
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
            return { name: "Fist", type: _1.WeaponType.UNARMED, rarity: rarity_1.ItemRarity.COMMON, damage: { low: 1, high: 2 } };
    }
};
