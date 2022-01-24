"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeRound = void 0;
const attack_1 = require("./attack");
const executeRound = ({ turn, round, heroes, monsters }) => {
    // execute attack turn
    const actionEvents = (0, attack_1.executeAttacks)(turn, heroes, monsters);
    const { aliveHeroes, deadHeroes } = heroStates(heroes);
    const { aliveMonsters, deadMonsters } = monsterStates(monsters);
    // determine is round over and if yes, who is winner?
    const { isBattleOver, winner, nextRound } = nextRoundState(aliveHeroes, aliveMonsters, round);
    return {
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
const nextRoundState = (aliveHeroes, aliveMonsters, round) => {
    let isBattleOver = false;
    let nextRound = round + 1;
    let winner;
    if (!aliveHeroes.length || !aliveMonsters.length) {
        isBattleOver = true;
        nextRound = -1;
        if (!aliveHeroes.length) {
            winner = CharacterType.MONSTERS;
        }
        else {
            winner = CharacterType.HEROES;
        }
    }
    return { isBattleOver, winner, nextRound };
};
const heroStates = (heroes) => {
    const aliveHeroes = heroes.filter(hero => hero.stamina.hitPoints > 0);
    const deadHeroes = heroes.filter(hero => hero.stamina.hitPoints <= 0);
    return { aliveHeroes, deadHeroes };
};
const monsterStates = (monsters) => {
    const aliveMonsters = monsters.filter(monster => monster.stamina.hitPoints > 0);
    const deadMonsters = monsters.filter(monster => monster.stamina.hitPoints <= 0);
    return { aliveMonsters, deadMonsters };
};
var CharacterType;
(function (CharacterType) {
    CharacterType["HEROES"] = "Heroes";
    CharacterType["MONSTERS"] = "Monsters";
})(CharacterType || (CharacterType = {}));
