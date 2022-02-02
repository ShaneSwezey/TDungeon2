"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeForestSpiderAttack = exports.forestSpider = void 0;
const event_1 = require("../enums/event");
const item_1 = require("../enums/item");
const monster_1 = require("../enums/monster");
const weapon_1 = require("../enums/weapon");
const math_1 = require("../utils/math");
const forestSpider = ({ id, currentHitPoints }) => ({
    id: id ? id : (0, math_1.getUuid)(),
    type: monster_1.MonsterType.FORESTSPIDER,
    stamina: {
        maxHitPoints: 14,
        hitPoints: currentHitPoints ? parseInt(currentHitPoints) : 14,
    },
    crit: 0,
    dodge: 13,
    attackPower: 0,
    block: 0,
    weapons: [
        {
            name: "Fang",
            damage: {
                low: 5,
                high: 8
            },
            type: weapon_1.WeaponType.UNARMED,
            rarity: item_1.ItemRarity.COMMON,
            crit: {
                chance: 10,
                multiplier: 1.5
            },
            imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/weapons/monster/insect-jaws.svg"
        }
    ],
    monsterImgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/monsters/spider-alt.svg",
    monsterHitImgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/monsters/spider-red.svg"
});
exports.forestSpider = forestSpider;
const executeForestSpiderAttack = (forestSpider) => {
    const events = [event_1.Event.PHYSICALATTACK];
    const { value, isCrit } = (0, math_1.getMonsterPhysicalAttack)(forestSpider, forestSpider.weapons[0]);
    if (isCrit)
        events.push(event_1.Event.CRITICAL);
    return [[
            {
                events: events,
                value,
                isCrit,
                weapon: forestSpider.weapons[0]
            }
        ]];
};
exports.executeForestSpiderAttack = executeForestSpiderAttack;
