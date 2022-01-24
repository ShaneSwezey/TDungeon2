import { ArmorSlot, ArmorType, LeatherGlovesName } from "../../../enums/armor";
import { CurrentAvailiableItemRarity, ItemRarity } from "../../../enums/item";
import { ILeatherGloves } from "../../../interfaces/armor";
import { getRandomInt } from "../../../utils/math";

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

export const getRandomLeatherGloves = (rarity: CurrentAvailiableItemRarity) => {
    switch(rarity) {
        case CurrentAvailiableItemRarity.COMMON:
            return getRandomCommonLeatherGloves();
        case CurrentAvailiableItemRarity.UNCOMMON:
            return getRandomUncommonLeatherGloves();
        case CurrentAvailiableItemRarity.RARE:
            return getRandomRareLeatherGloves();
        default:
            return getRandomCommonLeatherGloves();
    }
}

const getRandomCommonLeatherGloves = () => {
    const randInt = getRandomInt(1, 2);
    if (randInt === 1) {
        return shreddedGloves();
    } else {
        return dustyGloves();
    }
}

const getRandomUncommonLeatherGloves = () => {
    return dwarfMingingGloves();
}

const getRandomRareLeatherGloves = () => {
    return thiefGloves();
}

const bugInfestedLeatherGloves = (): ILeatherGloves => ({
    name: LeatherGlovesName.BUGINFESTEDLEATHERGLOVES,
    hitPoints: 0,
    type: ArmorType.LEATHER,
    slot: ArmorSlot.GLOVES,
    rarity: ItemRarity.LEGENDARY,
    imgSrc: ""
});

const shreddedGloves = (): ILeatherGloves => ({
    name: LeatherGlovesName.SHREDDEDGLOVES,
    hitPoints: 3,
    type: ArmorType.LEATHER,
    slot: ArmorSlot.GLOVES,
    rarity: ItemRarity.COMMON,
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/armor/leather/gloves/hand-bandage-common.svg"
});

const dustyGloves = (): ILeatherGloves => ({
    name: LeatherGlovesName.DUSTYGLOVES,
    hitPoints: 3,
    type: ArmorType.LEATHER,
    slot: ArmorSlot.GLOVES,
    rarity: ItemRarity.COMMON,
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/armor/leather/gloves/gloves-common.svg"
});

const dwarfMingingGloves = (): ILeatherGloves => ({
    name: LeatherGlovesName.DWARFMININGGLOVES,
    hitPoints: 5,
    type: ArmorType.LEATHER,
    slot: ArmorSlot.GLOVES,
    rarity: ItemRarity.UNCOMMON,
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/armor/leather/gloves/fist-uncommon.svg"
});

const thiefGloves = (): ILeatherGloves => ({
    name: LeatherGlovesName.THIEFGLOVES,
    hitPoints: 7,
    attackPower: 2,  
    type: ArmorType.LEATHER,
    slot: ArmorSlot.GLOVES,
    rarity: ItemRarity.RARE,
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/armor/leather/gloves/gloves-rare.svg"
});