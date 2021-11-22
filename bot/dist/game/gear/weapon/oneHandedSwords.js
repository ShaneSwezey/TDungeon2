"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oneHandedSwordFactory = exports.OneHandedSwordName = void 0;
const rarity_1 = require("../rarity");
const _1 = require(".");
var OneHandedSwordName;
(function (OneHandedSwordName) {
    OneHandedSwordName["RUSTYSWORD"] = "Rusty Sword";
})(OneHandedSwordName = exports.OneHandedSwordName || (exports.OneHandedSwordName = {}));
const oneHandedSwordFactory = (oneHandedSwordName) => {
    switch (oneHandedSwordName) {
        case OneHandedSwordName.RUSTYSWORD:
            return rustySword();
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
    critChance: 10,
    cleave: { chance: 0 },
    flurry: { chance: 0 },
});
