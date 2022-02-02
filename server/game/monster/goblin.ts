import { getMonsterPhysicalAttack, getRandomInt, getUuid } from "../utils/math";
import { IGoblin, IMonsterStats } from '../interfaces/monster';
import { MonsterType } from "../enums/monster";
import { WeaponType } from "../enums/weapon";
import { ItemRarity } from "../enums/item";
import { Event } from "../enums/event";
import { IAction } from "../interfaces/battleEvent";

export const goblin = ({ id, currentHitPoints }: IMonsterStats): IGoblin => ({
    id: id ? id : getUuid(),
    type: MonsterType.GOBLIN,
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
            type: WeaponType.KNIFE,
            rarity: ItemRarity.COMMON,
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

export const executeGoblinAttack = (goblin: IGoblin): IAction[][] => {
    const actions: IAction[] = [];
    let numOfAttacks = 1;
    let isFlurry = false;
    if (goblin.weapons[0].flurry && getRandomInt(1, 100) <= goblin.weapons[0].flurry.chance) {
        numOfAttacks = getRandomInt(goblin.weapons[0].flurry.num.low, goblin.weapons[0].flurry.num.high);
        isFlurry = true;
    }

    for (let i = 0; i < numOfAttacks; i++) {
        const events: Event[] = [Event.PHYSICALATTACK];
        if (isFlurry) events.push(Event.FLURRY);

        const { value, isCrit } = getMonsterPhysicalAttack(goblin, goblin.weapons[0]);

        if (isCrit) events.push(Event.CRITICAL);

        actions.push(
            {
                events: events,
                value,
                isCrit,
                weapon: goblin.weapons[0]
            }
        )
    }
    return [actions];
}