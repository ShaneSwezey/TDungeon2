"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMonsters = exports.createHeroes = void 0;
const hero_1 = require("../../game/creation/hero");
const hero_2 = require("../../game/hero");
const math_1 = require("../../game/utils/math");
const faker_1 = require("faker");
const monster_1 = require("../../game/monster");
const monster_2 = require("../../game/creation/monster");
const getRandomType = (types) => {
    const ceiling = types.length;
    const rand = math_1.getRandomInt(1, ceiling);
    return types[rand - 1];
};
const createHeroes = (floor, ceiling) => {
    const numOfHeroes = math_1.getRandomInt(floor, ceiling);
    const heroes = [];
    const heroTypes = Object.values(hero_2.HeroType);
    for (let i = 0; i < numOfHeroes; i++) {
        const heroType = getRandomType(heroTypes);
        const hero = hero_1.heroFactory({ name: faker_1.name.firstName(), type: heroType });
        heroes.push(hero);
    }
    return heroes;
};
exports.createHeroes = createHeroes;
const createMonsters = (floor, ceiling) => {
    const numOfMonsters = math_1.getRandomInt(floor, ceiling);
    const monsters = [];
    const monsterTypes = Object.values(monster_1.MonsterType);
    for (let i = 0; i < numOfMonsters; i++) {
        const monsterType = getRandomType(monsterTypes);
        const monster = monster_2.monsterFactory({ type: monsterType });
        monsters.push(monster);
    }
    return monsters;
};
exports.createMonsters = createMonsters;
