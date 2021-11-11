"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailFactory = void 0;
var __1 = require("..");
var chest_1 = require("./chest");
var gloves_1 = require("./gloves");
var helm_1 = require("./helm");
var pants_1 = require("./pants");
var mailFactory = function (armorRecord) {
    switch (armorRecord.slot) {
        case __1.ArmorSlot.CHEST:
            return chest_1.mailChestFactory(armorRecord.name);
        case __1.ArmorSlot.GLOVES:
            return gloves_1.mailGlovesFactory(armorRecord.name);
        case __1.ArmorSlot.HELM:
            return helm_1.mailHelmFactory(armorRecord.name);
        case __1.ArmorSlot.PANTS:
            return pants_1.mailPantsFactory(armorRecord.name);
        default:
            return chest_1.mailChestFactory(armorRecord.name);
    }
};
exports.mailFactory = mailFactory;
