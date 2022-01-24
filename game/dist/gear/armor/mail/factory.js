"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomMailArmor = exports.mailFactory = void 0;
const armor_1 = require("../../../enums/armor");
const math_1 = require("../../../utils/math");
const chest_1 = require("./chest");
const gloves_1 = require("./gloves");
const helm_1 = require("./helm");
const pants_1 = require("./pants");
const mailFactory = (armorRecord) => {
    switch (armorRecord.slot) {
        case armor_1.ArmorSlot.CHEST:
            return (0, chest_1.mailChestFactory)(armorRecord.name);
        case armor_1.ArmorSlot.GLOVES:
            return (0, gloves_1.mailGlovesFactory)(armorRecord.name);
        case armor_1.ArmorSlot.HELM:
            return (0, helm_1.mailHelmFactory)(armorRecord.name);
        case armor_1.ArmorSlot.PANTS:
            return (0, pants_1.mailPantsFactory)(armorRecord.name);
        default:
            return (0, chest_1.mailChestFactory)(armorRecord.name);
    }
};
exports.mailFactory = mailFactory;
const getRandomMailArmor = (rarity) => {
    const randInt = (0, math_1.getRandomInt)(1, 4);
    if (randInt === 1) {
        return (0, chest_1.getRandomMailChest)(rarity);
    }
    else if (randInt === 2) {
        return (0, gloves_1.getRandomMailGloves)(rarity);
    }
    else if (randInt === 3) {
        return (0, helm_1.getRandomMailHelm)(rarity);
    }
    else {
        return (0, pants_1.getRandomMailPants)(rarity);
    }
};
exports.getRandomMailArmor = getRandomMailArmor;
