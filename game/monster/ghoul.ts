import { getMonsterPhysicalAttack, getUuid } from "../utils/math";
import { IGhoul, IMonsterStats } from "../interfaces/monster";
import { WeaponType } from "../enums/weapon";
import { ItemRarity } from "../enums/item";
import { MonsterType } from "../enums/monster";
import { Event } from "../enums/event";
import { IAction } from "../interfaces/battleEvent";

export const ghoul = ({ id, currentHitPoints }: IMonsterStats): IGhoul => ({
    id: id ? id : getUuid(),
    type: MonsterType.GHOUL,
    stamina: {
        maxHitPoints: 3,
        hitPoints: currentHitPoints ? parseInt(currentHitPoints) : 3,
    },
    crit: 0,
    dodge: 3,
    attackPower: 0,
    block: 0,
    weapons: [
        {
            name: "Ghoul Claw",
            damage: {
                low: 1,
                high: 3,
            },
            type: WeaponType.UNARMED,
            rarity: ItemRarity.COMMON,
            crit: {
                chance: 5,
                multiplier: 2
            },
            imgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/weapons/monster/evil-hand.svg"
        }
    ],
    monsterImgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/monsters/ghoul.svg",
    monsterHitImgSrc: "https://tdungeon.s3.us-west-2.amazonaws.com/monsters/ghoul-red.svg"
});

export const executeGhoulAttack = (ghoul: IGhoul): IAction[][] => {
    const events = [Event.PHYSICALATTACK];
    const { value, isCrit } = getMonsterPhysicalAttack(ghoul, ghoul.weapons[0]);

    if (isCrit) events.push(Event.CRITICAL);

    return [[
        {
            events: events,
            value,
            isCrit,
            weapon: ghoul.weapons[0]
        }
    ]]
};