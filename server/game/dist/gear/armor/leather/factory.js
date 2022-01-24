"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomLeatherArmor = exports.leatherFactory = void 0;
const armor_1 = require("../../../enums/armor");
const math_1 = require("../../../utils/math");
const chest_1 = require("./chest");
const gloves_1 = require("./gloves");
const helm_1 = require("./helm");
const pants_1 = require("./pants");
const leatherFactory = (armorRecord) => {
    switch (armorRecord.slot) {
        case armor_1.ArmorSlot.CHEST:
            return (0, chest_1.leatherChestFactory)(armorRecord.name);
        case armor_1.ArmorSlot.GLOVES:
            return (0, gloves_1.leatherGloveFactory)(armorRecord.name);
        case armor_1.ArmorSlot.HELM:
            return (0, helm_1.leatherHelmFactory)(armorRecord.name);
        case armor_1.ArmorSlot.PANTS:
            return (0, pants_1.leatherPantsFactory)(armorRecord.name);
        default:
            // placeholder
            return (0, chest_1.leatherChestFactory)(armorRecord.name);
    }
};
exports.leatherFactory = leatherFactory;
const getRandomLeatherArmor = (rarity) => {
    const randInt = (0, math_1.getRandomInt)(1, 4);
    if (randInt === 1) {
        return (0, chest_1.getRandomLeatherChest)(rarity);
    }
    else if (randInt === 2) {
        return (0, gloves_1.getRandomLeatherGloves)(rarity);
    }
    else if (randInt === 3) {
        return (0, helm_1.getRandomLeatherHelm)(rarity);
    }
    else {
        return (0, pants_1.getRandomLeatherPants)(rarity);
    }
};
exports.getRandomLeatherArmor = getRandomLeatherArmor;
