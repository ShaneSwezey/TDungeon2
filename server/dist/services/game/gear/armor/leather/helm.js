"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leatherHelmFactory = exports.LeatherHelmName = void 0;
var rarity_1 = require("../../rarity");
var __1 = require("..");
var LeatherHelmName;
(function (LeatherHelmName) {
    LeatherHelmName["BUGINFESTEDLEATHERHELM"] = "Bug Infested Leather Helm";
    LeatherHelmName["LEATHERHEADBAND"] = "Leather Headband";
    LeatherHelmName["TRIBALWARHELM"] = "Tribal War Helm";
})(LeatherHelmName = exports.LeatherHelmName || (exports.LeatherHelmName = {}));
var leatherHelmFactory = function (leatherHelmName) {
    switch (leatherHelmName) {
        case LeatherHelmName.LEATHERHEADBAND:
            return leatherHeadBand();
        case LeatherHelmName.TRIBALWARHELM:
            return tribalWarHelm();
        default:
            return bugInfestedLeatherHelm();
    }
};
exports.leatherHelmFactory = leatherHelmFactory;
var bugInfestedLeatherHelm = function () { return ({
    name: LeatherHelmName.BUGINFESTEDLEATHERHELM,
    hitPoints: 0,
    type: __1.ArmorType.LEATHER,
    slot: __1.ArmorSlot.HELM,
    rarity: rarity_1.ItemRarity.LEGENDARY
}); };
var leatherHeadBand = function () { return ({
    name: LeatherHelmName.LEATHERHEADBAND,
    hitPoints: 4,
    type: __1.ArmorType.LEATHER,
    slot: __1.ArmorSlot.HELM,
    rarity: rarity_1.ItemRarity.LEGENDARY
}); };
var tribalWarHelm = function () { return ({
    name: LeatherHelmName.BUGINFESTEDLEATHERHELM,
    hitPoints: 5,
    attackPower: 5,
    type: __1.ArmorType.LEATHER,
    slot: __1.ArmorSlot.HELM,
    rarity: rarity_1.ItemRarity.RARE
}); };
