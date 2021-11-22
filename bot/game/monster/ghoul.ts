import { MonsterType, Monster } from ".";
import { MonsterAttackType } from "../stats/attack";
import { getUuid } from "../utils/math";
import { MonsterStats } from '../creation/monster';


export interface Ghoul extends Monster {
    type: MonsterType.GHOUL;
}


export const ghoul = ({ id, currentHitPoints }: MonsterStats): Ghoul => ({
    id: id ? id : getUuid(),
    type: MonsterType.GHOUL,
    stamina: {
        maxHitPoints: 5,
        hitPoints: currentHitPoints ? parseInt(currentHitPoints) : 5,
    },
    attack: {
        low: 1,
        high: 3,
        attackPower: 0,
        type: MonsterAttackType.SCRATCH,
    },
});