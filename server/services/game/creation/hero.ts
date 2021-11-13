import { Hero, HeroType } from "../hero";
import { leatherChestFactory, LeatherChestName } from '../gear/armor/leather/chest';
import { clothChestFactory, ClothChestName } from '../gear/armor/cloth/clothChest';
import { knifeFactory, KnifeName } from '../gear/weapon/knives';
import { staffFactory, StaffName } from '../gear/weapon/staffs';
import { getStamina } from "../stats/stamina";
import { oneHandedSwordFactory, OneHandedSwordName } from "../gear/weapon/oneHandedSwords";
import { getUuid } from "../utils/math";
import { armorFactory } from '../gear/armor/factory';
import { weaponsFactory } from "../gear/weapon/factory";

export interface HeroStats {
    type: string;
    name: string;
    id?: string;
    currentHitPoints?: string;
    armor?: string;
    weapons?: string;
}


export const heroFactory = ({ type, id, name, currentHitPoints, armor, weapons }: HeroStats): Hero => {
    switch(type) {
        case HeroType.Melee:
            const meleeArmor = armor ? armorFactory(armor.split(",")) : [leatherChestFactory(LeatherChestName.TATTEREDCHEST)]
            return {
                id: id ? id : getUuid(),
                name,
                type: HeroType.Melee,
                stamina: getStamina(meleeArmor, currentHitPoints),
                gold: 0,
                weapons: weapons ? weaponsFactory(weapons.split(",")) : [oneHandedSwordFactory(OneHandedSwordName.RUSTYSWORD)],
                armor: meleeArmor,
            };
        case HeroType.Ranged:
            const rangedArmor = armor ? armorFactory(armor.split(",")) : [leatherChestFactory(LeatherChestName.TATTEREDCHEST)]
            return {
                id: id ? id :getUuid(),
                name,
                type: HeroType.Ranged,
                stamina: getStamina(rangedArmor, currentHitPoints), 
                gold: 0,
                weapons: weapons ? weaponsFactory(weapons.split(",")) : [knifeFactory(KnifeName.BUTTERKNIFE)],
                armor: rangedArmor
            };
        case HeroType.Caster:
            const casterArmor = armor ? armorFactory(armor.split(",")) : [clothChestFactory(ClothChestName.DUSTYROBES)];
            return {
                id: id ? id : getUuid(),
                name,
                type: HeroType.Caster,
                stamina: getStamina(casterArmor, currentHitPoints),
                gold: 0,
                weapons: weapons ? weaponsFactory(weapons.split(",")) : [staffFactory(StaffName.WALKINGSTICK)],
                armor: casterArmor
            };
        default:
            throw new Error(`Hero type: ${type} does not exist!`); 
    }
}