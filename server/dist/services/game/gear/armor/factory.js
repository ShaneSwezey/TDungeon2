"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.armorFactory = void 0;
var rarity_1 = require("../rarity");
var _1 = require(".");
var factory_1 = require("./cloth/factory");
var factory_2 = require("./leather/factory");
var factory_3 = require("./mail/factory");
var armorFactory = function (armorRecords) { return armorRecords.map(function (armorRecord) { return armorSwitch(armorRecord); }); };
exports.armorFactory = armorFactory;
var armorSwitch = function (armorRecord) {
    switch (armorRecord.type) {
        case _1.ArmorType.CLOTH:
            return factory_1.clothFactory(armorRecord);
        case _1.ArmorType.LEATHER:
            return factory_2.leatherFactory(armorRecord);
        case _1.ArmorType.MAIL:
            return factory_3.mailFactory(armorRecord);
        // case ArmorType.PLATE:
        //     return;
        default:
            // placeholder till plate
            return { name: "Bug infested Wife Beater", hitPoints: 0, type: _1.ArmorType.CLOTH, slot: _1.ArmorSlot.CHEST, rarity: rarity_1.ItemRarity.LEGENDARY };
    }
};
