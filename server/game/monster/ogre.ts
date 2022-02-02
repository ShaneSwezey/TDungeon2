import { Event } from "../enums/event";
import { ItemRarity } from "../enums/item";
import { MonsterType } from "../enums/monster";
import { WeaponType } from "../enums/weapon";
import { IAction } from "../interfaces/battleEvent";
import { IMonsterStats, IOgre } from "../interfaces/monster";
import { getRandomInt, getUuid } from "../utils/math";


export const ogre = ({ id, currentHitPoints }: IMonsterStats): IOgre => ({
    id: id ? id : getUuid(),
    type: MonsterType.OGRE,
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
            type: WeaponType.UNARMED,
            rarity: ItemRarity.COMMON,
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
            type: WeaponType.ONEHANDEDAXE,
            rarity: ItemRarity.RARE,
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
    ],
    monsterImgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/monsters/ogre.svg",
    monsterHitImgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/monsters/ogre-red.svg"
});

// const ogreRage = (ogre: IOgre) => {
//     if  (getStaminaPercentage(ogre.stamina) <= 50 && !ogre.buffs.find(buff => buff.title === AbilityTitle.Frenzy)) {
//         const frenzy = getFrenzy(10);
//         setFrenzy(ogre, frenzy);
//         return 'Ogre begins to rage - gachiHYPER'
//     };
//     return;
// }


export const executeOgreAttack = (ogre: IOgre): IAction[][] => {

    const actions: IAction[][] = [];
    ogre.weapons.forEach(weapon => {
        let numOfHeroesToHit = 1;
        let isCleave = false;
        if (weapon.cleave && getRandomInt(1,100) <= weapon.cleave.chance) {
            numOfHeroesToHit = getRandomInt(weapon.cleave.num.low, weapon.cleave.num.high);
            isCleave = true;
        }
    
        for (let i = 0; i < numOfHeroesToHit; i++) {
            const events: Event[] = [Event.PHYSICALATTACK];
            let attackValue = getRandomInt(weapon.damage.low, weapon.damage.high);

            let isCrit = false;
            if (getRandomInt(1, 100) <= weapon.crit.chance + ogre.crit) {
                isCrit = true;
                attackValue = Math.floor(attackValue * weapon.crit.multiplier);
                events.push(Event.CRITICAL);
            }

            attackValue += ogre.attackPower;
            if (isCleave) events.push(Event.CLEAVE);

            const actionOnHero = {
                events: events,
                value: attackValue,
                isCrit,
                weapon
            };

            actions[i] ? actions[i].push(actionOnHero) : actions.push([actionOnHero]);
        }
         
    });
    return actions;
}
