import { ArmorSlot } from "..";
import { ArmorRecord } from "../factory";
import { leatherChestFactory } from "./chest";
import { leatherGloveFactory } from "./gloves";
import { leatherPantsFactory } from "./pants";
import { leatherHelmFactory } from "./helm"; 

export const leatherFactory = (armorRecord: ArmorRecord) => {
    switch(armorRecord.slot) {
        case ArmorSlot.CHEST:
            return leatherChestFactory(armorRecord.name);
        case ArmorSlot.GLOVES:
            return leatherGloveFactory(armorRecord.name);
        case ArmorSlot.HELM:
            return leatherHelmFactory(armorRecord.name);
        case ArmorSlot.PANTS:
            return leatherPantsFactory(armorRecord.name);
        default:
            // placeholder
            return leatherChestFactory(armorRecord.name);
    }
}