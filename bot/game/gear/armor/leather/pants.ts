import { ItemRarity } from "../../rarity";
import { ArmorSlot, ArmorType } from "..";
import { Leather } from ".";


export interface LeatherPants extends Leather {
    name: LeatherPantsName;
    slot: ArmorSlot.PANTS;
}

export enum LeatherPantsName {
    BUGINFESTEDLEATHERPANTS = "Bug Infested Leather Pants",
    DANCERSCHAPS = "Dancers Chaps",
    DIRTYPANTS = "Dirty Pants",
    PATCHEDPANTS = "Patched Pants",
    MUSHROOMINFECTEDPANTS = "Mushroom Infected Pants"
}

export const leatherPantsFactory = (leatherPantsName: string) => {
    switch(leatherPantsName) {
        case LeatherPantsName.DIRTYPANTS:
            return dirtyPants();
        case LeatherPantsName.PATCHEDPANTS:
            return patchedPants();
        case LeatherPantsName.DANCERSCHAPS:
            return dancersChaps();
        case LeatherPantsName.MUSHROOMINFECTEDPANTS:
            return mushroomInfectedPants();
        default:
            return bugInfestedLeatherPants();
    }
}

const bugInfestedLeatherPants = (): LeatherPants => ({
    name: LeatherPantsName.BUGINFESTEDLEATHERPANTS,
    hitPoints: 0,
    type: ArmorType.LEATHER,
    slot: ArmorSlot.PANTS,
    rarity: ItemRarity.LEGENDARY
});

const dirtyPants = (): LeatherPants => ({
    name: LeatherPantsName.DIRTYPANTS,
    hitPoints: 4,
    type: ArmorType.LEATHER,
    slot: ArmorSlot.PANTS,
    rarity: ItemRarity.COMMON
});

const patchedPants = (): LeatherPants => ({
    name: LeatherPantsName.PATCHEDPANTS,
    hitPoints: 4,
    type: ArmorType.LEATHER,
    slot: ArmorSlot.PANTS,
    rarity: ItemRarity.COMMON
});

const dancersChaps = (): LeatherPants => ({
    name: LeatherPantsName.DANCERSCHAPS,
    hitPoints: 6,
    type: ArmorType.LEATHER,
    slot: ArmorSlot.PANTS,
    rarity: ItemRarity.UNCOMMON
});

const mushroomInfectedPants = (): LeatherPants => ({
    name: LeatherPantsName.BUGINFESTEDLEATHERPANTS,
    hitPoints: 6,
    attackPower: 4,
    type: ArmorType.LEATHER,
    slot: ArmorSlot.PANTS,
    rarity: ItemRarity.RARE
});

