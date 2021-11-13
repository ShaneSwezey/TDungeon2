"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.heroFactory = void 0;
var hero_1 = require("../hero");
var chest_1 = require("../gear/armor/leather/chest");
var clothChest_1 = require("../gear/armor/cloth/clothChest");
var knives_1 = require("../gear/weapon/knives");
var staffs_1 = require("../gear/weapon/staffs");
var stamina_1 = require("../stats/stamina");
var oneHandedSwords_1 = require("../gear/weapon/oneHandedSwords");
var math_1 = require("../utils/math");
var factory_1 = require("../gear/armor/factory");
var factory_2 = require("../gear/weapon/factory");
var heroFactory = function (_a) {
    var type = _a.type, id = _a.id, name = _a.name, currentHitPoints = _a.currentHitPoints, armor = _a.armor, weapons = _a.weapons;
    switch (type) {
        case hero_1.HeroType.Melee:
            var meleeArmor = armor ? factory_1.armorFactory(armor.split(",")) : [chest_1.leatherChestFactory(chest_1.LeatherChestName.TATTEREDCHEST)];
            return {
                id: id ? id : math_1.getUuid(),
                name: name,
                type: hero_1.HeroType.Melee,
                stamina: stamina_1.getStamina(meleeArmor, currentHitPoints),
                gold: 0,
                weapons: weapons ? factory_2.weaponsFactory(weapons.split(",")) : [oneHandedSwords_1.oneHandedSwordFactory(oneHandedSwords_1.OneHandedSwordName.RUSTYSWORD)],
                armor: meleeArmor,
            };
        case hero_1.HeroType.Ranged:
            var rangedArmor = armor ? factory_1.armorFactory(armor.split(",")) : [chest_1.leatherChestFactory(chest_1.LeatherChestName.TATTEREDCHEST)];
            return {
                id: id ? id : math_1.getUuid(),
                name: name,
                type: hero_1.HeroType.Ranged,
                stamina: stamina_1.getStamina(rangedArmor, currentHitPoints),
                gold: 0,
                weapons: weapons ? factory_2.weaponsFactory(weapons.split(",")) : [knives_1.knifeFactory(knives_1.KnifeName.BUTTERKNIFE)],
                armor: rangedArmor
            };
        case hero_1.HeroType.Caster:
            var casterArmor = armor ? factory_1.armorFactory(armor.split(",")) : [clothChest_1.clothChestFactory(clothChest_1.ClothChestName.DUSTYROBES)];
            return {
                id: id ? id : math_1.getUuid(),
                name: name,
                type: hero_1.HeroType.Caster,
                stamina: stamina_1.getStamina(casterArmor, currentHitPoints),
                gold: 0,
                weapons: weapons ? factory_2.weaponsFactory(weapons.split(",")) : [staffs_1.staffFactory(staffs_1.StaffName.WALKINGSTICK)],
                armor: casterArmor
            };
        default:
            throw new Error("Hero type: " + type + " does not exist!");
    }
};
exports.heroFactory = heroFactory;
