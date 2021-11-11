import { ItemRarity } from "../rarity";
import { Weapon, WeaponType } from ".";

export interface Staff extends Weapon {
    type: WeaponType.STAFF
}

export enum StaffName {
    WALKINGSTICK = "Walking Stick",
}

export const staffFactory = (staffName: string): Staff => {
    switch(staffName) {
        case StaffName.WALKINGSTICK:
            return walkingStick();
        default:
            throw new Error(`Staff: ${staffName} was not found!`);
    }
}

const walkingStick = (): Staff => ({
    name: StaffName.WALKINGSTICK,
    type: WeaponType.STAFF,
    rarity: ItemRarity.COMMON,
    damage: {
        low: 2,
        high: 3,
    },
    effects: []
});