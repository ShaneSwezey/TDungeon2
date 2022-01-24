"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomCloth = exports.clothFactory = void 0;
const armor_1 = require("../../../enums/armor");
const clothChest_1 = require("./clothChest");
const clothFactory = (armorRecord) => {
    switch (armorRecord.slot) {
        case armor_1.ArmorSlot.CHEST:
            return (0, clothChest_1.clothChestFactory)(armorRecord.name);
        // case ArmorSlot.GLOVES:
        //     return;
        // case ArmorSlot.HELM:
        //     return;
        // case ArmorSlot.PANTS:
        //     return;
        default:
            return (0, clothChest_1.clothChestFactory)(armorRecord.name);
    }
};
exports.clothFactory = clothFactory;
const getRandomCloth = (category) => {
};
exports.getRandomCloth = getRandomCloth;
