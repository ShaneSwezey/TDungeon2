"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeGoblinAttack = exports.goblin = void 0;
const math_1 = require("../utils/math");
const monster_1 = require("../enums/monster");
const weapon_1 = require("../enums/weapon");
const item_1 = require("../enums/item");
const event_1 = require("../enums/event");
const goblin = ({ id, currentHitPoints }) => ({
    id: id ? id : (0, math_1.getUuid)(),
    type: monster_1.MonsterType.GOBLIN,
    stamina: {
        maxHitPoints: 5,
        hitPoints: currentHitPoints ? parseInt(currentHitPoints) : 5,
    },
    crit: 6,
    dodge: 10,
    attackPower: 0,
    block: 0,
    weapons: [
        {
            name: "Wooden Shanker",
            damage: {
                low: 2,
                high: 4,
            },
            type: weapon_1.WeaponType.KNIFE,
            rarity: item_1.ItemRarity.COMMON,
            crit: {
                chance: 0,
                multiplier: 2,
            },
            flurry: {
                chance: 15,
                num: {
                    low: 2,
                    high: 2,
                }
            },
            imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/weapons/monster/bone-knife.svg"
        }
    ],
    monsterImgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/monsters/goblin.svg",
    monsterHitImgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/monsters/goblin-red.svg"
});
exports.goblin = goblin;
const executeGoblinAttack = (goblin) => {
    const actions = [];
    let numOfAttacks = 1;
    let isFlurry = false;
    if (goblin.weapons[0].flurry && (0, math_1.getRandomInt)(1, 100) <= goblin.weapons[0].flurry.chance) {
        numOfAttacks = (0, math_1.getRandomInt)(goblin.weapons[0].flurry.num.low, goblin.weapons[0].flurry.num.high);
        isFlurry = true;
    }
    for (let i = 0; i < numOfAttacks; i++) {
        const events = [event_1.Event.PHYSICALATTACK];
        if (isFlurry)
            events.push(event_1.Event.FLURRY);
        const { value, isCrit } = (0, math_1.getMonsterPhysicalAttack)(goblin, goblin.weapons[0]);
        if (isCrit)
            events.push(event_1.Event.CRITICAL);
        actions.push({
            events: events,
            value,
            isCrit,
            weapon: goblin.weapons[0]
        });
    }
    return [actions];
};
exports.executeGoblinAttack = executeGoblinAttack;
