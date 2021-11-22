import { Monster, MonsterType } from '.';
import { Event } from '../../mongo/collections/battleEvent';
import { isDeathBlow } from '../actions/attack';
import { MonsterStats } from '../creation/monster';
import { IHero } from '../hero';
import { MonsterAttackType } from '../stats/attack';
import { getRandomInt, getUuid, selectRandomHeroes } from '../utils/math';

export interface Orc extends Monster {
    type: MonsterType.Orc;
}


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


export const ExecuteOrcAttack = (orc: Orc, heroes: IHero[]) => {

    const aliveHeroes = heroes.filter(hero => hero.stamina.hitPoints > 0);
    const selectedHeroes = selectRandomHeroes(aliveHeroes, 1);

    const events = orcAttack(orc, selectedHeroes[0]);

    return events;
};

const orcAttack = (orc: Orc, hero: IHero) => {

    const events: Event[] = [];
    let value = getRandomInt(orc.attack.low, orc.attack.high) + orc.attack.attackPower;
    let isCrit = false;
        
    if (getRandomInt(1,100) <= 20) {
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
        type: "Physcial Attack",
        value,
        isCrit,
        deathBlow: isDeathBlow(heroSnapShot.stamina),
        to: heroSnapShot,
        from: orc,
    };
    
    hero.stamina.hitPoints -= value;
    events.push(event);

    return events;
}