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
exports.getUuid = exports.probabilityDistributor = exports.selectRandom = exports.selectRandomMonsters = exports.selectRandomHeroes = exports.getNextTurn = exports.getRandomTurn = exports.getStaminaPercentage = exports.getRandomInt = void 0;
var round_1 = require("../enum/round");
var uuid_1 = require("uuid");
// inclusive maximum
var getRandomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
};
exports.getRandomInt = getRandomInt;
var getStaminaPercentage = function (stamina) {
    return (stamina.hitPoints / stamina.maxHitPoints) * 100;
};
exports.getStaminaPercentage = getStaminaPercentage;
var getRandomTurn = function () {
    return exports.getRandomInt(0, 1) ? round_1.Turn.HERO : round_1.Turn.MONSTER;
};
exports.getRandomTurn = getRandomTurn;
var getNextTurn = function (currentTurn) {
    return currentTurn === round_1.Turn.MONSTER ? round_1.Turn.HERO : round_1.Turn.MONSTER;
};
exports.getNextTurn = getNextTurn;
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
var selectRandomMonsters = function (monsters, numberOfMonsters) {
    var e_2, _a;
    if (monsters.length <= numberOfMonsters)
        return monsters;
    var set = new Set();
    while (set.size !== numberOfMonsters)
        set.add(exports.getRandomInt(0, monsters.length - 1));
    var selectedMonsters = [];
    try {
        for (var set_2 = __values(set), set_2_1 = set_2.next(); !set_2_1.done; set_2_1 = set_2.next()) {
            var index = set_2_1.value;
            selectedMonsters.push(monsters[index]);
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (set_2_1 && !set_2_1.done && (_a = set_2.return)) _a.call(set_2);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return selectedMonsters;
};
exports.selectRandomMonsters = selectRandomMonsters;
function selectRandom(array, numberToSelect) {
    var e_3, _a;
    if (array.length < numberToSelect)
        return array;
    var set = new Set();
    while (set.size !== numberToSelect)
        set.add(exports.getRandomInt(0, array.length - 1));
    var selectedMembers = [];
    try {
        for (var set_3 = __values(set), set_3_1 = set_3.next(); !set_3_1.done; set_3_1 = set_3.next()) {
            var index = set_3_1.value;
            selectedMembers.push(array[index]);
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (set_3_1 && !set_3_1.done && (_a = set_3.return)) _a.call(set_3);
        }
        finally { if (e_3) throw e_3.error; }
    }
    return selectedMembers;
}
exports.selectRandom = selectRandom;
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
var getUuid = function () { return uuid_1.v4(); };
exports.getUuid = getUuid;
