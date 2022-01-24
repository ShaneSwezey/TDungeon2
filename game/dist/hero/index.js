"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newHeroFactory = exports.heroFactory = void 0;
const chest_1 = require("../gear/armor/leather/chest");
const knives_1 = require("../gear/weapon/knives");
const stamina_1 = require("../stats/stamina");
const oneHandedSwords_1 = require("../gear/weapon/oneHandedSwords");
const factory_1 = require("../gear/armor/factory");
const factory_2 = require("../gear/weapon/factory");
const chest_2 = require("../gear/armor/mail/chest");
const weapon_1 = require("../enums/weapon");
const armor_1 = require("../enums/armor");
const math_1 = require("../utils/math");
const hero_1 = require("../enums/hero");
const bow_1 = require("../gear/weapon/bow");
const heroFactory = ({ type, id, name, hitPoints, armor, weapons }) => {
    switch (type) {
        case hero_1.HeroType.WARRIOR:
            const warriorArmor = armor ? (0, factory_1.armorFactory)(armor) : [(0, chest_2.mailChestFactory)(armor_1.MailChestName.RUSTYCHAINCHEST)];
            const warriorWeapons = weapons ? (0, factory_2.weaponsFactory)(weapons) : [(0, oneHandedSwords_1.oneHandedSwordFactory)(weapon_1.OneHandedSwordName.RUSTYSWORD)];
            return {
                id,
                name,
                type: hero_1.HeroType.WARRIOR,
                stamina: (0, stamina_1.getStamina)(warriorArmor, hitPoints),
                crit: (0, math_1.calcCrit)(warriorArmor),
                dodge: (0, math_1.calcDodge)(warriorArmor) + 5,
                block: 0,
                attackPower: (0, math_1.calcAttackPower)(warriorWeapons, warriorArmor),
                weapons: warriorWeapons,
                armor: warriorArmor,
            };
        case hero_1.HeroType.ROGUE:
            const rogueArmor = armor ? (0, factory_1.armorFactory)(armor) : [(0, chest_1.leatherChestFactory)(armor_1.LeatherChestName.TATTEREDCHEST)];
            const rogueWeapons = weapons ? (0, factory_2.weaponsFactory)(weapons) : [(0, knives_1.knifeFactory)(weapon_1.KnifeName.BUTTERKNIFE)];
            return {
                id,
                name,
                type: hero_1.HeroType.ROGUE,
                stamina: (0, stamina_1.getStamina)(rogueArmor, hitPoints),
                crit: (0, math_1.calcCrit)(rogueArmor),
                dodge: (0, math_1.calcDodge)(rogueArmor) + 10,
                block: 0,
                attackPower: (0, math_1.calcAttackPower)(rogueWeapons, rogueArmor),
                weapons: rogueWeapons,
                armor: rogueArmor
            };
        case hero_1.HeroType.RANGER:
            const rangerArmor = armor ? (0, factory_1.armorFactory)(armor) : [(0, chest_1.leatherChestFactory)(armor_1.LeatherChestName.TATTEREDCHEST)];
            const rangerWeapons = weapons ? (0, factory_2.weaponsFactory)(weapons) : [(0, bow_1.bowFactory)(weapon_1.BowName.TWIGBOW)];
            return {
                id,
                name,
                type: hero_1.HeroType.RANGER,
                stamina: (0, stamina_1.getStamina)(rangerArmor, undefined),
                crit: (0, math_1.calcCrit)(rangerArmor),
                dodge: (0, math_1.calcDodge)(rangerArmor) + 7,
                block: 0,
                attackPower: (0, math_1.calcAttackPower)(rangerWeapons, rangerArmor),
                weapons: rangerWeapons,
                armor: rangerArmor
            };
        default:
            throw new Error(`Hero type: ${type} does not exist!`);
    }
};
exports.heroFactory = heroFactory;
const newHeroFactory = ({ type, name }) => {
    switch (type) {
        case hero_1.HeroType.WARRIOR:
            const warriorArmor = [(0, chest_2.mailChestFactory)(armor_1.MailChestName.RUSTYCHAINCHEST)];
            const warriorWeapons = [(0, oneHandedSwords_1.oneHandedSwordFactory)(weapon_1.OneHandedSwordName.RUSTYSWORD)];
            return {
                id: undefined,
                name,
                type: hero_1.HeroType.WARRIOR,
                stamina: (0, stamina_1.getStamina)(warriorArmor, undefined),
                crit: (0, math_1.calcCrit)(warriorArmor),
                dodge: (0, math_1.calcDodge)(warriorArmor) + 5,
                block: 0,
                attackPower: (0, math_1.calcAttackPower)(warriorWeapons, warriorArmor),
                weapons: warriorWeapons,
                armor: warriorArmor,
            };
        case hero_1.HeroType.ROGUE:
            const rogueArmor = [(0, chest_1.leatherChestFactory)(armor_1.LeatherChestName.TATTEREDCHEST)];
            const rogueWeapons = [(0, knives_1.knifeFactory)(weapon_1.KnifeName.BUTTERKNIFE)];
            return {
                id: undefined,
                name,
                type: hero_1.HeroType.ROGUE,
                stamina: (0, stamina_1.getStamina)(rogueArmor, undefined),
                crit: (0, math_1.calcCrit)(rogueArmor),
                dodge: (0, math_1.calcDodge)(rogueArmor) + 10,
                block: 0,
                attackPower: (0, math_1.calcAttackPower)(rogueWeapons, rogueArmor),
                weapons: rogueWeapons,
                armor: rogueArmor
            };
        case hero_1.HeroType.RANGER:
            const rangerArmor = [(0, chest_1.leatherChestFactory)(armor_1.LeatherChestName.TATTEREDCHEST)];
            const rangerWeapons = [(0, bow_1.bowFactory)(weapon_1.BowName.TWIGBOW)];
            return {
                id: undefined,
                name,
                type: hero_1.HeroType.RANGER,
                stamina: (0, stamina_1.getStamina)(rangerArmor, undefined),
                crit: (0, math_1.calcCrit)(rangerArmor),
                dodge: (0, math_1.calcDodge)(rangerArmor) + 7,
                block: 0,
                attackPower: (0, math_1.calcAttackPower)(rangerWeapons, rangerArmor),
                weapons: rangerWeapons,
                armor: rangerArmor
            };
        default:
            throw new Error(`Hero type: ${type} does not exist!`);
    }
};
exports.newHeroFactory = newHeroFactory;
