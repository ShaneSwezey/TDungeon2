import { ArmorSlot, ArmorType, LeatherHelmName } from "../../../enums/armor";
import { CurrentAvailiableItemRarity, ItemRarity } from "../../../enums/item";
import { ILeatherHelm } from "../../../interfaces/armor";
import { getRandomInt } from "../../../utils/math";

export const leatherHelmFactory = (leatherHelmName: string) => {
    switch(leatherHelmName) {
        case LeatherHelmName.LEATHERHEADBAND:
            return leatherHeadBand();
        case LeatherHelmName.TRIBALWARHELM:
            return tribalWarHelm();
        default:
            return bugInfestedLeatherHelm();
    }
}

export const getRandomLeatherHelm = (rarity: CurrentAvailiableItemRarity) => {
    switch(rarity) {
        case CurrentAvailiableItemRarity.COMMON:
            return getRandomCommonLeatherHelm();
        case CurrentAvailiableItemRarity.UNCOMMON:
            return getRandomCommonLeatherHelm(); // placeholder
        case CurrentAvailiableItemRarity.RARE:
            return getRandomCommonLeatherHelm(); // placeholder
        default:
            return getRandomCommonLeatherHelm(); // placeholder
    }
}

export const getRandomCommonLeatherHelm = () => {
    const randInt = getRandomInt(1, 2);
    if (randInt === 1) {
        return leatherHeadBand();
    } else {
        return tribalWarHelm();
    }
}

const bugInfestedLeatherHelm = (): ILeatherHelm => ({
    name: LeatherHelmName.BUGINFESTEDLEATHERHELM,
    hitPoints: 0,
    type: ArmorType.LEATHER,
    slot: ArmorSlot.HELM,
    rarity: ItemRarity.LEGENDARY,
    imgSrc: ""
});

const leatherHeadBand = (): ILeatherHelm => ({
    name: LeatherHelmName.LEATHERHEADBAND,
    hitPoints: 4,
    type: ArmorType.LEATHER,
    slot: ArmorSlot.HELM,
    rarity: ItemRarity.COMMON,
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/armor/leather/helm/headband-knot-common.svg"
})

const tribalWarHelm = (): ILeatherHelm => ({
    name: LeatherHelmName.TRIBALWARHELM,
    hitPoints: 5,
    type: ArmorType.LEATHER,
    slot: ArmorSlot.HELM,
    rarity: ItemRarity.COMMON,
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/armor/leather/helm/tribal-mask-common.svg"
})