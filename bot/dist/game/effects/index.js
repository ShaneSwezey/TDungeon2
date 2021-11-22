"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebuffType = exports.SubBuffType = exports.BuffType = exports.EffectType = exports.EffectAppliedTo = void 0;
var EffectAppliedTo;
(function (EffectAppliedTo) {
    EffectAppliedTo["HERO"] = "Hero";
    EffectAppliedTo["MONSTER"] = "Monster";
    EffectAppliedTo["OPPONENT"] = "Opponent";
})(EffectAppliedTo = exports.EffectAppliedTo || (exports.EffectAppliedTo = {}));
var EffectType;
(function (EffectType) {
    EffectType["BUFF"] = "Buff";
    EffectType["DEBUFF"] = "Debuff";
})(EffectType = exports.EffectType || (exports.EffectType = {}));
var BuffType;
(function (BuffType) {
    BuffType["STAT"] = "STAT";
    BuffType["HEAL"] = "HEAL";
    BuffType["DAMAGE"] = "DAMAGE";
})(BuffType = exports.BuffType || (exports.BuffType = {}));
var SubBuffType;
(function (SubBuffType) {
    SubBuffType["MULTIWEAPONATTACK"] = "Multiple Weapon Attack";
})(SubBuffType = exports.SubBuffType || (exports.SubBuffType = {}));
var DebuffType;
(function (DebuffType) {
    DebuffType["DAMAGE"] = "DAMAGE";
    DebuffType["STAT"] = "STAT";
})(DebuffType = exports.DebuffType || (exports.DebuffType = {}));
