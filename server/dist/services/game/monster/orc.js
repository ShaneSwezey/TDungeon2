"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecuteOrcAttack = exports.orc = void 0;
const _1 = require(".");
const attack_1 = require("../actions/attack");
const attack_2 = require("../stats/attack");
const math_1 = require("../utils/math");
const orc = ({ id, currentHitPoints }) => ({
    id: id ? id : math_1.getUuid(),
    type: _1.MonsterType.Orc,
    stamina: {
        maxHitPoints: 10,
        hitPoints: currentHitPoints ? parseInt(currentHitPoints) : 10
    },
    attack: {
        low: 3,
        high: 5,
        attackPower: 0,
        type: attack_2.MonsterAttackType.SLASH,
    }
});
exports.orc = orc;
const ExecuteOrcAttack = (orc, heroes) => {
    const aliveHeroes = heroes.filter(hero => hero.stamina.hitPoints > 0);
    const selectedHeroes = math_1.selectRandomHeroes(aliveHeroes, 1);
    const events = orcAttack(orc, selectedHeroes[0]);
    return events;
};
exports.ExecuteOrcAttack = ExecuteOrcAttack;
const orcAttack = (orc, hero) => {
    const events = [];
    let value = math_1.getRandomInt(orc.attack.low, orc.attack.high) + orc.attack.attackPower;
    let isCrit = false;
    if (math_1.getRandomInt(1, 100) <= 20) {
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
        type: "Physcial Attack",
        value,
        isCrit,
        deathBlow: attack_1.isDeathBlow(heroSnapShot.stamina),
        to: heroSnapShot,
        from: orc,
    };
    hero.stamina.hitPoints -= value;
    events.push(event);
    return events;
};
