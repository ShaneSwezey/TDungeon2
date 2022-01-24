"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeThiefAttack = exports.thief = void 0;
const event_1 = require("../enums/event");
const item_1 = require("../enums/item");
const monster_1 = require("../enums/monster");
const weapon_1 = require("../enums/weapon");
const math_1 = require("../utils/math");
const thief = ({ id, currentHitPoints }) => ({
    id: id ? id : (0, math_1.getUuid)(),
    type: monster_1.MonsterType.THIEF,
    stamina: {
        maxHitPoints: 16,
        hitPoints: currentHitPoints ? parseInt(currentHitPoints) : 16,
    },
    crit: 0,
    dodge: 15,
    attackPower: 0,
    block: 0,
    weapons: [
        {
            name: "Rusty Shank",
            damage: {
                low: 2,
                high: 5,
            },
            type: weapon_1.WeaponType.KNIFE,
            rarity: item_1.ItemRarity.COMMON,
            crit: {
                chance: 7,
                multiplier: 1.5
            },
            imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/weapons/monster/bone-knife.svg"
        },
        {
            name: "Used Dirk",
            damage: {
                low: 3,
                high: 6,
            },
            type: weapon_1.WeaponType.KNIFE,
            rarity: item_1.ItemRarity.UNCOMMON,
            crit: {
                chance: 8,
                multiplier: 1.75
            },
            imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/weapons/monster/plain-dagger.svg"
        }
    ]
});
exports.thief = thief;
const executeThiefAttack = (thief) => {
    const actions = [];
    thief.weapons.forEach(weapon => {
        const events = [event_1.Event.PHYSICALATTACK];
        const { value, isCrit } = (0, math_1.getMonsterPhysicalAttack)(thief, weapon);
        if (isCrit)
            events.push(event_1.Event.CRITICAL);
        actions.push({
            type: events,
            value,
            isCrit,
            weapon
        });
    });
    return [actions];
};
exports.executeThiefAttack = executeThiefAttack;
