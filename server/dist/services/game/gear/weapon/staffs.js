"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.staffFactory = exports.StaffName = void 0;
const rarity_1 = require("../rarity");
const _1 = require(".");
var StaffName;
(function (StaffName) {
    StaffName["WALKINGSTICK"] = "Walking Stick";
})(StaffName = exports.StaffName || (exports.StaffName = {}));
const staffFactory = (staffName) => {
    switch (staffName) {
        case StaffName.WALKINGSTICK:
            return walkingStick();
        default:
            throw new Error(`Staff: ${staffName} was not found!`);
    }
};
exports.staffFactory = staffFactory;
const walkingStick = () => ({
    name: StaffName.WALKINGSTICK,
    type: _1.WeaponType.STAFF,
    rarity: rarity_1.ItemRarity.COMMON,
    damage: {
        low: 2,
        high: 3,
    },
    effects: [],
    critChance: 5,
    cleave: { chance: 0 },
    flurry: { chance: 0 },
});
