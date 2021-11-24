"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.monsterFactory = void 0;
const orc_1 = require("../monster/orc");
const goblin_1 = require("../monster/goblin");
//import { orge } from '../monster/ogre';
const monster_1 = require("../monster");
const ghoul_1 = require("../monster/ghoul");
const monsterFactory = (monsterStats) => {
    switch (monsterStats.type) {
        case monster_1.MonsterType.Orc:
            return orc_1.orc(monsterStats);
        case monster_1.MonsterType.Goblin:
            return goblin_1.goblin(monsterStats);
        case monster_1.MonsterType.GHOUL:
            return ghoul_1.ghoul(monsterStats);
        default:
            throw new Error(`Monster type ${monsterStats.type} was not found!`);
    }
};
exports.monsterFactory = monsterFactory;
