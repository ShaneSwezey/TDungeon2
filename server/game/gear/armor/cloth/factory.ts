import { ArmorSlot } from "../../../enums/armor";
import { IArmorRecord } from "../../../interfaces/armor";
import { clothChestFactory } from "./clothChest";


export const clothFactory = (armorRecord: IArmorRecord) => {
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

export const getRandomCloth = (category: string) => {
    
}