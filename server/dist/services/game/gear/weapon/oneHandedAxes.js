"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oneHandedAxeFactory = exports.OneHandedAxeName = void 0;
var rarity_1 = require("../rarity");
var _1 = require(".");
var OneHandedAxeName;
(function (OneHandedAxeName) {
    OneHandedAxeName["RUSTYAXE"] = "Rusty Axe";
    OneHandedAxeName["HATCHET"] = "Hatchet";
    OneHandedAxeName["LUMBERWICKER"] = "Lumber Wicker";
})(OneHandedAxeName = exports.OneHandedAxeName || (exports.OneHandedAxeName = {}));
var oneHandedAxeFactory = function (oneHandedAxeName) {
    switch (oneHandedAxeName) {
        case OneHandedAxeName.RUSTYAXE:
            return rustyAxe();
        case OneHandedAxeName.HATCHET:
            return hatchet();
        case OneHandedAxeName.LUMBERWICKER:
            return lumberWicker();
        default:
            throw new Error("One handed axe: " + oneHandedAxeName + " was not found");
    }
};
exports.oneHandedAxeFactory = oneHandedAxeFactory;
var rustyAxe = function () { return ({
    name: OneHandedAxeName.RUSTYAXE,
    type: _1.WeaponType.ONEHANDEDAXE,
    rarity: rarity_1.ItemRarity.COMMON,
    damage: {
        low: 2,
        high: 4,
    },
}); };
var hatchet = function () { return ({
    name: OneHandedAxeName.HATCHET,
    type: _1.WeaponType.ONEHANDEDAXE,
    rarity: rarity_1.ItemRarity.COMMON,
    damage: {
        low: 3,
        high: 6,
    },
}); };
var lumberWicker = function () { return ({
    name: OneHandedAxeName.LUMBERWICKER,
    type: _1.WeaponType.ONEHANDEDAXE,
    rarity: rarity_1.ItemRarity.UNCOMMON,
    damage: {
        low: 6,
        high: 10,
    },
}); };
