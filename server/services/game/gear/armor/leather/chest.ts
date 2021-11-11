import { ItemRarity } from "../../rarity";
import { ArmorSlot, ArmorType } from "..";
import { Leather } from '.';

export interface LeatherChest extends Leather {
    name: LeatherChestName;
    slot: ArmorSlot.CHEST;
}

export enum LeatherChestName {
    BUGINFESTEDLEAHTERCHEST = "Bug Infested Leather Chest", 
    TATTEREDCHEST = 'Tattered Chest',
    JERKIN = "Jerkin",
    GOBLINSOLDIERLEATHERJACKET = "Goblin Soldier's Leather Jacket",
}

export const leatherChestFactory = (leatherChestName: string): LeatherChest => {
    switch(leatherChestName) {
        case LeatherChestName.TATTEREDCHEST:
            return tatteredChest();
        case LeatherChestName.JERKIN:
            return jerking();
        case LeatherChestName.GOBLINSOLDIERLEATHERJACKET:
            return goblinSoliderLeatherJacket();
        default:
            return bugInfestedLeatherChest();
    }
}

const bugInfestedLeatherChest = (): LeatherChest => ({
    name: LeatherChestName.BUGINFESTEDLEAHTERCHEST,
    hitPoints: 0,
    type: ArmorType.LEATHER,
    slot: ArmorSlot.CHEST,
    rarity: ItemRarity.LEGENDARY
});

const tatteredChest = (): LeatherChest => ({
    name: LeatherChestName.TATTEREDCHEST,
    hitPoints: 2,
    type: ArmorType.LEATHER,
    slot: ArmorSlot.CHEST,
    rarity: ItemRarity.COMMON
});

const jerking = (): LeatherChest => ({
    name: LeatherChestName.JERKIN,
    hitPoints: 4,
    type: ArmorType.LEATHER,
    slot: ArmorSlot.CHEST,
    rarity: ItemRarity.COMMON
});

const goblinSoliderLeatherJacket = (): LeatherChest  => ({
    name: LeatherChestName.GOBLINSOLDIERLEATHERJACKET,
    hitPoints: 8,
    type: ArmorType.LEATHER,
    slot: ArmorSlot.CHEST,
    rarity: ItemRarity.UNCOMMON
});