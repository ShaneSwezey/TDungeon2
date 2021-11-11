import { ItemRarity } from '../../rarity';
import { ArmorSlot, ArmorType } from '..';
import { Leather } from '.';

export interface LeatherHelm extends Leather {
    name: LeatherHelmName;
    slot: ArmorSlot.HELM;
}

export enum LeatherHelmName {
    BUGINFESTEDLEATHERHELM = "Bug Infested Leather Helm",
    LEATHERHEADBAND = "Leather Headband",
    TRIBALWARHELM = "Tribal War Helm",
}

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

const bugInfestedLeatherHelm = (): LeatherHelm => ({
    name: LeatherHelmName.BUGINFESTEDLEATHERHELM,
    hitPoints: 0,
    type: ArmorType.LEATHER,
    slot: ArmorSlot.HELM,
    rarity: ItemRarity.LEGENDARY
});

const leatherHeadBand = (): LeatherHelm => ({
    name: LeatherHelmName.LEATHERHEADBAND,
    hitPoints: 4,
    type: ArmorType.LEATHER,
    slot: ArmorSlot.HELM,
    rarity: ItemRarity.LEGENDARY
})

const tribalWarHelm = (): LeatherHelm => ({
    name: LeatherHelmName.BUGINFESTEDLEATHERHELM,
    hitPoints: 5,
    attackPower: 5,
    type: ArmorType.LEATHER,
    slot: ArmorSlot.HELM,
    rarity: ItemRarity.RARE
})