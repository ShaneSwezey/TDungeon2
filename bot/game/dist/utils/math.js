"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMonsterAttackList = exports.getHeroAttackList = exports.getItemGoldValue = exports.getRandomType = exports.calcAttackPower = exports.calcDodge = exports.calcCrit = exports.getMonsterPhysicalAttack = exports.getUuid = exports.probabilityDistributor = exports.selectRandom = exports.getAliveMonsters = exports.selectRandomMonsters = exports.getAliveHeroes = exports.selectRandomHeroes = exports.getNextTurn = exports.getRandomTurn = exports.getStaminaPercentage = exports.getRandomInt = void 0;
const uuid_1 = require("uuid");
const round_1 = require("../enums/round");
const item_1 = require("../enums/item");
const lodash_1 = require("lodash");
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
    return (0, exports.getRandomInt)(0, 1) ? round_1.Turn.HEROES : round_1.Turn.MONSTERS;
};
exports.getRandomTurn = getRandomTurn;
const getNextTurn = (currentTurn) => {
    return currentTurn === round_1.Turn.MONSTERS ? round_1.Turn.HEROES : round_1.Turn.MONSTERS;
};
exports.getNextTurn = getNextTurn;
const selectRandomHeroes = (heroes, numberOfheroes) => {
    if (heroes.length <= numberOfheroes)
        return (0, lodash_1.shuffle)(heroes);
    const set = new Set();
    while (set.size !== numberOfheroes)
        set.add((0, exports.getRandomInt)(0, heroes.length - 1));
    const selectedHeroes = [];
    for (let index of set)
        selectedHeroes.push(heroes[index]);
    return selectedHeroes;
};
exports.selectRandomHeroes = selectRandomHeroes;
const getAliveHeroes = (heroes) => heroes.filter(hero => hero.stamina.hitPoints > 0);
exports.getAliveHeroes = getAliveHeroes;
const selectRandomMonsters = (monsters, numberOfMonsters) => {
    if (monsters.length <= numberOfMonsters)
        return (0, lodash_1.shuffle)(monsters);
    const set = new Set();
    while (set.size !== numberOfMonsters)
        set.add((0, exports.getRandomInt)(0, monsters.length - 1));
    const selectedMonsters = [];
    for (let index of set)
        selectedMonsters.push(monsters[index]);
    return selectedMonsters;
};
exports.selectRandomMonsters = selectRandomMonsters;
const getAliveMonsters = (monsters) => monsters.filter(monster => monster.stamina.hitPoints > 0);
exports.getAliveMonsters = getAliveMonsters;
function selectRandom(array, numberToSelect) {
    if (array.length < numberToSelect)
        return array;
    const set = new Set();
    while (set.size !== numberToSelect)
        set.add((0, exports.getRandomInt)(0, array.length - 1));
    const selectedMembers = [];
    for (let index of set)
        selectedMembers.push(array[index]);
    return selectedMembers;
}
exports.selectRandom = selectRandom;
// export const probabilityDistributor = (categories: string[], weights: number[]) => {
//     let totalWeight = 0;
//     weights.forEach(weight => totalWeight += weight);
//     const randomV = getRandomInt(0, totalWeight);
//     let runningTotal = 0;
//     for (let i = 0; i < weights.length; i++) {
//         runningTotal += weights[i];
//         if (randomV < runningTotal) {
//             return categories[i];
//         }
//     }
//     return categories[0]; // Will never execute 
// }
const probabilityDistributor = (categories, weights) => {
    let totalWeight = 0;
    weights.forEach(weight => totalWeight += weight);
    const randomV = (0, exports.getRandomInt)(0, totalWeight);
    let runningTotal = 0;
    for (let i = 0; i < weights.length; i++) {
        runningTotal += weights[i];
        if (randomV < runningTotal) {
            return categories[i];
        }
    }
    return categories[0]; // Will never execute 
};
exports.probabilityDistributor = probabilityDistributor;
const getUuid = () => (0, uuid_1.v4)();
exports.getUuid = getUuid;
const getMonsterPhysicalAttack = (monster, weapon) => {
    let value = (0, exports.getRandomInt)(weapon.damage.low, weapon.damage.high) + monster.attackPower;
    let isCrit = false;
    if ((0, exports.getRandomInt)(1, 100) <= monster.crit + weapon.crit.chance) {
        isCrit = true;
        value = Math.floor(value * weapon.crit.multiplier);
    }
    return { value, isCrit };
};
exports.getMonsterPhysicalAttack = getMonsterPhysicalAttack;
const calcCrit = (armor) => armor.reduce((pv, armor) => pv + (armor.crit || 0), 0);
exports.calcCrit = calcCrit;
const calcDodge = (armor) => armor.reduce((pv, armor) => pv + (armor.dodge || 0), 0);
exports.calcDodge = calcDodge;
const calcAttackPower = (weapons, armor) => {
    let attackPower = 0;
    attackPower += weapons.reduce((pv, weapon) => pv + (weapon.attackPower || 0), 0);
    attackPower += armor.reduce((pv, armor) => pv + (armor.attackPower || 0), 0);
    return attackPower;
};
exports.calcAttackPower = calcAttackPower;
const getRandomType = (types) => {
    const ceiling = types.length;
    const rand = (0, exports.getRandomInt)(1, ceiling);
    return types[rand - 1];
};
exports.getRandomType = getRandomType;
const getItemGoldValue = (rarity) => {
    switch (rarity) {
        case item_1.ItemRarity.COMMON:
            return 1;
        case item_1.ItemRarity.UNCOMMON:
            return 5;
        case item_1.ItemRarity.RARE:
            return 10;
        case item_1.ItemRarity.EPIC:
            return 20;
        case item_1.ItemRarity.LEGENDARY:
            return 50;
        default:
            return 1;
    }
};
exports.getItemGoldValue = getItemGoldValue;
const getHeroAttackList = (heroes, monsterGroupValue) => {
    let minHeroGroupValue = Number.MAX_SAFE_INTEGER;
    let maxHeroGroupValue = Number.MIN_SAFE_INTEGER;
    heroes.forEach(hero => {
        if (Math.floor(hero.stamina.maxHitPoints / 10) < minHeroGroupValue)
            minHeroGroupValue = Math.floor(hero.stamina.maxHitPoints / 10);
        if (Math.floor(hero.stamina.maxHitPoints / 10) > maxHeroGroupValue)
            maxHeroGroupValue = Math.floor(hero.stamina.maxHitPoints / 10);
    });
    if (monsterGroupValue >= maxHeroGroupValue) {
        // highest level heroes
        // descending 
        return heroes.slice().sort((aHero, bHero) => Math.floor(bHero.stamina.maxHitPoints / 10) - Math.floor(aHero.stamina.maxHitPoints / 10));
    }
    else if (monsterGroupValue <= minHeroGroupValue) {
        // weakest heroes
        // ascending
        return heroes.slice().sort((aHero, bHero) => Math.floor(aHero.stamina.maxHitPoints / 10) - Math.floor(bHero.stamina.maxHitPoints / 10));
    }
    else {
        // mid level heroes
        const heroesAtMonsterGroupValue = heroes.filter(hero => Math.floor(hero.stamina.maxHitPoints / 10) === monsterGroupValue);
        const heroesNotAtMonsterGroupValue = heroes.filter(hero => Math.floor(hero.stamina.maxHitPoints / 10) !== monsterGroupValue).sort((a, b) => a.stamina.maxHitPoints - b.stamina.maxHitPoints);
        return [...heroesAtMonsterGroupValue, ...heroesNotAtMonsterGroupValue];
    }
};
exports.getHeroAttackList = getHeroAttackList;
const getMonsterAttackList = (monsters, heroGroupValue) => {
    let minHeroGroupValue = Number.MAX_SAFE_INTEGER;
    let maxHeroGroupValue = Number.MIN_SAFE_INTEGER;
    monsters.forEach(hero => {
        if (Math.floor(hero.stamina.maxHitPoints / 10) < minHeroGroupValue)
            minHeroGroupValue = Math.floor(hero.stamina.maxHitPoints / 10);
        if (Math.floor(hero.stamina.maxHitPoints / 10) > maxHeroGroupValue)
            maxHeroGroupValue = Math.floor(hero.stamina.maxHitPoints / 10);
    });
    if (heroGroupValue >= maxHeroGroupValue) {
        // highest level heroes
        // descending 
        return monsters.slice().sort((a, b) => Math.floor(b.stamina.maxHitPoints / 10) - Math.floor(a.stamina.maxHitPoints / 10));
    }
    else if (heroGroupValue <= minHeroGroupValue) {
        // weakest heroes
        // ascending
        return monsters.slice().sort((a, b) => Math.floor(a.stamina.maxHitPoints / 10) - Math.floor(b.stamina.maxHitPoints / 10));
    }
    else {
        // mid level heroes
        const heroesAtMonsterGroupValue = monsters.filter(hero => Math.floor(hero.stamina.maxHitPoints / 10) === heroGroupValue);
        const heroesNotAtMonsterGroupValue = monsters.filter(hero => Math.floor(hero.stamina.maxHitPoints / 10) !== heroGroupValue).sort((a, b) => a.stamina.maxHitPoints - b.stamina.maxHitPoints);
        return [...heroesAtMonsterGroupValue, ...heroesNotAtMonsterGroupValue];
    }
};
exports.getMonsterAttackList = getMonsterAttackList;
