"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.poisonEffectFactory = exports.PoisonEffect = void 0;
const __1 = require("../..");
var PoisonEffect;
(function (PoisonEffect) {
    PoisonEffect["BLACKINK"] = "Black Ink";
})(PoisonEffect = exports.PoisonEffect || (exports.PoisonEffect = {}));
const blackInk = () => ({
    name: PoisonEffect.BLACKINK,
    description: "Dark as oil and sticky!",
    type: __1.EffectType.DEBUFF,
    appliedTo: __1.EffectAppliedTo.OPPONENT,
    rounds: 2,
});
const poisonEffectFactory = (poisonEffect) => {
    switch (poisonEffect) {
        case PoisonEffect.BLACKINK:
            return blackInk();
        default:
            throw new Error(`Poison Effect ${poisonEffect} was not found!`);
    }
};
exports.poisonEffectFactory = poisonEffectFactory;
