"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.knifeFactory = exports.KnifeName = void 0;
const rarity_1 = require("../rarity");
const _1 = require(".");
const poison_1 = require("../../effects/debuff/damage/poison");
var KnifeName;
(function (KnifeName) {
    KnifeName["BUTTERKNIFE"] = "Butter Knife";
    KnifeName["KRISBLADE"] = "Kris Blade";
    KnifeName["LETTEROPENER"] = "Letter Opener";
    KnifeName["THIEFBLADE"] = "Thief Blade";
    KnifeName["SHANK"] = "Shank";
})(KnifeName = exports.KnifeName || (exports.KnifeName = {}));
const knifeFactory = (knifeName) => {
    switch (knifeName) {
        case KnifeName.BUTTERKNIFE:
            return butterKnife();
        case KnifeName.KRISBLADE:
            return krisBlade();
        case KnifeName.LETTEROPENER:
            return letterOpener();
        case KnifeName.THIEFBLADE:
            return thiefBlade();
        case KnifeName.SHANK:
            return shank();
        default:
            throw new Error(`Knife: ${knifeName} was not found!`);
    }
};
exports.knifeFactory = knifeFactory;
const butterKnife = () => ({
    name: KnifeName.BUTTERKNIFE,
    type: _1.WeaponType.KNIFE,
    rarity: rarity_1.ItemRarity.COMMON,
    damage: {
        low: 1,
        high: 3
    },
    effects: [],
    critChance: 5,
    cleave: { chance: 0 },
    flurry: { chance: 0 },
});
const krisBlade = () => ({
    name: KnifeName.KRISBLADE,
    type: _1.WeaponType.KNIFE,
    rarity: rarity_1.ItemRarity.COMMON,
    damage: {
        low: 2,
        high: 4
    },
    effects: [],
    critChance: 6,
    cleave: { chance: 0 },
    flurry: { chance: 0 },
});
const letterOpener = () => ({
    name: KnifeName.LETTEROPENER,
    type: _1.WeaponType.KNIFE,
    rarity: rarity_1.ItemRarity.UNCOMMON,
    damage: {
        low: 3,
        high: 7
    },
    critChance: 10,
    cleave: { chance: 0 },
    flurry: { chance: 0 },
    effects: [poison_1.poisonEffectFactory(poison_1.PoisonEffect.BLACKINK)]
});
const thiefBlade = () => ({
    name: KnifeName.THIEFBLADE,
    type: _1.WeaponType.KNIFE,
    rarity: rarity_1.ItemRarity.UNCOMMON,
    damage: {
        high: 8,
        low: 6,
    },
    critChance: 5,
    cleave: { chance: 0 },
    flurry: { chance: 10, num: { high: 2, low: 2 } },
    effects: []
});
const shank = () => ({
    name: KnifeName.SHANK,
    type: _1.WeaponType.KNIFE,
    rarity: rarity_1.ItemRarity.RARE,
    damage: {
        high: 10,
        low: 7,
    },
    critChance: 10,
    cleave: { chance: 0 },
    flurry: { chance: 25, num: { high: 3, low: 2 } },
    effects: []
});
