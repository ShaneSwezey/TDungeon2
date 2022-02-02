"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeCentaurAttack = exports.centaur = void 0;
const event_1 = require("../enums/event");
const item_1 = require("../enums/item");
const monster_1 = require("../enums/monster");
const weapon_1 = require("../enums/weapon");
const math_1 = require("../utils/math");
const centaur = ({ id, currentHitPoints }) => ({
    id: id ? id : (0, math_1.getUuid)(),
    type: monster_1.MonsterType.CENTAUR,
    stamina: {
        maxHitPoints: 28,
        hitPoints: currentHitPoints ? parseInt(currentHitPoints) : 28,
    },
    crit: 0,
    dodge: 10,
    attackPower: 0,
    block: 0,
    weapons: [
        {
            name: "Centaur Light Bow",
            damage: {
                low: 9,
                high: 12,
            },
            type: weapon_1.WeaponType.BOW,
            rarity: item_1.ItemRarity.UNCOMMON,
            crit: {
                chance: 12,
                multiplier: 1.5
            },
            flurry: {
                chance: 13,
                num: {
                    low: 2,
                    high: 2
                }
            },
            imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/weapons/monster/high-shot.svg"
        }
    ],
    monsterImgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/monsters/centaur.svg",
    monsterHitImgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/monsters/centaur-red.svg"
});
exports.centaur = centaur;
const executeCentaurAttack = (centaur) => {
    const actions = [];
    let numOfAttacks = 1;
    let isFlurry = false;
    if (centaur.weapons[0].flurry && (0, math_1.getRandomInt)(1, 100) <= centaur.weapons[0].flurry.chance) {
        numOfAttacks = (0, math_1.getRandomInt)(centaur.weapons[0].flurry.num.low, centaur.weapons[0].flurry.num.high);
        isFlurry = true;
    }
    for (let i = 0; i < numOfAttacks; i++) {
        const events = [event_1.Event.PHYSICALATTACK];
        if (isFlurry)
            events.push(event_1.Event.FLURRY);
        const { value, isCrit } = (0, math_1.getMonsterPhysicalAttack)(centaur, centaur.weapons[0]);
        if (isCrit)
            events.push(event_1.Event.CRITICAL);
        actions.push({
            events: events,
            value,
            isCrit,
            weapon: centaur.weapons[0]
        });
    }
    return [actions];
};
exports.executeCentaurAttack = executeCentaurAttack;
