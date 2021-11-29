"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oneHandedAxeFactory = exports.OneHandedAxeName = void 0;
const rarity_1 = require("../rarity");
const _1 = require(".");
var OneHandedAxeName;
(function (OneHandedAxeName) {
    OneHandedAxeName["RUSTYAXE"] = "Rusty Axe";
    OneHandedAxeName["HATCHET"] = "Hatchet";
    OneHandedAxeName["LUMBERWICKER"] = "Lumber Wicker";
})(OneHandedAxeName = exports.OneHandedAxeName || (exports.OneHandedAxeName = {}));
const oneHandedAxeFactory = (oneHandedAxeName) => {
    switch (oneHandedAxeName) {
        case OneHandedAxeName.RUSTYAXE:
            return rustyAxe();
        case OneHandedAxeName.HATCHET:
            return hatchet();
        case OneHandedAxeName.LUMBERWICKER:
            return lumberWicker();
        default:
            throw new Error(`One handed axe: ${oneHandedAxeName} was not found`);
    }
};
exports.oneHandedAxeFactory = oneHandedAxeFactory;
const rustyAxe = () => ({
    name: OneHandedAxeName.RUSTYAXE,
    type: _1.WeaponType.ONEHANDEDAXE,
    rarity: rarity_1.ItemRarity.COMMON,
    damage: {
        low: 2,
        high: 4,
    },
    effects: [],
    critChance: 5,
    cleave: { chance: 0 },
    flurry: { chance: 0 },
});
const hatchet = () => ({
    name: OneHandedAxeName.HATCHET,
    type: _1.WeaponType.ONEHANDEDAXE,
    rarity: rarity_1.ItemRarity.COMMON,
    damage: {
        low: 3,
        high: 6,
    },
    effects: [],
    critChance: 7,
    cleave: { chance: 0 },
    flurry: { chance: 0 },
});
const lumberWicker = () => ({
    name: OneHandedAxeName.LUMBERWICKER,
    type: _1.WeaponType.ONEHANDEDAXE,
    rarity: rarity_1.ItemRarity.UNCOMMON,
    damage: {
        low: 6,
        high: 10,
    },
    effects: [],
    critChance: 10,
    cleave: { chance: 0 },
    flurry: { chance: 0 },
});
