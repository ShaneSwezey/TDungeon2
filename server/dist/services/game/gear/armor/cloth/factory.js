"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clothFactory = void 0;
var __1 = require("..");
var clothChest_1 = require("./clothChest");
var clothFactory = function (armorRecord) {
    switch (armorRecord.slot) {
        case __1.ArmorSlot.CHEST:
            return clothChest_1.clothChestFactory(armorRecord.name);
        // case ArmorSlot.GLOVES:
        //     return;
        // case ArmorSlot.HELM:
        //     return;
        // case ArmorSlot.PANTS:
        //     return;
        default:
            return clothChest_1.clothChestFactory(armorRecord.name);
    }
};
exports.clothFactory = clothFactory;
