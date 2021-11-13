"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oneHandedSwordFactory = exports.OneHandedSwordName = void 0;
var rarity_1 = require("../rarity");
var _1 = require(".");
var OneHandedSwordName;
(function (OneHandedSwordName) {
    OneHandedSwordName["RUSTYSWORD"] = "Rusty Sword";
})(OneHandedSwordName = exports.OneHandedSwordName || (exports.OneHandedSwordName = {}));
var oneHandedSwordFactory = function (oneHandedSwordName) {
    switch (oneHandedSwordName) {
        case OneHandedSwordName.RUSTYSWORD:
            return rustySword();
        default:
            throw new Error("One handed sword: " + oneHandedSwordName + " was not found!");
    }
};
exports.oneHandedSwordFactory = oneHandedSwordFactory;
var rustySword = function () { return ({
    name: OneHandedSwordName.RUSTYSWORD,
    type: _1.WeaponType.ONEHANDEDSWORD,
    rarity: rarity_1.ItemRarity.COMMON,
    damage: {
        low: 3,
        high: 5
    },
    effects: []
}); };
