"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewHero = void 0;
var hero_1 = require("../hero");
var chest_1 = require("../gear/armor/leather/chest");
var clothChest_1 = require("../gear/armor/cloth/clothChest");
var knives_1 = require("../gear/weapon/knives");
var staffs_1 = require("../gear/weapon/staffs");
var stamina_1 = require("../stats/stamina");
var oneHandedSwords_1 = require("../gear/weapon/oneHandedSwords");
var createNewHero = function (name, heroType) {
    switch (heroType) {
        case hero_1.HeroType.Melee:
            return {
                name: name,
                type: hero_1.HeroType.Melee,
                stamina: stamina_1.getStartingStamina([chest_1.leatherChestFactory(chest_1.LeatherChestName.TATTEREDCHEST)]),
                gold: 0,
                armor: [chest_1.leatherChestFactory(chest_1.LeatherChestName.TATTEREDCHEST)],
                weapons: [oneHandedSwords_1.oneHandedSwordFactory(oneHandedSwords_1.OneHandedSwordName.RUSTYSWORD)],
            };
        case hero_1.HeroType.Ranged:
            return {
                name: name,
                type: hero_1.HeroType.Ranged,
                stamina: stamina_1.getStartingStamina([chest_1.leatherChestFactory(chest_1.LeatherChestName.TATTEREDCHEST)]),
                gold: 0,
                armor: [chest_1.leatherChestFactory(chest_1.LeatherChestName.TATTEREDCHEST)],
                weapons: [knives_1.knifeFactory(knives_1.KnifeName.BUTTERKNIFE)],
            };
        case hero_1.HeroType.Caster:
            return {
                name: name,
                type: hero_1.HeroType.Caster,
                stamina: stamina_1.getStartingStamina([clothChest_1.clothChestFactory(clothChest_1.ClothChestName.DUSTYROBES)]),
                gold: 0,
                armor: [clothChest_1.clothChestFactory(clothChest_1.ClothChestName.DUSTYROBES)],
                weapons: [staffs_1.staffFactory(staffs_1.StaffName.WALKINGSTICK)],
            };
        default:
            throw new Error("Hero type " + heroType + " does not exist!");
    }
};
exports.createNewHero = createNewHero;
