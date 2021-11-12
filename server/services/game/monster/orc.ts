import { Monster, MonsterType } from '.';
import { MonsterAttackType } from '../stats/attack';
import { getUuid } from '../utils/math';

export const orc = (): Monster => ({
    id: getUuid(),
    type: MonsterType.Orc,
    stamina: {
        maxHitPoints: 10,
        hitPoints: 10
    },
    attack: {
        low: 3,
        high: 5,
        attackPower: 0,
        type: MonsterAttackType.SLASH,
    }
});