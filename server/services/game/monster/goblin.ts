import { attackHeroes } from "../actions/attack";
import { Hero } from '../hero';
import { selectRandomHeroes } from "../utils/math";
import { Monster, MonsterType } from '.';

export interface Goblin extends Monster {
    type: MonsterType.Goblin;
}

export const goblin = (): Monster => ({
    type: MonsterType.Goblin,
    stamina: {
        maxHitPoints: 5,
        hitPoints: 5,
    },
    attack: {
        low: 1,
        high: 3,
        attackPower: 0,
    },
});

export const executeGoblinAttack = (goblin: Goblin, heroes: Hero[]) => {

    // select up to 5 heroes for the Goblin to attack
    const selectedHeroes = selectRandomHeroes(heroes, 5);

    // 
    attackHeroes(selectedHeroes, [goblin]);

    // Rend
    // const heroesWithRend = chanceToApplyRend({ heroes, dmg: 1, duration: 3, chance: 25 });

    return { monster: goblin, heroes , message: null }
}
