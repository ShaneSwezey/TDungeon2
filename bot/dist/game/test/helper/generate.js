"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateHeroes = void 0;
const hero_1 = require("../../creation/hero");
const hero_2 = require("../../hero");
const math_1 = require("../../utils/math");
const faker_1 = require("faker");
const generateHeroes = (numberOfHeroes) => {
    const heroes = [];
    for (let i = 0; i < numberOfHeroes; i++) {
        const heroType = selectRandomHeroType();
        heroes.push(hero_1.heroFactory({ name: faker_1.name.firstName(), type: heroType }));
    }
    return heroes;
};
exports.generateHeroes = generateHeroes;
const selectRandomHeroType = () => {
    const randomInt = math_1.getRandomInt(1, 3);
    switch (randomInt) {
        case 1:
            return hero_2.HeroType.Melee;
        case 2:
            return hero_2.HeroType.Ranged;
        default:
            return hero_2.HeroType.Caster;
    }
};
