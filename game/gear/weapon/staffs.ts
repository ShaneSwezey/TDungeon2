import { CurrentAvailiableItemRarity, ItemRarity } from "../../enums/item";
import { StaffName, WeaponType } from "../../enums/weapon";
import { IStaff } from "../../interfaces/weapon";

export const staffFactory = (staffName: string): IStaff => {
    switch(staffName) {
        case StaffName.WALKINGSTICK:
            return walkingStick();
        default:
            throw new Error(`Staff: ${staffName} was not found!`);
    }
}

export const getRandomStaff = (rarity: CurrentAvailiableItemRarity) => walkingStick();

const walkingStick = (): IStaff => ({
    name: StaffName.WALKINGSTICK,
    type: WeaponType.STAFF,
    rarity: ItemRarity.COMMON,
    damage: {
        low: 2,
        high: 3,
    },
    crit: {
        chance: 4,
        multiplier: 1.2
    },
    imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/weapons/staff/wood-stick-common.svg"
});