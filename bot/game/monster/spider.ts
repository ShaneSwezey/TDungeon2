import { Event } from "../enums/event";
import { ItemRarity } from "../enums/item";
import { MonsterType } from "../enums/monster";
import { WeaponType } from "../enums/weapon";
import { IForestSpider, IMonsterStats } from "../interfaces/monster";
import { getMonsterPhysicalAttack, getUuid } from "../utils/math";


export const forestSpider = ({ id, currentHitPoints } : IMonsterStats): IForestSpider => ({
    id: id ? id : getUuid(),
    type: MonsterType.FORESTSPIDER,
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
            type: WeaponType.UNARMED,
            rarity: ItemRarity.COMMON,
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

export const executeForestSpiderAttack = (forestSpider: IForestSpider) => {
    const events = [Event.PHYSICALATTACK];
    const { value, isCrit } = getMonsterPhysicalAttack(forestSpider, forestSpider.weapons[0]);

    if (isCrit) events.push(Event.CRITICAL);

    return [[
        {
            events: events,
            value,
            isCrit,
            weapon: forestSpider.weapons[0]
        }
    ]]
}