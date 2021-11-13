"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.staffFactory = exports.StaffName = void 0;
var rarity_1 = require("../rarity");
var _1 = require(".");
var StaffName;
(function (StaffName) {
    StaffName["WALKINGSTICK"] = "Walking Stick";
})(StaffName = exports.StaffName || (exports.StaffName = {}));
var staffFactory = function (staffName) {
    switch (staffName) {
        case StaffName.WALKINGSTICK:
            return walkingStick();
        default:
            throw new Error("Staff: " + staffName + " was not found!");
    }
};
exports.staffFactory = staffFactory;
var walkingStick = function () { return ({
    name: StaffName.WALKINGSTICK,
    type: _1.WeaponType.STAFF,
    rarity: rarity_1.ItemRarity.COMMON,
    damage: {
        low: 2,
        high: 3,
    },
    effects: []
}); };
