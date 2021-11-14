"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailFactory = void 0;
const __1 = require("..");
const chest_1 = require("./chest");
const gloves_1 = require("./gloves");
const helm_1 = require("./helm");
const pants_1 = require("./pants");
const mailFactory = (armorRecord) => {
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
