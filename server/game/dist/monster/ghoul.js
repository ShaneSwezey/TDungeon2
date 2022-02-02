"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeGhoulAttack = exports.ghoul = void 0;
const math_1 = require("../utils/math");
const weapon_1 = require("../enums/weapon");
const item_1 = require("../enums/item");
const monster_1 = require("../enums/monster");
const event_1 = require("../enums/event");
const ghoul = ({ id, currentHitPoints }) => ({
    id: id ? id : (0, math_1.getUuid)(),
    type: monster_1.MonsterType.GHOUL,
    stamina: {
        maxHitPoints: 3,
        hitPoints: currentHitPoints ? parseInt(currentHitPoints) : 3,
    },
    crit: 0,
    dodge: 3,
    attackPower: 0,
    block: 0,
    weapons: [
        {
            name: "Ghoul Claw",
            damage: {
                low: 1,
                high: 3,
            },
            type: weapon_1.WeaponType.UNARMED,
            rarity: item_1.ItemRarity.COMMON,
            crit: {
                chance: 5,
                multiplier: 2
            },
            imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/weapons/monster/evil-hand.svg"
        }
    ],
    monsterImgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/monsters/ghoul.svg",
    monsterHitImgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/monsters/ghoul-red.svg"
});
exports.ghoul = ghoul;
const executeGhoulAttack = (ghoul) => {
    const events = [event_1.Event.PHYSICALATTACK];
    const { value, isCrit } = (0, math_1.getMonsterPhysicalAttack)(ghoul, ghoul.weapons[0]);
    if (isCrit)
        events.push(event_1.Event.CRITICAL);
    return [[
            {
                events: events,
                value,
                isCrit,
                weapon: ghoul.weapons[0]
            }
        ]];
};
exports.executeGhoulAttack = executeGhoulAttack;
