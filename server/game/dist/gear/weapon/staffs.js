"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomStaff = exports.staffFactory = void 0;
const item_1 = require("../../enums/item");
const weapon_1 = require("../../enums/weapon");
const staffFactory = (staffName) => {
    switch (staffName) {
        case weapon_1.StaffName.WALKINGSTICK:
            return walkingStick();
        default:
            throw new Error(`Staff: ${staffName} was not found!`);
    }
};
exports.staffFactory = staffFactory;
const getRandomStaff = (rarity) => walkingStick();
exports.getRandomStaff = getRandomStaff;
const walkingStick = () => ({
    name: weapon_1.StaffName.WALKINGSTICK,
    type: weapon_1.WeaponType.STAFF,
    rarity: item_1.ItemRarity.COMMON,
    damage: {
        low: 2,
        high: 3,
    },
    crit: {
        chance: 4,
        multiplier: 1.2
    },
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/weapons/staff/wood-stick-common.svg"
});
