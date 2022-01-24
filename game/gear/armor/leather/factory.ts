import { ArmorSlot } from "../../../enums/armor";
import { CurrentAvailiableItemRarity } from "../../../enums/item";
import { IArmorRecord } from "../../../interfaces/armor";
import { getRandomInt } from "../../../utils/math";
import { getRandomLeatherChest, leatherChestFactory } from "./chest";
import { getRandomLeatherGloves, leatherGloveFactory } from "./gloves";
import { getRandomLeatherHelm, leatherHelmFactory } from "./helm";
import { getRandomLeatherPants, leatherPantsFactory } from "./pants";


export const leatherFactory = (armorRecord: IArmorRecord) => {
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

export const getRandomLeatherArmor = (rarity: CurrentAvailiableItemRarity) => {
    const randInt = getRandomInt(1, 4);
    if (randInt === 1) {
        return getRandomLeatherChest(rarity);
    } else if (randInt === 2) {
        return getRandomLeatherGloves(rarity);
    } else if (randInt === 3) {
        return getRandomLeatherHelm(rarity);
    } else {
        return getRandomLeatherPants(rarity);
    }
}