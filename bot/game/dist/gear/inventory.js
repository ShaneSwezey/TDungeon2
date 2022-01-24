"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDroppedItem = exports.inventoryFactory = void 0;
const item_1 = require("../enums/item");
const math_1 = require("../utils/math");
const factory_1 = require("./armor/factory");
const factory_2 = require("./weapon/factory");
const inventoryFactory = ({ weaponInventory, armorInventory }) => {
    let armor = [];
    let weapons = [];
    if (armorInventory.length)
        armor = (0, factory_1.armorFactory)(armorInventory);
    if (weaponInventory.length)
        weapons = (0, factory_2.weaponsFactory)(weaponInventory);
    return { armor, weapons };
};
exports.inventoryFactory = inventoryFactory;
const getDroppedItem = () => {
    const rarity = (0, math_1.probabilityDistributor)(Object.values(item_1.CurrentAvailiableItemRarity), [20, 10, 1]);
    const rand = (0, math_1.getRandomInt)(1, 2);
    const droppedItem = { armor: undefined, weapon: undefined };
    if (rand === 1) {
        // armor
        droppedItem.armor = (0, factory_1.getRandomArmor)(rarity);
    }
    else {
        // weapon   
        droppedItem.weapon = (0, factory_2.getRandomWeapon)(rarity);
    }
    return droppedItem;
};
exports.getDroppedItem = getDroppedItem;
