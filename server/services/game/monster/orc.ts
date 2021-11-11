import { Monster, MonsterType } from '.';

export const orc = (): Monster => ({
    type: MonsterType.Orc,
    stamina: {
        maxHitPoints: 10,
        hitPoints: 10
    },
    attack: {
        low: 3,
        high: 5,
        attackPower: 0,
    }
});