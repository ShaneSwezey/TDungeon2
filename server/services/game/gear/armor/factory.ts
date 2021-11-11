import { ItemRarity } from "../rarity";
import { Armor, ArmorSlot, ArmorType } from ".";
import { clothFactory } from "./cloth/factory";
import { leatherFactory } from "./leather/factory";
import { mailFactory } from "./mail/factory";

export interface ArmorRecord {
    name: string;
    type: string;
    slot: string;
}

export const armorFactory = (armorRecords: ArmorRecord[]): Armor[] => armorRecords.map(armorRecord => armorSwitch(armorRecord));

const armorSwitch = (armorRecord: ArmorRecord) => {
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
            // placeholder till plate
            return { name: "Bug infested Wife Beater", hitPoints: 0, type: ArmorType.CLOTH, slot: ArmorSlot.CHEST, rarity: ItemRarity.LEGENDARY };
    }
}