import { Event } from '../enums/event';
import { ItemRarity } from '../enums/item';
import { MonsterType } from '../enums/monster';
import { WeaponType } from '../enums/weapon';
import { IAction } from '../interfaces/battleEvent';
import { IMonsterStats, IOrc } from '../interfaces/monster';
import { getMonsterPhysicalAttack, getUuid } from '../utils/math';

export const orc = ({ id, currentHitPoints }: IMonsterStats): IOrc => ({
    id: id ? id : getUuid(),
    type: MonsterType.ORC,
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
            type: WeaponType.TWOHANDEDAXE,
            rarity: ItemRarity.COMMON,
            crit: {
                chance: 8,
                multiplier: 1.75,
            },
            imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/weapons/monster/fire-axe.svg"
        }
    ],
    monsterImgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/monsters/orc.svg",
    monsterHitImgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/monsters/orc-red.svg"
});


export const executeOrcAttack = (orc: IOrc): IAction[][] => {
    const events = [Event.PHYSICALATTACK];
    const { value, isCrit } = getMonsterPhysicalAttack(orc, orc.weapons[0]);
    
    if (isCrit) events.push(Event.CRITICAL);

    return [
        [
            {
                events: events,
                value,
                isCrit,
                weapon: orc.weapons[0]
            }
        ]
    ]
}