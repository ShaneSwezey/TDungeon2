"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeOrcAttack = exports.orc = void 0;
const event_1 = require("../enums/event");
const item_1 = require("../enums/item");
const monster_1 = require("../enums/monster");
const weapon_1 = require("../enums/weapon");
const math_1 = require("../utils/math");
const orc = ({ id, currentHitPoints }) => ({
    id: id ? id : (0, math_1.getUuid)(),
    type: monster_1.MonsterType.ORC,
    stamina: {
        maxHitPoints: 11,
        hitPoints: currentHitPoints ? parseInt(currentHitPoints) : 11
    },
    crit: 0,
    dodge: 5,
    attackPower: 0,
    block: 0,
    weapons: [
        {
            name: "Bronze Axe",
            damage: {
                low: 3,
                high: 6
            },
            type: weapon_1.WeaponType.TWOHANDEDAXE,
            rarity: item_1.ItemRarity.COMMON,
            crit: {
                chance: 8,
                multiplier: 1.75,
            },
            imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/weapons/monster/fire-axe.svg"
        }
    ]
});
exports.orc = orc;
const executeOrcAttack = (orc) => {
    const events = [event_1.Event.PHYSICALATTACK];
    const { value, isCrit } = (0, math_1.getMonsterPhysicalAttack)(orc, orc.weapons[0]);
    if (isCrit)
        events.push(event_1.Event.CRITICAL);
    return [
        [
            {
                type: events,
                value,
                isCrit,
                weapon: orc.weapons[0]
            }
        ]
    ];
};
exports.executeOrcAttack = executeOrcAttack;
