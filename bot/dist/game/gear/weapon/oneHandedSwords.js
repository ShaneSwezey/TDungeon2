"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oneHandedSwordFactory = exports.OneHandedSwordName = void 0;
const rarity_1 = require("../rarity");
const _1 = require(".");
var OneHandedSwordName;
(function (OneHandedSwordName) {
    OneHandedSwordName["RUSTYSWORD"] = "Rusty Sword";
    OneHandedSwordName["SABRE"] = "Sabre";
    OneHandedSwordName["COPPERBLADE"] = "Copper Blade";
    OneHandedSwordName["KNIGHTSSIDE"] = "Knight's Side";
})(OneHandedSwordName = exports.OneHandedSwordName || (exports.OneHandedSwordName = {}));
const oneHandedSwordFactory = (oneHandedSwordName) => {
    switch (oneHandedSwordName) {
        case OneHandedSwordName.RUSTYSWORD:
            return rustySword();
        case OneHandedSwordName.SABRE:
            return sabre();
        case OneHandedSwordName.KNIGHTSSIDE:
            return knightsSide();
        case OneHandedSwordName.COPPERBLADE:
            return copperBlade();
        default:
            throw new Error(`One handed sword: ${oneHandedSwordName} was not found!`);
    }
};
exports.oneHandedSwordFactory = oneHandedSwordFactory;
const rustySword = () => ({
    name: OneHandedSwordName.RUSTYSWORD,
    type: _1.WeaponType.ONEHANDEDSWORD,
    rarity: rarity_1.ItemRarity.COMMON,
    damage: {
        low: 3,
        high: 5
    },
    effects: [],
    critChance: 5,
    cleave: { chance: 0 },
    flurry: { chance: 0 },
});
const sabre = () => ({
    name: OneHandedSwordName.SABRE,
    type: _1.WeaponType.ONEHANDEDSWORD,
    rarity: rarity_1.ItemRarity.COMMON,
    damage: {
        low: 4,
        high: 6,
    },
    effects: [],
    critChance: 6,
    cleave: { chance: 0 },
    flurry: { chance: 0 },
});
const copperBlade = () => ({
    name: OneHandedSwordName.COPPERBLADE,
    type: _1.WeaponType.ONEHANDEDSWORD,
    rarity: rarity_1.ItemRarity.UNCOMMON,
    critChance: 8,
    damage: {
        low: 7,
        high: 11,
    },
    cleave: { chance: 0 },
    flurry: { chance: 0 },
    effects: []
});
const knightsSide = () => ({
    name: OneHandedSwordName.KNIGHTSSIDE,
    type: _1.WeaponType.ONEHANDEDSWORD,
    rarity: rarity_1.ItemRarity.RARE,
    damage: {
        low: 9,
        high: 15
    },
    effects: [],
    critChance: 15,
    cleave: { chance: 0 },
    flurry: { chance: 15, num: { high: 3, low: 2 } }
});
