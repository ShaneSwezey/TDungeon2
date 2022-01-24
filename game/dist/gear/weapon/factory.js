"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomWeapon = exports.weaponsFactory = void 0;
const item_1 = require("../../enums/item");
const weapon_1 = require("../../enums/weapon");
const math_1 = require("../../utils/math");
const bow_1 = require("./bow");
const knives_1 = require("./knives");
const oneHandedAxes_1 = require("./oneHandedAxes");
const oneHandedSwords_1 = require("./oneHandedSwords");
const staffs_1 = require("./staffs");
const twoHandedAxes_1 = require("./twoHandedAxes");
const twoHandedSword_1 = require("./twoHandedSword");
const weaponsFactory = (weaponRecords) => weaponRecords.map(weaponRecord => weaponSwitch(weaponRecord));
exports.weaponsFactory = weaponsFactory;
const weaponSwitch = (weaponRecord) => {
    switch (weaponRecord.type) {
        // case WeaponType.CROSSBOW:
        //     return;
        case weapon_1.WeaponType.TWOHANDEDAXE:
            return (0, twoHandedAxes_1.twoHandedAxeFactory)(weaponRecord.name);
        case weapon_1.WeaponType.TWOHANDEDSWORD:
            return (0, twoHandedSword_1.twoHandedSwordFactory)(weaponRecord.name);
        case weapon_1.WeaponType.KNIFE:
            return (0, knives_1.knifeFactory)(weaponRecord.name);
        case weapon_1.WeaponType.BOW:
            return (0, bow_1.bowFactory)(weaponRecord.name);
        case weapon_1.WeaponType.ONEHANDEDAXE:
            return (0, oneHandedAxes_1.oneHandedAxeFactory)(weaponRecord.name);
        case weapon_1.WeaponType.ONEHANDEDSWORD:
            return (0, oneHandedSwords_1.oneHandedSwordFactory)(weaponRecord.name);
        case weapon_1.WeaponType.STAFF:
            return (0, staffs_1.staffFactory)(weaponRecord.name);
        default:
            return {
                name: "Fist",
                type: weapon_1.WeaponType.UNARMED,
                rarity: item_1.ItemRarity.COMMON,
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
};
const getRandomWeapon = (rarity) => {
    const randInt = (0, math_1.getRandomInt)(1, 7);
    if (randInt === 1) {
        return (0, knives_1.getRandomKnife)(rarity);
    }
    else if (randInt === 2) {
        return (0, oneHandedAxes_1.getRandomOneHandedAxe)(rarity);
    }
    else if (randInt === 3) {
        return (0, oneHandedSwords_1.getRandomOneHandedSword)(rarity);
    }
    else if (randInt === 4) {
        return (0, staffs_1.getRandomStaff)(rarity);
    }
    else if (randInt === 5) {
        return (0, twoHandedAxes_1.getRandomTwoHandedAxe)(rarity);
    }
    else if (randInt === 6) {
        return (0, twoHandedSword_1.getRandomTwoHandedSword)(rarity);
    }
    else {
        return (0, bow_1.getRandomBow)(rarity);
    }
};
exports.getRandomWeapon = getRandomWeapon;
