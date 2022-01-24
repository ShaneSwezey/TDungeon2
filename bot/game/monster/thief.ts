import { Event } from "../enums/event";
import { ItemRarity } from "../enums/item";
import { MonsterType } from "../enums/monster";
import { WeaponType } from "../enums/weapon";
import { IAction } from "../interfaces/action";
import { IMonsterStats, IThief } from "../interfaces/monster";
import { getMonsterPhysicalAttack, getUuid } from "../utils/math";

export const thief = ({ id, currentHitPoints }: IMonsterStats): IThief => ({
    id: id ? id : getUuid(),
    type: MonsterType.THIEF,
    stamina: {
        maxHitPoints: 16,
        hitPoints: currentHitPoints ? parseInt(currentHitPoints) : 16,
    },
    crit: 0,
    dodge: 15,
    attackPower: 0,
    block: 0,
    weapons: [
        {
            name: "Rusty Shank",
            damage: {
                low: 2,
                high: 5,
            },
            type: WeaponType.KNIFE,
            rarity: ItemRarity.COMMON,
            crit: {
                chance: 7,
                multiplier: 1.5
            },
            imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/weapons/monster/bone-knife.svg"
        },
        {
            name: "Used Dirk",
            damage: {
                low: 3,
                high: 6,
            },
            type: WeaponType.KNIFE,
            rarity: ItemRarity.UNCOMMON,
            crit: {
                chance: 8,
                multiplier: 1.75
            },
            imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/weapons/monster/plain-dagger.svg"
        }
    ]
});

export const executeThiefAttack = (thief: IThief): IAction[][] => {
    const actions: IAction[] = [];
    thief.weapons.forEach(weapon => {
        const events = [Event.PHYSICALATTACK];
        const { value, isCrit } = getMonsterPhysicalAttack(thief, weapon);

        if (isCrit) events.push(Event.CRITICAL);

        actions.push({
            type: events,
            value,
            isCrit,
            weapon
        })
    });
    return [ actions ];
}