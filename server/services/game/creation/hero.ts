import { Hero, HeroType } from "../hero";
import { leatherChestFactory, LeatherChestName } from '../gear/armor/leather/chest';
import { clothChestFactory, ClothChestName } from '../gear/armor/cloth/clothChest';
import { knifeFactory, KnifeName } from '../gear/weapon/knives';
import { staffFactory, StaffName } from '../gear/weapon/staffs';
import { getStartingStamina } from "../stats/stamina";
import { oneHandedSwordFactory, OneHandedSwordName } from "../gear/weapon/oneHandedSwords";

export const createNewHero = (name: string, heroType: HeroType): Hero => {
    switch(heroType) {
        case HeroType.Melee:
            return {
                name,
                type: HeroType.Melee,
                stamina: getStartingStamina([leatherChestFactory(LeatherChestName.TATTEREDCHEST)]), 
                gold: 0,
                armor: [leatherChestFactory(LeatherChestName.TATTEREDCHEST)],
                weapons: [oneHandedSwordFactory(OneHandedSwordName.RUSTYSWORD)],
            };
        case HeroType.Ranged:
            return {
                name,
                type: HeroType.Ranged,
                stamina: getStartingStamina([leatherChestFactory(LeatherChestName.TATTEREDCHEST)]), 
                gold: 0,
                armor: [leatherChestFactory(LeatherChestName.TATTEREDCHEST)],
                weapons: [knifeFactory(KnifeName.BUTTERKNIFE)],
            };
        case HeroType.Caster:
            return {
                name,
                type: HeroType.Caster,
                stamina: getStartingStamina([clothChestFactory(ClothChestName.DUSTYROBES)]),
                gold: 0,
                armor: [clothChestFactory(ClothChestName.DUSTYROBES)],
                weapons: [staffFactory(StaffName.WALKINGSTICK)],
            };
        default:
            throw new Error(`Hero type ${heroType} does not exist!`); 
    }
}