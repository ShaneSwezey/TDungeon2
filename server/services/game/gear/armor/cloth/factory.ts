import { ArmorSlot } from "..";
import { ArmorRecord } from "../factory";
import { clothChestFactory } from "./clothChest";

export const clothFactory = (armorRecord: ArmorRecord) => {
    switch(armorRecord.slot) {
        case ArmorSlot.CHEST:
            return clothChestFactory(armorRecord.name);
        // case ArmorSlot.GLOVES:
        //     return;
        // case ArmorSlot.HELM:
        //     return;
        // case ArmorSlot.PANTS:
        //     return;
        default:
            return clothChestFactory(armorRecord.name);
    }
}