"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doubleHandedAxeFactory = exports.DoubleHandedAxeName = void 0;
const _1 = require(".");
const rarity_1 = require("../rarity");
var DoubleHandedAxeName;
(function (DoubleHandedAxeName) {
    DoubleHandedAxeName["BARRACKAXE"] = "Barrack Axe";
    DoubleHandedAxeName["LUMBERAXE"] = "Lumber Axe";
    DoubleHandedAxeName["MOGROKSLOSTAXE"] = "Mogrok's Lost Axe";
})(DoubleHandedAxeName = exports.DoubleHandedAxeName || (exports.DoubleHandedAxeName = {}));
const doubleHandedAxeFactory = (doubleHandedAxeName) => {
    switch (doubleHandedAxeName) {
        case DoubleHandedAxeName.LUMBERAXE:
            return lumberAxe();
        case DoubleHandedAxeName.BARRACKAXE:
            return barrackAxe();
        case DoubleHandedAxeName.MOGROKSLOSTAXE:
            return mogroksLostAxe();
        default:
            throw new Error(`One handed sword: ${doubleHandedAxeName} was not found!`);
    }
};
exports.doubleHandedAxeFactory = doubleHandedAxeFactory;
const lumberAxe = () => ({
    name: DoubleHandedAxeName.LUMBERAXE,
    type: _1.WeaponType.DOUBLEHANDEDAXE,
    rarity: rarity_1.ItemRarity.COMMON,
    damage: {
        low: 5,
        high: 8
    },
    effects: [],
    critChance: 5,
    cleave: { chance: 0 },
    flurry: { chance: 0 },
});
const barrackAxe = () => ({
    name: DoubleHandedAxeName.BARRACKAXE,
    type: _1.WeaponType.DOUBLEHANDEDAXE,
    rarity: rarity_1.ItemRarity.UNCOMMON,
    damage: {
        low: 7,
        high: 12,
    },
    effects: [],
    critChance: 7,
    cleave: { chance: 0 },
    flurry: { chance: 0 },
});
const mogroksLostAxe = () => ({
    name: DoubleHandedAxeName.MOGROKSLOSTAXE,
    type: _1.WeaponType.DOUBLEHANDEDAXE,
    rarity: rarity_1.ItemRarity.RARE,
    damage: {
        low: 12,
        high: 19,
    },
    effects: [],
    critChance: 10,
    cleave: { chance: 15, num: { low: 2, high: 3 } },
    flurry: { chance: 0 },
});
