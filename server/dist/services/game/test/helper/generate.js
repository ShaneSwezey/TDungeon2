"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateHeroes = void 0;
var hero_1 = require("../../creation/hero");
var hero_2 = require("../../hero");
var math_1 = require("../../utils/math");
var faker_1 = require("faker");
var generateHeroes = function (numberOfHeroes) {
    var heroes = [];
    for (var i = 0; i < numberOfHeroes; i++) {
        var heroType = selectRandomHeroType();
        heroes.push(hero_1.createNewHero(faker_1.name.firstName(), heroType));
    }
    return heroes;
};
exports.generateHeroes = generateHeroes;
var selectRandomHeroType = function () {
    var randomInt = math_1.getRandomInt(1, 3);
    switch (randomInt) {
        case 1:
            return hero_2.HeroType.Melee;
        case 2:
            return hero_2.HeroType.Ranged;
        default:
            return hero_2.HeroType.Caster;
    }
};
