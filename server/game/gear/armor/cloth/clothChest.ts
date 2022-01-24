import { ArmorSlot, ArmorType, ClothChestName } from "../../../enums/armor";
import { ItemRarity } from "../../../enums/item";
import { IClothChest } from "../../../interfaces/armor";

export const clothChestFactory = (clothChestName: string): IClothChest => {
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

const bugClothChest = (): IClothChest => ({
    name: ClothChestName.BUGCLOTHCHEST,
    hitPoints: 0,
    type: ArmorType.CLOTH,
    slot: ArmorSlot.CHEST,
    rarity: ItemRarity.LEGENDARY,
    imgSrc: ""
})

const dustyRobes = (): IClothChest => ({
    name: ClothChestName.DUSTYROBES,
    hitPoints: 3,
    type: ArmorType.CLOTH,
    slot: ArmorSlot.CHEST,
    rarity: ItemRarity.COMMON,
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/armor/cloth/chest/cloak-common.svg"
});

const dirtyTunic = (): IClothChest => ({
    name: ClothChestName.DIRTYTUNIC,
    hitPoints: 4,
    type: ArmorType.CLOTH,
    slot: ArmorSlot.CHEST,
    rarity: ItemRarity.COMMON,
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/armor/cloth/chest/fur-shirt-common.svg"
});

const cleanShirt = (): IClothChest => ({
    name: ClothChestName.CLEANSHIRT,
    hitPoints: 5,
    type: ArmorType.CLOTH,
    slot: ArmorSlot.CHEST,
    rarity: ItemRarity.COMMON,
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/armor/cloth/chest/t-shirt-common.svg"
})