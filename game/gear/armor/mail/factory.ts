import { ArmorSlot } from "../../../enums/armor";
import { CurrentAvailiableItemRarity } from "../../../enums/item";
import { IArmor, IArmorRecord } from "../../../interfaces/armor";
import { getRandomInt } from "../../../utils/math";
import { getRandomMailChest, mailChestFactory } from "./chest";
import { getRandomMailGloves, mailGlovesFactory } from "./gloves";
import { getRandomMailHelm, mailHelmFactory } from "./helm";
import { getRandomMailPants, mailPantsFactory } from "./pants";


export const mailFactory = (armorRecord: IArmorRecord): IArmor => {
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

export const getRandomMailArmor = (rarity: CurrentAvailiableItemRarity) => {
    const randInt = getRandomInt(1, 4);
    if (randInt === 1) {
        return getRandomMailChest(rarity);
    } else if (randInt === 2) {
        return getRandomMailGloves(rarity);
    } else if (randInt === 3) {
        return getRandomMailHelm(rarity);
    } else {
        return getRandomMailPants(rarity);
    }
}