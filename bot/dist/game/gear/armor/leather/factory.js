"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leatherFactory = void 0;
const __1 = require("..");
const chest_1 = require("./chest");
const gloves_1 = require("./gloves");
const pants_1 = require("./pants");
const helm_1 = require("./helm");
const leatherFactory = (armorRecord) => {
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
