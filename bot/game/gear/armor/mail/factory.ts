import { Armor, ArmorSlot } from "..";
import { ArmorRecord } from "../factory";
import { mailChestFactory } from "./chest";
import { mailGlovesFactory } from "./gloves";
import { mailHelmFactory } from "./helm";
import { mailPantsFactory } from "./pants";


export const mailFactory = (armorRecord: ArmorRecord): Armor => {
    switch(armorRecord.slot) {
        case ArmorSlot.CHEST:
            return mailChestFactory(armorRecord.name);
        case ArmorSlot.GLOVES:
            return mailGlovesFactory(armorRecord.name);
        case ArmorSlot.HELM:
            return mailHelmFactory(armorRecord.name);
        case ArmorSlot.PANTS:
            return mailPantsFactory(armorRecord.name);
        default:
            return mailChestFactory(armorRecord.name);
    }
}