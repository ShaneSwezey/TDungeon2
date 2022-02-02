import { Event } from "../enums/event";
import { ItemRarity } from "../enums/item";
import { MonsterType } from "../enums/monster";
import { WeaponType } from "../enums/weapon";
import { IAction } from "../interfaces/battleEvent";
import { IBearCub, IMonsterStats } from "../interfaces/monster";
import { getMonsterPhysicalAttack, getUuid } from "../utils/math";

export const bearCub = ({ id, currentHitPoints }: IMonsterStats): IBearCub => ({
    id: id ? id : getUuid(),
    type: MonsterType.BEARCUB,
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
            type: WeaponType.UNARMED,
            rarity: ItemRarity.COMMON,
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
    ],
    monsterImgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/monsters/bear-head.svg",
    monsterHitImgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/monsters/bear-head-red.svg"
});

export const executeBearCubAttack = (bearCub: IBearCub): IAction[][] => {
    const events = [Event.PHYSICALATTACK];
    const { value, isCrit } = getMonsterPhysicalAttack(bearCub, bearCub.weapons[0]);

    if (isCrit) events.push(Event.CRITICAL);

    return [[
        {
            events,
            value,
            isCrit,
            weapon: bearCub.weapons[0]
        }
    ]]
};