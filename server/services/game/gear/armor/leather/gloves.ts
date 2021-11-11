import { ItemRarity } from "../../rarity";
import { ArmorSlot, ArmorType } from "..";
import { Leather } from ".";

export interface LeatherGloves extends Leather {
    name: LeatherGlovesName;
    slot: ArmorSlot.GLOVES;
}

export enum LeatherGlovesName {
    BUGINFESTEDLEATHERGLOVES = "Bug Infested Leather Gloves",
    SHREDDEDGLOVES = "Shredded Gloves",
    DUSTYGLOVES = "Dusty Gloves",
    DWARFMININGGLOVES = "Dwarf Mining Gloves",
    THIEFGLOVES = "Theif Gloves",
}

export const leatherGloveFactory = (leatherGloveName: string) => {
    switch(leatherGloveName) {
        case LeatherGlovesName.DUSTYGLOVES:
            return dustyGloves();
        case LeatherGlovesName.DWARFMININGGLOVES:
            return dwarfMingingGloves();
        case LeatherGlovesName.SHREDDEDGLOVES:
            return shreddedGloves();
        case LeatherGlovesName.THIEFGLOVES:
            return thiefGloves();
        default:
            return bugInfestedLeatherGloves();
    }
}

const bugInfestedLeatherGloves = (): LeatherGloves => ({
    name: LeatherGlovesName.BUGINFESTEDLEATHERGLOVES,
    hitPoints: 0,
    type: ArmorType.LEATHER,
    slot: ArmorSlot.GLOVES,
    rarity: ItemRarity.LEGENDARY
});

const shreddedGloves = (): LeatherGloves => ({
    name: LeatherGlovesName.SHREDDEDGLOVES,
    hitPoints: 3,
    type: ArmorType.LEATHER,
    slot: ArmorSlot.GLOVES,
    rarity: ItemRarity.COMMON
});

const dustyGloves = (): LeatherGloves => ({
    name: LeatherGlovesName.DUSTYGLOVES,
    hitPoints: 3,
    type: ArmorType.LEATHER,
    slot: ArmorSlot.GLOVES,
    rarity: ItemRarity.COMMON
});

const dwarfMingingGloves = (): LeatherGloves => ({
    name: LeatherGlovesName.DWARFMININGGLOVES,
    hitPoints: 5,
    type: ArmorType.LEATHER,
    slot: ArmorSlot.GLOVES,
    rarity: ItemRarity.UNCOMMON
});

const thiefGloves = (): LeatherGloves => ({
    name: LeatherGlovesName.THIEFGLOVES,
    hitPoints: 7,
    attackPower: 5,  
    type: ArmorType.LEATHER,
    slot: ArmorSlot.GLOVES,
    rarity: ItemRarity.RARE
});