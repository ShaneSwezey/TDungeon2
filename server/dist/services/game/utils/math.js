"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.probabilityDistributor = exports.selectRandomHeroes = exports.getRandomTurn = exports.getStaminaPercentage = exports.getRandomInt = void 0;
var round_1 = require("../enum/round");
var getRandomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
};
exports.getRandomInt = getRandomInt;
var getStaminaPercentage = function (stamina) {
    return (stamina.hitPoints / stamina.maxHitPoints) * 100;
};
exports.getStaminaPercentage = getStaminaPercentage;
var getRandomTurn = function () {
    return Math.random() ? round_1.Turn.HEROINPUT : round_1.Turn.MONSTER;
};
exports.getRandomTurn = getRandomTurn;
var selectRandomHeroes = function (heroes, numberOfheroes) {
    var e_1, _a;
    if (heroes.length <= numberOfheroes)
        return heroes;
    var set = new Set();
    while (set.size !== numberOfheroes)
        set.add(exports.getRandomInt(0, heroes.length - 1));
    var selectedHeroes = [];
    try {
        for (var set_1 = __values(set), set_1_1 = set_1.next(); !set_1_1.done; set_1_1 = set_1.next()) {
            var index = set_1_1.value;
            selectedHeroes.push(heroes[index]);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (set_1_1 && !set_1_1.done && (_a = set_1.return)) _a.call(set_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return selectedHeroes;
};
exports.selectRandomHeroes = selectRandomHeroes;
var probabilityDistributor = function (categories, weights) {
    var totalWeight = 0;
    weights.forEach(function (weight) { return totalWeight += weight; });
    var randomV = exports.getRandomInt(0, totalWeight);
    var runningTotal = 0;
    for (var i = 0; i < weights.length; i++) {
        runningTotal += weights[i];
        if (randomV < runningTotal) {
            return categories[i];
        }
    }
    return -999; // Will never execute 
};
exports.probabilityDistributor = probabilityDistributor;
