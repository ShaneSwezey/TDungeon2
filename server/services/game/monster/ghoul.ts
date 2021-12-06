import { MonsterType, Monster } from ".";
import { MonsterAttackType } from "../stats/attack";
import { getRandomInt, getUuid, selectRandomHeroes } from "../utils/math";
import { MonsterStats } from '../creation/monster';
import { IHero } from "../hero";
import { Event } from "../../persistence/mongo/collections/battleEvent";
import { isDeathBlow } from "../actions/attack";


export interface Ghoul extends Monster {
    type: MonsterType.GHOUL;
}


export const ghoul = ({ id, currentHitPoints }: MonsterStats): Ghoul => ({
    id: id ? id : getUuid(),
    type: MonsterType.GHOUL,
    stamina: {
        maxHitPoints: 3,
        hitPoints: currentHitPoints ? parseInt(currentHitPoints) : 3,
    },
    attack: {
        low: 1,
        high: 2,
        attackPower: 0,
        type: MonsterAttackType.SCRATCH,
    },
});

export const executeGhoulAttack = (ghoul: Ghoul, heroes: IHero[]) => {
    const aliveHeroes = heroes.filter(hero => hero.stamina.hitPoints > 0);
    const selectedHeroes = selectRandomHeroes(aliveHeroes, 1);
    const events = ghoulAttack(ghoul, selectedHeroes[0]);

    return events;
}

const ghoulAttack = (ghoul: Ghoul, hero: IHero) => {
    const events: Event[] = [];
    for (let i = 0; i < 1; i++) {
        let value = getRandomInt(ghoul.attack.low, ghoul.attack.high) + ghoul.attack.attackPower;
        let isCrit = false;
        
        if (getRandomInt(1,100) <= 5) {
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
        let attackType = "Physical Attack"
        const event = {
            type: attackType,
            value,
            isCrit,
            deathBlow: isDeathBlow(heroSnapShot.stamina),
            to: heroSnapShot,
            from: ghoul,
        };
        
        hero.stamina.hitPoints -= value;
        events.push(event);
    }
    return events;
};