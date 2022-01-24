import { ArmorSlot, ArmorType, LeatherPantsName } from "../../../enums/armor";
import { CurrentAvailiableItemRarity, ItemRarity } from "../../../enums/item";
import { ILeatherPants } from "../../../interfaces/armor";
import { getRandomInt } from "../../../utils/math";


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

export const getRandomLeatherPants = (rarity: CurrentAvailiableItemRarity) => {
    switch(rarity) {
        case CurrentAvailiableItemRarity.COMMON:
            return getRandomCommonLeatherPants();
        case CurrentAvailiableItemRarity.UNCOMMON:
            return getRandomUncommonLeatherPants();
        case CurrentAvailiableItemRarity.RARE:
            return getRandomRareLeatherPants();
        default:
            return getRandomCommonLeatherPants();
    }
}

const getRandomCommonLeatherPants = () => {
    const randInt = getRandomInt(1, 2);
    if (randInt === 1) {
        return dirtyPants();
    } else {
        return patchedPants();
    }
}

const getRandomUncommonLeatherPants = () => {
    return dancersChaps();
}

const getRandomRareLeatherPants = () => {
    return mushroomInfectedPants();
}

const bugInfestedLeatherPants = (): ILeatherPants => ({
    name: LeatherPantsName.BUGINFESTEDLEATHERPANTS,
    hitPoints: 0,
    type: ArmorType.LEATHER,
    slot: ArmorSlot.PANTS,
    rarity: ItemRarity.LEGENDARY,
    imgSrc: ""
});

const dirtyPants = (): ILeatherPants => ({
    name: LeatherPantsName.DIRTYPANTS,
    hitPoints: 2,
    type: ArmorType.LEATHER,
    slot: ArmorSlot.PANTS,
    rarity: ItemRarity.COMMON,
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/armor/leather/pants/trousers-common.svg"
});

const patchedPants = (): ILeatherPants => ({
    name: LeatherPantsName.PATCHEDPANTS,
    hitPoints: 3,
    type: ArmorType.LEATHER,
    slot: ArmorSlot.PANTS,
    rarity: ItemRarity.COMMON,
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/armor/leather/pants/shorts-common.svg"
});

const dancersChaps = (): ILeatherPants => ({
    name: LeatherPantsName.DANCERSCHAPS,
    hitPoints: 4,
    type: ArmorType.LEATHER,
    slot: ArmorSlot.PANTS,
    rarity: ItemRarity.UNCOMMON,
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/armor/leather/pants/underwear-uncommon.svg"
});

const mushroomInfectedPants = (): ILeatherPants => ({
    name: LeatherPantsName.MUSHROOMINFECTEDPANTS,
    hitPoints: 6,
    attackPower: 3,
    type: ArmorType.LEATHER,
    slot: ArmorSlot.PANTS,
    rarity: ItemRarity.RARE,
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/armor/leather/pants/mushrooms-rare.svg"
});

