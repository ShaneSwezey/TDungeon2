import { CurrentAvailiableItemRarity } from "../enums/item";
import { getDroppedItem } from "../gear/inventory";
import { probabilityDistributor } from "../utils/math"; 

const weights = [20, 10, 1];

const category = probabilityDistributor(Object.values(CurrentAvailiableItemRarity), weights);
const droppedItem = getDroppedItem();
    
console.dir(droppedItem, { depth: undefined });
