import { Event } from "../enums/event";
import { ItemRarity } from "../enums/item";
import { MonsterType } from "../enums/monster";
import { WeaponType } from "../enums/weapon";
import { IAction } from "../interfaces/battleEvent";
import { ICentaur, IMonsterStats } from "../interfaces/monster";
import { getMonsterPhysicalAttack, getRandomInt, getUuid } from "../utils/math";

export const centaur = ({ id, currentHitPoints }: IMonsterStats): ICentaur => ({
    id: id ? id : getUuid(),
    type: MonsterType.CENTAUR,
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
            type: WeaponType.BOW,
            rarity: ItemRarity.UNCOMMON,
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

export const executeCentaurAttack = (centaur: ICentaur): IAction[][] => {
    const actions: IAction[] = [];
    let numOfAttacks = 1;
    let isFlurry = false;
    if (centaur.weapons[0].flurry && getRandomInt(1, 100) <= centaur.weapons[0].flurry.chance) {
        numOfAttacks = getRandomInt(centaur.weapons[0].flurry.num.low, centaur.weapons[0].flurry.num.high);
        isFlurry = true;
    }

    for (let i = 0; i < numOfAttacks; i++) {
        const events: Event[] = [Event.PHYSICALATTACK];
        if (isFlurry) events.push(Event.FLURRY);

        const { value, isCrit } = getMonsterPhysicalAttack(centaur, centaur.weapons[0]);

        if (isCrit) events.push(Event.CRITICAL);

        actions.push(
            {
                events: events,
                value,
                isCrit,
                weapon: centaur.weapons[0]
            }
        )
    }
    return [actions];
}