"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.heroFactory = void 0;
const hero_1 = require("../hero/");
const chest_1 = require("../gear/armor/leather/chest");
const clothChest_1 = require("../gear/armor/cloth/clothChest");
const knives_1 = require("../gear/weapon/knives");
const staffs_1 = require("../gear/weapon/staffs");
const stamina_1 = require("../stats/stamina");
const oneHandedSwords_1 = require("../gear/weapon/oneHandedSwords");
const math_1 = require("../utils/math");
const factory_1 = require("../gear/armor/factory");
const factory_2 = require("../gear/weapon/factory");
const heroFactory = ({ type, id, name, currentHitPoints, armor, weapons }) => {
    switch (type) {
        case hero_1.HeroType.Melee:
            const meleeArmor = armor ? factory_1.armorFactory(armor.split(",")) : [chest_1.leatherChestFactory(chest_1.LeatherChestName.TATTEREDCHEST)];
            return new hero_1.Hero({
                id: id ? id : math_1.getUuid(),
                name,
                type: hero_1.HeroType.Melee,
                stamina: stamina_1.getStamina(meleeArmor, currentHitPoints),
                gold: 0,
                weapons: weapons ? factory_2.weaponsFactory(weapons.split(",")) : [oneHandedSwords_1.oneHandedSwordFactory(oneHandedSwords_1.OneHandedSwordName.RUSTYSWORD)],
                armor: meleeArmor,
            });
        case hero_1.HeroType.Ranged:
            const rangedArmor = armor ? factory_1.armorFactory(armor.split(",")) : [chest_1.leatherChestFactory(chest_1.LeatherChestName.TATTEREDCHEST)];
            return new hero_1.Hero({
                id: id ? id : math_1.getUuid(),
                name,
                type: hero_1.HeroType.Ranged,
                stamina: stamina_1.getStamina(rangedArmor, currentHitPoints),
                gold: 0,
                weapons: weapons ? factory_2.weaponsFactory(weapons.split(",")) : [knives_1.knifeFactory(knives_1.KnifeName.BUTTERKNIFE)],
                armor: rangedArmor
            });
        case hero_1.HeroType.Caster:
            const casterArmor = armor ? factory_1.armorFactory(armor.split(",")) : [clothChest_1.clothChestFactory(clothChest_1.ClothChestName.DUSTYROBES)];
            return new hero_1.Hero({
                id: id ? id : math_1.getUuid(),
                name,
                type: hero_1.HeroType.Caster,
                stamina: stamina_1.getStamina(casterArmor, currentHitPoints),
                gold: 0,
                weapons: weapons ? factory_2.weaponsFactory(weapons.split(",")) : [staffs_1.staffFactory(staffs_1.StaffName.WALKINGSTICK)],
                armor: casterArmor
            });
        default:
            throw new Error(`Hero type: ${type} does not exist!`);
    }
};
exports.heroFactory = heroFactory;
// interface ArmorMongoRecord {
//     name: string;
//     type: ArmorType;
//     slot: ArmorSlot;
// }
// interface WeaponMongoRecord {
//     name: string;
//     type: WeaponType;
// }
// interface HeroModel {
//     _id: ObjectId;
//     name: string;
//     type: HeroType;
//     armor: ArmorMongoRecord[];
//     weapons: WeaponMongoRecord[];
//     createdAt: string;
//     updatedAt: string;
// }
// export const heroMongoFactory = ({ type, id, name, currentHitPoints, armor, weapons }: RedisHeroStats): IHero => {
//     switch(type) {
//         case HeroType.Melee:
//             const meleeArmor = armor ? armorFactory(armor.split(",")) : [leatherChestFactory(LeatherChestName.TATTEREDCHEST)]
//             return new Hero({
//                 id: id ? id : getUuid(),
//                 name,
//                 type: HeroType.Melee,
//                 stamina: getStamina(meleeArmor, currentHitPoints),
//                 gold: 0,
//                 weapons: weapons ? weaponsFactory(weapons.split(",")) : [oneHandedSwordFactory(OneHandedSwordName.RUSTYSWORD)],
//                 armor: meleeArmor,
//             });
//         case HeroType.Ranged:
//             const rangedArmor = armor ? armorFactory(armor.split(",")) : [leatherChestFactory(LeatherChestName.TATTEREDCHEST)]
//             return new Hero({
//                 id: id ? id :getUuid(),
//                 name,
//                 type: HeroType.Ranged,
//                 stamina: getStamina(rangedArmor, currentHitPoints), 
//                 gold: 0,
//                 weapons: weapons ? weaponsFactory(weapons.split(",")) : [knifeFactory(KnifeName.BUTTERKNIFE)],
//                 armor: rangedArmor
//             });
//         case HeroType.Caster:
//             const casterArmor = armor ? armorFactory(armor.split(",")) : [clothChestFactory(ClothChestName.DUSTYROBES)];
//             return new Hero({
//                 id: id ? id : getUuid(),
//                 name,
//                 type: HeroType.Caster,
//                 stamina: getStamina(casterArmor, currentHitPoints),
//                 gold: 0,
//                 weapons: weapons ? weaponsFactory(weapons.split(",")) : [staffFactory(StaffName.WALKINGSTICK)],
//                 armor: casterArmor
//             });
//         default:
//             throw new Error(`Hero type: ${type} does not exist!`); 
//     }
// }
