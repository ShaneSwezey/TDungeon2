import { ArmorSlot, ArmorType } from "../../enums/armor";
import { CurrentAvailiableItemRarity, ItemRarity } from "../../enums/item";
import { IArmor, IArmorRecord } from "../../interfaces/armor";
import { getRandomInt } from "../../utils/math";
import { clothFactory } from "./cloth/factory";
import { getRandomLeatherArmor, leatherFactory } from "./leather/factory";
import { getRandomMailArmor, mailFactory } from "./mail/factory";


export const armorFactory = (armorRecords: IArmorRecord[]): IArmor[] => 
    armorRecords.map(armorRecord => armorSwitch(armorRecord)
    );

const armorSwitch = (armorRecord: IArmorRecord) => {
    switch(armorRecord.type) {
        case ArmorType.CLOTH:
            return clothFactory(armorRecord);
        case ArmorType.LEATHER:
            return leatherFactory(armorRecord);
        case ArmorType.MAIL:
            return mailFactory(armorRecord);
        // case ArmorType.PLATE:
        //     return;
        default:
            // placeholder
            return { name: "Bug infested Wife Beater", hitPoints: 0, type: ArmorType.CLOTH, slot: ArmorSlot.CHEST, rarity: ItemRarity.LEGENDARY, imgSrc: "" };
    }
}

export const getRandomArmor = (rarity: CurrentAvailiableItemRarity): IArmor => {
    const rand = getRandomInt(1, 2);
    if (rand === 1) {
        // leather
        return getRandomLeatherArmor(rarity);
    } else {
        // mail 
        return getRandomMailArmor(rarity);
    }
}