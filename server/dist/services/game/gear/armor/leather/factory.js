"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leatherFactory = void 0;
var __1 = require("..");
var chest_1 = require("./chest");
var gloves_1 = require("./gloves");
var pants_1 = require("./pants");
var helm_1 = require("./helm");
var leatherFactory = function (armorRecord) {
    switch (armorRecord.slot) {
        case __1.ArmorSlot.CHEST:
            return chest_1.leatherChestFactory(armorRecord.name);
        case __1.ArmorSlot.GLOVES:
            return gloves_1.leatherGloveFactory(armorRecord.name);
        case __1.ArmorSlot.HELM:
            return helm_1.leatherHelmFactory(armorRecord.name);
        case __1.ArmorSlot.PANTS:
            return pants_1.leatherPantsFactory(armorRecord.name);
        default:
            // placeholder
            return chest_1.leatherChestFactory(armorRecord.name);
    }
};
exports.leatherFactory = leatherFactory;
