import { ArmorSlot, ArmorType, LeatherChestName } from "../../../enums/armor";
import { CurrentAvailiableItemRarity, ItemRarity } from "../../../enums/item";
import { ILeatherChest } from "../../../interfaces/armor";
import { getRandomInt } from "../../../utils/math";


export const leatherChestFactory = (leatherChestName: string): ILeatherChest => {
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

export const getRandomLeatherChest = (rarity: CurrentAvailiableItemRarity) => {
    switch(rarity) {
        case CurrentAvailiableItemRarity.COMMON:
            return getRandomCommonLeatherChest();
        case CurrentAvailiableItemRarity.UNCOMMON:
            return getRandomUncommonLeatherChest();
        default:
            return getRandomCommonLeatherChest();
    }
}

const getRandomCommonLeatherChest = () => {
    const randInt = getRandomInt(1, 2);
    if (randInt === 1) {
        return tatteredChest();
    } else {
        return jerking();
    }
}

const getRandomUncommonLeatherChest = () => {
    return goblinSoliderLeatherJacket();
}

const bugInfestedLeatherChest = (): ILeatherChest => ({
    name: LeatherChestName.BUGINFESTEDLEAHTERCHEST,
    hitPoints: 0,
    type: ArmorType.LEATHER,
    slot: ArmorSlot.CHEST,
    rarity: ItemRarity.LEGENDARY,
    imgSrc: ""
});

const tatteredChest = (): ILeatherChest => ({
    name: LeatherChestName.TATTEREDCHEST,
    hitPoints: 4,
    type: ArmorType.LEATHER,
    slot: ArmorSlot.CHEST,
    rarity: ItemRarity.COMMON,
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/armor/leather/chest/fur-shirt-common.svg"
});

const jerking = (): ILeatherChest => ({
    name: LeatherChestName.JERKIN,
    hitPoints: 6,
    type: ArmorType.LEATHER,
    slot: ArmorSlot.CHEST,
    rarity: ItemRarity.COMMON,
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/armor/leather/chest/sleeveless-jacket-common.svg"
});

const goblinSoliderLeatherJacket = (): ILeatherChest  => ({
    name: LeatherChestName.GOBLINSOLDIERLEATHERJACKET,
    hitPoints: 8,
    type: ArmorType.LEATHER,
    slot: ArmorSlot.CHEST,
    rarity: ItemRarity.UNCOMMON,
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/armor/leather/chest/life-jacket-uncommon.svg"
});