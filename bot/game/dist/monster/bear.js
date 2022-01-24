"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeBearCubAttack = exports.bearCub = void 0;
const event_1 = require("../enums/event");
const item_1 = require("../enums/item");
const monster_1 = require("../enums/monster");
const weapon_1 = require("../enums/weapon");
const math_1 = require("../utils/math");
const bearCub = ({ id, currentHitPoints }) => ({
    id: id ? id : (0, math_1.getUuid)(),
    type: monster_1.MonsterType.BEARCUB,
    stamina: {
        maxHitPoints: 23,
        hitPoints: currentHitPoints ? parseInt(currentHitPoints) : 23,
    },
    crit: 0,
    dodge: 5,
    attackPower: 0,
    block: 15,
    weapons: [
        {
            name: "Bear Claw",
            damage: {
                low: 7,
                high: 11,
            },
            type: weapon_1.WeaponType.UNARMED,
            rarity: item_1.ItemRarity.COMMON,
            crit: {
                chance: 10,
                multiplier: 1.5
            },
            cleave: {
                chance: 20,
                num: {
                    low: 2,
                    high: 3
                }
            },
            imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/weapons/monster/triple-scratches.svg"
        }
    ]
});
exports.bearCub = bearCub;
const executeBearCubAttack = (bearCub) => {
    const events = [event_1.Event.PHYSICALATTACK];
    const { value, isCrit } = (0, math_1.getMonsterPhysicalAttack)(bearCub, bearCub.weapons[0]);
    if (isCrit)
        events.push(event_1.Event.CRITICAL);
    return [[
            {
                type: events,
                value,
                isCrit,
                weapon: bearCub.weapons[0]
            }
        ]];
};
exports.executeBearCubAttack = executeBearCubAttack;
