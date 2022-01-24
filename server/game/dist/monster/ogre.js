"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeOgreAttack = exports.ogre = void 0;
const event_1 = require("../enums/event");
const item_1 = require("../enums/item");
const monster_1 = require("../enums/monster");
const weapon_1 = require("../enums/weapon");
const math_1 = require("../utils/math");
const ogre = ({ id, currentHitPoints }) => ({
    id: id ? id : (0, math_1.getUuid)(),
    type: monster_1.MonsterType.OGRE,
    stamina: {
        maxHitPoints: 35,
        hitPoints: currentHitPoints ? parseInt(currentHitPoints) : 35
    },
    crit: 2,
    dodge: 5,
    block: 10,
    attackPower: 0,
    weapons: [
        {
            name: "Fist",
            damage: {
                low: 5,
                high: 8
            },
            type: weapon_1.WeaponType.UNARMED,
            rarity: item_1.ItemRarity.COMMON,
            crit: {
                chance: 10,
                multiplier: 2
            },
            imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/weapons/monster/punch-blast.svg"
        },
        {
            name: "Mighty Axe",
            damage: {
                low: 7,
                high: 12
            },
            type: weapon_1.WeaponType.ONEHANDEDAXE,
            rarity: item_1.ItemRarity.RARE,
            crit: {
                chance: 15,
                multiplier: 1.5
            },
            cleave: {
                chance: 20,
                num: {
                    low: 2,
                    high: 3
                }
            },
            imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/weapons/monster/axe-swing.svg"
        }
    ]
});
exports.ogre = ogre;
// const ogreRage = (ogre: IOgre) => {
//     if  (getStaminaPercentage(ogre.stamina) <= 50 && !ogre.buffs.find(buff => buff.title === AbilityTitle.Frenzy)) {
//         const frenzy = getFrenzy(10);
//         setFrenzy(ogre, frenzy);
//         return 'Ogre begins to rage - gachiHYPER'
//     };
//     return;
// }
const executeOgreAttack = (ogre) => {
    const actions = [];
    ogre.weapons.forEach(weapon => {
        let numOfHeroesToHit = 1;
        let isCleave = false;
        if (weapon.cleave && (0, math_1.getRandomInt)(1, 100) <= weapon.cleave.chance) {
            numOfHeroesToHit = (0, math_1.getRandomInt)(weapon.cleave.num.low, weapon.cleave.num.high);
            isCleave = true;
        }
        for (let i = 0; i < numOfHeroesToHit; i++) {
            const events = [event_1.Event.PHYSICALATTACK];
            let attackValue = (0, math_1.getRandomInt)(weapon.damage.low, weapon.damage.high);
            let isCrit = false;
            if ((0, math_1.getRandomInt)(1, 100) <= weapon.crit.chance + ogre.crit) {
                isCrit = true;
                attackValue = Math.floor(attackValue * weapon.crit.multiplier);
                events.push(event_1.Event.CRITICAL);
            }
            attackValue += ogre.attackPower;
            if (isCleave)
                events.push(event_1.Event.CLEAVE);
            const actionOnHero = {
                type: events,
                value: attackValue,
                isCrit,
                weapon
            };
            actions[i] ? actions[i].push(actionOnHero) : actions.push([actionOnHero]);
        }
    });
    return actions;
};
exports.executeOgreAttack = executeOgreAttack;
