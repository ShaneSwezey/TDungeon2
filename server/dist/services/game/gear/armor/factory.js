"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.armorFactory = void 0;
const rarity_1 = require("../rarity");
const _1 = require(".");
const factory_1 = require("./cloth/factory");
const factory_2 = require("./leather/factory");
const factory_3 = require("./mail/factory");
const armorFactory = (armorStrings) => armorStrings.map(armorString => armorSwitch(armorString));
exports.armorFactory = armorFactory;
const armorSwitch = (armorString) => {
    const parsedString = armorString.split(":");
    const armorRecord = {
        name: parsedString[0],
        type: parsedString[1],
        slot: parsedString[2]
    };
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
