"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attackMonsters = exports.attackHeroes = void 0;
var math_1 = require("../utils/math");
var attackHeroes = function (heroes, monsters) {
    var actionEvents = [];
    monsters.forEach(function (monster) {
        heroes.forEach(function (hero) {
            var attackValue = math_1.getRandomInt(monster.attack.low, monster.attack.high) + monster.attack.attackPower;
            actionEvents.push({
                type: "ATTACKED",
                value: attackValue,
                to: hero,
                from: monster,
                createdAt: new Date(),
            });
        });
    });
    return actionEvents;
};
exports.attackHeroes = attackHeroes;
var attackMonsters = function (heroes, monsters) {
    var actionEvents = [];
    heroes.forEach(function (hero) {
        monsters.forEach(function (monster) {
            hero.weapons.forEach(function (weapon) {
                var attackValue = math_1.getRandomInt(weapon.damage.low, weapon.damage.high);
                actionEvents.push({
                    type: "ATTACKED",
                    value: attackValue,
                    to: monster,
                    with: weapon,
                    from: hero,
                    createdAt: new Date()
                });
            });
        });
    });
    return actionEvents;
};
exports.attackMonsters = attackMonsters;
