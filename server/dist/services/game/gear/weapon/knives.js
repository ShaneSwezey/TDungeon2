"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.knifeFactory = exports.KnifeName = void 0;
var rarity_1 = require("../rarity");
var _1 = require(".");
var poison_1 = require("../../effects/debuff/damage/poison");
var KnifeName;
(function (KnifeName) {
    KnifeName["BUTTERKNIFE"] = "Butter Knife";
    KnifeName["KRISBLADE"] = "Kris Blade";
    KnifeName["LETTEROPENER"] = "Letter Opener";
})(KnifeName = exports.KnifeName || (exports.KnifeName = {}));
var knifeFactory = function (knifeName) {
    switch (knifeName) {
        case KnifeName.BUTTERKNIFE:
            return butterKnife();
        case KnifeName.KRISBLADE:
            return krisBlade();
        case KnifeName.LETTEROPENER:
            return letterOpener();
        default:
            throw new Error("Knife: " + knifeName + " was not found!");
    }
};
exports.knifeFactory = knifeFactory;
var butterKnife = function () { return ({
    name: KnifeName.BUTTERKNIFE,
    type: _1.WeaponType.KNIFE,
    rarity: rarity_1.ItemRarity.COMMON,
    damage: {
        low: 1,
        high: 3
    },
    effects: []
}); };
var krisBlade = function () { return ({
    name: KnifeName.KRISBLADE,
    type: _1.WeaponType.KNIFE,
    rarity: rarity_1.ItemRarity.COMMON,
    damage: {
        low: 2,
        high: 4
    },
    effects: []
}); };
var letterOpener = function () { return ({
    name: KnifeName.LETTEROPENER,
    type: _1.WeaponType.KNIFE,
    rarity: rarity_1.ItemRarity.UNCOMMON,
    damage: {
        low: 5,
        high: 8
    },
    effects: [poison_1.poisonEffectFactory(poison_1.PoisonEffect.BLACKINK)]
}); };
