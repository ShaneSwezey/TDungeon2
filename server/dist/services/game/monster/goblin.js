"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeGoblinAttack = exports.goblin = void 0;
const math_1 = require("../utils/math");
const _1 = require(".");
const attack_1 = require("../stats/attack");
const attack_2 = require("../actions/attack");
const goblin = ({ id, currentHitPoints }) => ({
    id: id ? id : math_1.getUuid(),
    type: _1.MonsterType.Goblin,
    stamina: {
        maxHitPoints: 5,
        hitPoints: currentHitPoints ? parseInt(currentHitPoints) : 5,
    },
    attack: {
        low: 1,
        high: 3,
        attackPower: 0,
        type: attack_1.MonsterAttackType.SHANKED,
    },
});
exports.goblin = goblin;
const executeGoblinAttack = (goblin, heroes) => {
    const aliveHeroes = heroes.filter(hero => hero.stamina.hitPoints > 0);
    const selectedHeroes = math_1.selectRandomHeroes(aliveHeroes, 1);
    const events = goblinAttack(goblin, selectedHeroes[0]);
    return events;
};
exports.executeGoblinAttack = executeGoblinAttack;
const goblinAttack = (goblin, hero) => {
    // Flurry
    let numOfAttacks = 1;
    let attackType = "Physical Attack";
    if (math_1.getRandomInt(1, 100) <= 15) {
        numOfAttacks = math_1.getRandomInt(2, 3);
        attackType = "Flurry";
    }
    const events = [];
    for (let i = 0; i < numOfAttacks; i++) {
        let value = math_1.getRandomInt(goblin.attack.low, goblin.attack.high) + goblin.attack.attackPower;
        let isCrit = false;
        if (math_1.getRandomInt(1, 100) <= 10) {
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
        const event = {
            type: attackType,
            value,
            isCrit,
            deathBlow: attack_2.isDeathBlow(heroSnapShot.stamina),
            to: heroSnapShot,
            from: goblin,
        };
        hero.stamina.hitPoints -= value;
        events.push(event);
    }
    return events;
};
