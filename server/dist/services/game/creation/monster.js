"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.monsterFactory = void 0;
var orc_1 = require("../monster/orc");
var goblin_1 = require("../monster/goblin");
var ogre_1 = require("../monster/ogre");
var monster_1 = require("../monster");
var monsterFactory = function (monsterType) {
    switch (monsterType) {
        case monster_1.MonsterType.Orc:
            return orc_1.orc();
        case monster_1.MonsterType.Goblin:
            return goblin_1.goblin();
        case monster_1.MonsterType.Ogre:
            return ogre_1.orge();
        default:
            throw new Error("Monster type " + monsterType + " was not found!");
    }
};
exports.monsterFactory = monsterFactory;
