"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonsterAttackType = exports.MonsterType = void 0;
var MonsterType;
(function (MonsterType) {
    //PigMan = "Pig Man",
    MonsterType["ORC"] = "Orc";
    MonsterType["GOBLIN"] = "Goblin";
    MonsterType["GHOUL"] = "Ghoul";
    //Spiderling = "Spiderling",
    //GiantSpider = "Giant Spider",
    //SpiderQueen = "Spider Queen",
    //Ogre = "Ogre"
})(MonsterType = exports.MonsterType || (exports.MonsterType = {}));
var MonsterAttackType;
(function (MonsterAttackType) {
    MonsterAttackType["SLASH"] = "Slash";
    MonsterAttackType["STABBED"] = "Stabbed";
    MonsterAttackType["PUNCHED"] = "Punched";
    MonsterAttackType["SHANKED"] = "Shanked";
    MonsterAttackType["SCRATCH"] = "Scratched";
})(MonsterAttackType = exports.MonsterAttackType || (exports.MonsterAttackType = {}));
