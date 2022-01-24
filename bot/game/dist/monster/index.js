"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMonsters = exports.monsterFactory = exports.monsterExecutionSwitch = void 0;
const monster_1 = require("../enums/monster");
const math_1 = require("../utils/math");
const bear_1 = require("./bear");
const ghoul_1 = require("./ghoul");
const goblin_1 = require("./goblin");
const ogre_1 = require("./ogre");
const orc_1 = require("./orc");
const spider_1 = require("./spider");
const thief_1 = require("./thief");
const centaur_1 = require("./centaur");
const monsterExecutionSwitch = (monster) => {
    switch (monster.type) {
        case monster_1.MonsterType.ORC:
            return (0, orc_1.executeOrcAttack)(monster);
        case monster_1.MonsterType.GOBLIN:
            return (0, goblin_1.executeGoblinAttack)(monster);
        case monster_1.MonsterType.GHOUL:
            return (0, ghoul_1.executeGhoulAttack)(monster);
        case monster_1.MonsterType.OGRE:
            return (0, ogre_1.executeOgreAttack)(monster);
        case monster_1.MonsterType.THIEF:
            return (0, thief_1.executeThiefAttack)(monster);
        case monster_1.MonsterType.FORESTSPIDER:
            return (0, spider_1.executeForestSpiderAttack)(monster);
        case monster_1.MonsterType.BEARCUB:
            return (0, bear_1.executeBearCubAttack)(monster);
        case monster_1.MonsterType.CENTAUR:
            return (0, centaur_1.executeCentaurAttack)(monster);
        default:
            throw new Error(`${monster.type} does not exist`);
    }
};
exports.monsterExecutionSwitch = monsterExecutionSwitch;
const monsterFactory = (monsterStats) => {
    switch (monsterStats.type) {
        case monster_1.MonsterType.ORC:
            return (0, orc_1.orc)(monsterStats);
        case monster_1.MonsterType.GOBLIN:
            return (0, goblin_1.goblin)(monsterStats);
        case monster_1.MonsterType.GHOUL:
            return (0, ghoul_1.ghoul)(monsterStats);
        case monster_1.MonsterType.OGRE:
            return (0, ogre_1.ogre)(monsterStats);
        case monster_1.MonsterType.THIEF:
            return (0, thief_1.thief)(monsterStats);
        case monster_1.MonsterType.FORESTSPIDER:
            return (0, spider_1.forestSpider)(monsterStats);
        case monster_1.MonsterType.BEARCUB:
            return (0, bear_1.bearCub)(monsterStats);
        case monster_1.MonsterType.CENTAUR:
            return (0, centaur_1.centaur)(monsterStats);
        default:
            throw new Error(`Monster type ${monsterStats.type} was not found!`);
    }
};
exports.monsterFactory = monsterFactory;
const getRandomMonsterInGroupZero = () => {
    const randInt = (0, math_1.getRandomInt)(1, 2);
    if (randInt === 1) {
        return (0, exports.monsterFactory)({ type: monster_1.MonsterType.GHOUL });
    }
    else {
        return (0, exports.monsterFactory)({ type: monster_1.MonsterType.GOBLIN });
    }
};
const getRandomMonsterInGroupOne = () => {
    const randInt = (0, math_1.getRandomInt)(1, 3);
    if (randInt === 1) {
        return (0, exports.monsterFactory)({ type: monster_1.MonsterType.ORC });
    }
    else if (randInt === 2) {
        return (0, exports.monsterFactory)({ type: monster_1.MonsterType.FORESTSPIDER });
    }
    else {
        return (0, exports.monsterFactory)({ type: monster_1.MonsterType.THIEF });
    }
};
const getRandomMonsterInGroupTwo = () => {
    const randInt = (0, math_1.getRandomInt)(1, 2);
    if (randInt === 1) {
        return (0, exports.monsterFactory)({ type: monster_1.MonsterType.BEARCUB });
    }
    else {
        return (0, exports.monsterFactory)({ type: monster_1.MonsterType.CENTAUR });
    }
};
const getRandomMonsterInGroupThree = () => {
    return (0, exports.monsterFactory)({ type: monster_1.MonsterType.OGRE });
};
const getMonsterByGroupValue = (groupValue) => {
    switch (groupValue) {
        case 0:
            return getRandomMonsterInGroupZero();
        case 1:
            return getRandomMonsterInGroupOne();
        case 2:
            return getRandomMonsterInGroupTwo();
        case 3:
            return getRandomMonsterInGroupThree();
        default:
            return getRandomMonsterInGroupZero();
    }
};
const createMonsters = (hero) => {
    const heroGroupValue = Math.floor(hero.stamina.maxHitPoints / 10);
    return getMonsterByGroupValue(heroGroupValue);
};
exports.createMonsters = createMonsters;
