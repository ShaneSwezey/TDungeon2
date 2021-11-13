//import { attackHeroes } from "../actions/attack";
import { Hero } from '../hero';
import { getUuid, selectRandomHeroes } from "../utils/math";
import { Monster, MonsterType } from '.';
import { MonsterAttackType } from '../stats/attack';
import { MonsterStats } from '../creation/monster';

export interface Goblin extends Monster {
    type: MonsterType.Goblin;
}

export const goblin = ({ id, currentHitPoints }: MonsterStats): Monster => ({
    id: id ? id : getUuid(),
    type: MonsterType.Goblin,
    stamina: {
        maxHitPoints: 5,
        hitPoints: currentHitPoints ? parseInt(currentHitPoints) : 5,
    },
    attack: {
        low: 1,
        high: 3,
        attackPower: 0,
        type: MonsterAttackType.STABBED,
    },
});

// export const executeGoblinAttack = (goblin: Goblin, heroes: Hero[]) => {

//     // select up to 5 heroes for the Goblin to attack
//     const selectedHeroes = selectRandomHeroes(heroes, 5);

//     // 
//     attackHeroes(selectedHeroes, [goblin]);

//     // Rend
//     // const heroesWithRend = chanceToApplyRend({ heroes, dmg: 1, duration: 3, chance: 25 });

//     return { monster: goblin, heroes , message: null }
// }
