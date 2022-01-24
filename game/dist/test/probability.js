"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const item_1 = require("../enums/item");
const inventory_1 = require("../gear/inventory");
const math_1 = require("../utils/math");
const weights = [20, 10, 1];
const category = (0, math_1.probabilityDistributor)(Object.values(item_1.CurrentAvailiableItemRarity), weights);
const droppedItem = (0, inventory_1.getDroppedItem)();
console.dir(droppedItem, { depth: undefined });
