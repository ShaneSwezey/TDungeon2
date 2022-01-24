"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomArmor = exports.armorFactory = void 0;
const armor_1 = require("../../enums/armor");
const item_1 = require("../../enums/item");
const math_1 = require("../../utils/math");
const factory_1 = require("./cloth/factory");
const factory_2 = require("./leather/factory");
const factory_3 = require("./mail/factory");
const armorFactory = (armorRecords) => armorRecords.map(armorRecord => armorSwitch(armorRecord));
exports.armorFactory = armorFactory;
const armorSwitch = (armorRecord) => {
    switch (armorRecord.type) {
        case armor_1.ArmorType.CLOTH:
            return (0, factory_1.clothFactory)(armorRecord);
        case armor_1.ArmorType.LEATHER:
            return (0, factory_2.leatherFactory)(armorRecord);
        case armor_1.ArmorType.MAIL:
            return (0, factory_3.mailFactory)(armorRecord);
        // case ArmorType.PLATE:
        //     return;
        default:
            // placeholder
            return { name: "Bug infested Wife Beater", hitPoints: 0, type: armor_1.ArmorType.CLOTH, slot: armor_1.ArmorSlot.CHEST, rarity: item_1.ItemRarity.LEGENDARY, imgSrc: "" };
    }
};
const getRandomArmor = (rarity) => {
    const rand = (0, math_1.getRandomInt)(1, 2);
    if (rand === 1) {
        // leather
        return (0, factory_2.getRandomLeatherArmor)(rarity);
    }
    else {
        // mail 
        return (0, factory_3.getRandomMailArmor)(rarity);
    }
};
exports.getRandomArmor = getRandomArmor;
