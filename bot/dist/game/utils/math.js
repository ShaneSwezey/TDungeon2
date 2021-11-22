"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUuid = exports.probabilityDistributor = exports.selectRandom = exports.selectRandomMonsters = exports.selectRandomHeroes = exports.getNextTurn = exports.getRandomTurn = exports.getStaminaPercentage = exports.getRandomInt = void 0;
const round_1 = require("../enum/round");
const uuid_1 = require("uuid");
// inclusive maximum
const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
};
exports.getRandomInt = getRandomInt;
const getStaminaPercentage = (stamina) => {
    return (stamina.hitPoints / stamina.maxHitPoints) * 100;
};
exports.getStaminaPercentage = getStaminaPercentage;
const getRandomTurn = () => {
    return exports.getRandomInt(0, 1) ? round_1.Turn.HERO : round_1.Turn.MONSTER;
};
exports.getRandomTurn = getRandomTurn;
const getNextTurn = (currentTurn) => {
    return currentTurn === round_1.Turn.MONSTER ? round_1.Turn.HERO : round_1.Turn.MONSTER;
};
exports.getNextTurn = getNextTurn;
const selectRandomHeroes = (heroes, numberOfheroes) => {
    if (heroes.length <= numberOfheroes)
        return heroes;
    const set = new Set();
    while (set.size !== numberOfheroes)
        set.add(exports.getRandomInt(0, heroes.length - 1));
    const selectedHeroes = [];
    for (let index of set)
        selectedHeroes.push(heroes[index]);
    return selectedHeroes;
};
exports.selectRandomHeroes = selectRandomHeroes;
const selectRandomMonsters = (monsters, numberOfMonsters) => {
    if (monsters.length <= numberOfMonsters)
        return monsters;
    const set = new Set();
    while (set.size !== numberOfMonsters)
        set.add(exports.getRandomInt(0, monsters.length - 1));
    const selectedMonsters = [];
    for (let index of set)
        selectedMonsters.push(monsters[index]);
    return selectedMonsters;
};
exports.selectRandomMonsters = selectRandomMonsters;
function selectRandom(array, numberToSelect) {
    if (array.length < numberToSelect)
        return array;
    const set = new Set();
    while (set.size !== numberToSelect)
        set.add(exports.getRandomInt(0, array.length - 1));
    const selectedMembers = [];
    for (let index of set)
        selectedMembers.push(array[index]);
    return selectedMembers;
}
exports.selectRandom = selectRandom;
const probabilityDistributor = (categories, weights) => {
    let totalWeight = 0;
    weights.forEach(weight => totalWeight += weight);
    const randomV = exports.getRandomInt(0, totalWeight);
    let runningTotal = 0;
    for (let i = 0; i < weights.length; i++) {
        runningTotal += weights[i];
        if (randomV < runningTotal) {
            return categories[i];
        }
    }
    return -999; // Will never execute 
};
exports.probabilityDistributor = probabilityDistributor;
const getUuid = () => uuid_1.v4();
exports.getUuid = getUuid;
