import { Monster, MonsterType } from '.';
import { MonsterStats } from '../creation/monster';
import { MonsterAttackType } from '../stats/attack';
import { getUuid } from '../utils/math';

export const orc = ({ id, currentHitPoints }: MonsterStats): Monster => ({
    id: id ? id : getUuid(),
    type: MonsterType.Orc,
    stamina: {
        maxHitPoints: 10,
        hitPoints: currentHitPoints ? parseInt(currentHitPoints) : 10
    },
    attack: {
        low: 3,
        high: 5,
        attackPower: 0,
        type: MonsterAttackType.SLASH,
    }
});