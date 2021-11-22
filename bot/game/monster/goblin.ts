//import { attackHeroes } from "../actions/attack";
import { IHero } from '../hero';
import { getRandomInt, getUuid, selectRandomHeroes } from "../utils/math";
import { Monster, MonsterType } from '.';
import { MonsterAttackType } from '../stats/attack';
import { MonsterStats } from '../creation/monster';
import { isDeathBlow } from '../actions/attack';
import { Event } from '../../mongo/collections/battleEvent';

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
        type: MonsterAttackType.SHANKED,
    },
});

export const executeGoblinAttack = (goblin: Goblin, heroes: IHero[]) => {

    const aliveHeroes = heroes.filter(hero => hero.stamina.hitPoints > 0);
    const selectedHeroes = selectRandomHeroes(aliveHeroes, 1);

    const events = goblinAttack(goblin, selectedHeroes[0]);

    return events;
}


const goblinAttack = (goblin: Goblin, hero: IHero) => {
    // Flurry
    let numOfAttacks = 1;
    let attackType = "Physical Attack"
    if (getRandomInt(1,100) <= 15) {
        numOfAttacks = getRandomInt(2, 3);
        attackType = "Flurry";
    }

    const events: Event[] = [];
    for (let i = 0; i < numOfAttacks; i++) {
        let value = getRandomInt(goblin.attack.low, goblin.attack.high) + goblin.attack.attackPower;
        let isCrit = false;
        
        if (getRandomInt(1,100) <= 10) {
            isCrit = true;
            value *= 2;
        }

        const heroSnapShot: IHero = {
            ...hero,
            stamina: {
                hitPoints: hero.stamina.hitPoints,
                maxHitPoints: hero.stamina.maxHitPoints
            },
        }
        heroSnapShot.stamina.hitPoints -= value;

        const event = {
            type: attackType,
            value,
            isCrit,
            deathBlow: isDeathBlow(heroSnapShot.stamina),
            to: heroSnapShot,
            from: goblin,
        };
        
        hero.stamina.hitPoints -= value;
        events.push(event);
    }

    return events;
}