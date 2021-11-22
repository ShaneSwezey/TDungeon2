"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeRound = void 0;
const round_1 = require("../enum/round");
const attack_1 = require("./attack");
const executeRound = ({ battleId, turn, round, heroes, monsters }) => {
    let nextRound = round + 1;
    // execute attack turn
    let actionEvents;
    if (turn === round_1.Turn.HERO) {
        actionEvents = attack_1.executeHeroesAttack(heroes, monsters, battleId, round);
    }
    else {
        actionEvents = attack_1.executeMonstersAttack(heroes, monsters, battleId, round);
    }
    const deadHeroes = [];
    const aliveHeroes = [];
    heroes.forEach(hero => hero.stamina.hitPoints <= 0 ? deadHeroes.push(hero) : aliveHeroes.push(hero));
    const deadMonsters = [];
    const aliveMonsters = [];
    monsters.forEach(monster => monster.stamina.hitPoints <= 0 ? deadMonsters.push(monster) : aliveMonsters.push(monster));
    // determine is round over and if yes, who is winner?
    let isBattleOver = false;
    let winner;
    if (!aliveHeroes.length || !aliveMonsters.length) {
        isBattleOver = true;
        nextRound = -1;
        if (!aliveHeroes.length) {
            winner = "Monsters";
        }
        else {
            winner = "Heroes";
        }
    }
    return {
        battleId,
        isBattleOver,
        winner,
        nextRound,
        aliveHeroes,
        deadHeroes,
        aliveMonsters,
        deadMonsters,
        actionEvents
    };
};
exports.executeRound = executeRound;
