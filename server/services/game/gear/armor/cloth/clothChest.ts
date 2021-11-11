import { ItemRarity } from "../../rarity";
import { ArmorSlot, ArmorType } from "..";
import { Cloth } from '.';

export interface ClothChest extends Cloth {
    name: ClothChestName,
    slot: ArmorSlot.CHEST;
}   

export enum ClothChestName {
    DUSTYROBES = "Dusty Robes",
    DIRTYTUNIC = "Dirty Tunic",
    CLEANSHIRT = "Clean Shirt",
    BUGCLOTHCHEST = "Bug Infested Cloth Chest"
}

export const clothChestFactory = (clothChestName: string): ClothChest => {
    switch(clothChestName) {
        case ClothChestName.DUSTYROBES:
            return dustyRobes();
        case ClothChestName.DIRTYTUNIC:
            return dirtyTunic();
        case ClothChestName.CLEANSHIRT:
            return cleanShirt();
        default:
            return bugClothChest();
    }
}

const bugClothChest = (): ClothChest => ({
    name: ClothChestName.BUGCLOTHCHEST,
    hitPoints: 0,
    type: ArmorType.CLOTH,
    slot: ArmorSlot.CHEST,
    rarity: ItemRarity.LEGENDARY
})

const dustyRobes = (): ClothChest => ({
    name: ClothChestName.DUSTYROBES,
    hitPoints: 1,
    type: ArmorType.CLOTH,
    slot: ArmorSlot.CHEST,
    rarity: ItemRarity.COMMON
});

const dirtyTunic = (): ClothChest => ({
    name: ClothChestName.DIRTYTUNIC,
    hitPoints: 2,
    type: ArmorType.CLOTH,
    slot: ArmorSlot.CHEST,
    rarity: ItemRarity.COMMON
});

const cleanShirt = (): ClothChest => ({
    name: ClothChestName.CLEANSHIRT,
    hitPoints: 4,
    type: ArmorType.CLOTH,
    slot: ArmorSlot.CHEST,
    rarity: ItemRarity.COMMON
})