import { leatherChestFactory } from '../gear/armor/leather/chest';
import { knifeFactory } from '../gear/weapon/knives';
import { getStamina } from "../stats/stamina";
import { oneHandedSwordFactory } from "../gear/weapon/oneHandedSwords";
import { armorFactory } from '../gear/armor/factory';
import { weaponsFactory } from "../gear/weapon/factory";
import { mailChestFactory } from "../gear/armor/mail/chest";
import { IHero, IHeroDBStats, newHeroArgs } from '../interfaces/hero';
import { BowName, KnifeName, OneHandedSwordName } from '../enums/weapon';
import { LeatherChestName, MailChestName } from '../enums/armor';
import { calcAttackPower, calcCrit, calcDodge } from '../utils/math';
import { HeroType } from '../enums/hero';
import { bowFactory } from '../gear/weapon/bow';

export const heroFactory = ({ type, id, name, hitPoints, armor, weapons }: IHeroDBStats): IHero => {
    switch(type) {
        case HeroType.WARRIOR:
            const warriorArmor = armor ? armorFactory(armor) : [mailChestFactory(MailChestName.RUSTYCHAINCHEST)];
            const warriorWeapons = weapons ? weaponsFactory(weapons) : [oneHandedSwordFactory(OneHandedSwordName.RUSTYSWORD)]
            return {
                id,
                name,
                type: HeroType.WARRIOR,
                stamina: getStamina(warriorArmor, hitPoints),
                crit: calcCrit(warriorArmor),
                dodge: calcDodge(warriorArmor) + 5,
                block: 0,
                attackPower: calcAttackPower(warriorWeapons, warriorArmor),
                weapons: warriorWeapons,
                armor: warriorArmor,
            };
        case HeroType.ROGUE:
            const rogueArmor = armor ? armorFactory(armor) : [leatherChestFactory(LeatherChestName.TATTEREDCHEST)];
            const rogueWeapons = weapons ? weaponsFactory(weapons) : [knifeFactory(KnifeName.BUTTERKNIFE)]
            return {
                id,
                name,
                type: HeroType.ROGUE,
                stamina: getStamina(rogueArmor, hitPoints),
                crit: calcCrit(rogueArmor),
                dodge: calcDodge(rogueArmor) + 10,
                block: 0,
                attackPower: calcAttackPower(rogueWeapons, rogueArmor),
                weapons: rogueWeapons,
                armor: rogueArmor
            };
        case HeroType.RANGER:
            const rangerArmor = armor ? armorFactory(armor) : [leatherChestFactory(LeatherChestName.TATTEREDCHEST)];
            const rangerWeapons = weapons ? weaponsFactory(weapons) : [bowFactory(BowName.TWIGBOW)];
            return {
                id,
                name,
                type: HeroType.RANGER,
                stamina: getStamina(rangerArmor, undefined),
                crit: calcCrit(rangerArmor),
                dodge: calcDodge(rangerArmor) + 7,
                block: 0,
                attackPower: calcAttackPower(rangerWeapons, rangerArmor),
                weapons: rangerWeapons,
                armor: rangerArmor
            };
        default:
            throw new Error(`Hero type: ${type} does not exist!`); 
    }
}

export const newHeroFactory = ({ type, name }: newHeroArgs): IHero => {
    switch(type) {
        case HeroType.WARRIOR:
            const warriorArmor = [mailChestFactory(MailChestName.RUSTYCHAINCHEST)];
            const warriorWeapons = [oneHandedSwordFactory(OneHandedSwordName.RUSTYSWORD)]
            return {
                id: undefined,
                name,
                type: HeroType.WARRIOR,
                stamina: getStamina(warriorArmor, undefined),
                crit: calcCrit(warriorArmor),
                dodge: calcDodge(warriorArmor) + 5,
                block: 0,
                attackPower: calcAttackPower(warriorWeapons, warriorArmor),
                weapons: warriorWeapons,
                armor: warriorArmor,
            };
        case HeroType.ROGUE:
            const rogueArmor = [leatherChestFactory(LeatherChestName.TATTEREDCHEST)];
            const rogueWeapons = [knifeFactory(KnifeName.BUTTERKNIFE)]
            return {
                id: undefined,
                name,
                type: HeroType.ROGUE,
                stamina: getStamina(rogueArmor, undefined),
                crit: calcCrit(rogueArmor),
                dodge: calcDodge(rogueArmor) + 10,
                block: 0,
                attackPower: calcAttackPower(rogueWeapons, rogueArmor),
                weapons: rogueWeapons,
                armor: rogueArmor
            };
        case HeroType.RANGER:
            const rangerArmor = [leatherChestFactory(LeatherChestName.TATTEREDCHEST)];
            const rangerWeapons = [bowFactory(BowName.TWIGBOW)];
            return {
                id: undefined,
                name,
                type: HeroType.RANGER,
                stamina: getStamina(rangerArmor, undefined),
                crit: calcCrit(rangerArmor),
                dodge: calcDodge(rangerArmor) + 7,
                block: 0,
                attackPower: calcAttackPower(rangerWeapons, rangerArmor),
                weapons: rangerWeapons,
                armor: rangerArmor
            };
        default:
            throw new Error(`Hero type: ${type} does not exist!`); 
    }
}