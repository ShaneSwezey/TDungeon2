"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeGhoulAttack = exports.ghoul = void 0;
const _1 = require(".");
const attack_1 = require("../stats/attack");
const math_1 = require("../utils/math");
const attack_2 = require("../actions/attack");
const ghoul = ({ id, currentHitPoints }) => ({
    id: id ? id : math_1.getUuid(),
    type: _1.MonsterType.GHOUL,
    stamina: {
        maxHitPoints: 3,
        hitPoints: currentHitPoints ? parseInt(currentHitPoints) : 3,
    },
    attack: {
        low: 1,
        high: 2,
        attackPower: 0,
        type: attack_1.MonsterAttackType.SCRATCH,
    },
});
exports.ghoul = ghoul;
const executeGhoulAttack = (ghoul, heroes) => {
    const aliveHeroes = heroes.filter(hero => hero.stamina.hitPoints > 0);
    const selectedHeroes = math_1.selectRandomHeroes(aliveHeroes, 1);
    const events = ghoulAttack(ghoul, selectedHeroes[0]);
    return events;
};
exports.executeGhoulAttack = executeGhoulAttack;
const ghoulAttack = (ghoul, hero) => {
    const events = [];
    for (let i = 0; i < 1; i++) {
        let value = math_1.getRandomInt(ghoul.attack.low, ghoul.attack.high) + ghoul.attack.attackPower;
        let isCrit = false;
        if (math_1.getRandomInt(1, 100) <= 5) {
            isCrit = true;
            value *= 2;
        }
        const heroSnapShot = {
            ...hero,
            stamina: {
                hitPoints: hero.stamina.hitPoints,
                maxHitPoints: hero.stamina.maxHitPoints
            },
        };
        heroSnapShot.stamina.hitPoints -= value;
        let attackType = "Physical Attack";
        const event = {
            type: attackType,
            value,
            isCrit,
            deathBlow: attack_2.isDeathBlow(heroSnapShot.stamina),
            to: heroSnapShot,
            from: ghoul,
        };
        hero.stamina.hitPoints -= value;
        events.push(event);
    }
    return events;
};
