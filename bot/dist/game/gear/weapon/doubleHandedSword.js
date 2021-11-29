"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doubleHandedSwordFactory = exports.DoubleHandedSwordName = void 0;
const _1 = require(".");
const rarity_1 = require("../rarity");
var DoubleHandedSwordName;
(function (DoubleHandedSwordName) {
    DoubleHandedSwordName["TRAININGSWORD"] = "Training Sword";
    DoubleHandedSwordName["SCUFFEDBLADE"] = "Scuffed Blade";
    DoubleHandedSwordName["OLDCLAYMORE"] = "Old Claymore";
    DoubleHandedSwordName["LIONHEART"] = "Lion Heart";
})(DoubleHandedSwordName = exports.DoubleHandedSwordName || (exports.DoubleHandedSwordName = {}));
const doubleHandedSwordFactory = (doubleHandedSwordName) => {
    switch (doubleHandedSwordName) {
        case DoubleHandedSwordName.TRAININGSWORD:
            return trainingSword();
        case DoubleHandedSwordName.SCUFFEDBLADE:
            return scuffedBlade();
        case DoubleHandedSwordName.LIONHEART:
            return lionHeart();
        default:
            throw new Error(`Double handed sword: ${doubleHandedSwordName} was not found!`);
    }
};
exports.doubleHandedSwordFactory = doubleHandedSwordFactory;
const trainingSword = () => ({
    name: DoubleHandedSwordName.TRAININGSWORD,
    type: _1.WeaponType.DOUBLEHANDEDSWORD,
    rarity: rarity_1.ItemRarity.COMMON,
    damage: {
        low: 4,
        high: 7
    },
    effects: [],
    critChance: 5,
    cleave: { chance: 0 },
    flurry: { chance: 0 },
});
const scuffedBlade = () => ({
    name: DoubleHandedSwordName.TRAININGSWORD,
    type: _1.WeaponType.DOUBLEHANDEDSWORD,
    rarity: rarity_1.ItemRarity.COMMON,
    damage: {
        low: 5,
        high: 9
    },
    effects: [],
    critChance: 7,
    cleave: { chance: 0 },
    flurry: { chance: 0 },
});
const oldClaymore = () => ({
    name: DoubleHandedSwordName.TRAININGSWORD,
    type: _1.WeaponType.DOUBLEHANDEDSWORD,
    rarity: rarity_1.ItemRarity.UNCOMMON,
    damage: {
        low: 7,
        high: 11
    },
    effects: [],
    critChance: 7,
    cleave: { chance: 10, num: { low: 2, high: 2 } },
    flurry: { chance: 0 },
});
const lionHeart = () => ({
    name: DoubleHandedSwordName.LIONHEART,
    type: _1.WeaponType.DOUBLEHANDEDSWORD,
    rarity: rarity_1.ItemRarity.RARE,
    damage: {
        low: 10,
        high: 16
    },
    effects: [],
    critChance: 6,
    cleave: { chance: 0 },
    flurry: { chance: 15, num: { low: 2, high: 3 } },
});
