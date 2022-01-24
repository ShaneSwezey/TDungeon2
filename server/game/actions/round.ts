import { IHero } from "../interfaces/hero";
import { IMonster } from "../interfaces/monster";
import { IRoundArgs, IRoundResults } from "../interfaces/round";
import { executeAttacks } from "./attack";

export const executeRound = ({ turn, round, heroes, monsters }: IRoundArgs): IRoundResults => {

    // execute attack turn
    const actionEvents = executeAttacks(turn, heroes, monsters);
    
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
    }
};

const nextRoundState = (aliveHeroes: IHero[], aliveMonsters: IMonster[], round: number) => {
    let isBattleOver = false;
    let nextRound = round + 1;
    let winner;
    if (!aliveHeroes.length || !aliveMonsters.length) {
        isBattleOver = true;
        nextRound = -1;
        if (!aliveHeroes.length) {
            winner = CharacterType.MONSTERS;
        } else {
            winner = CharacterType.HEROES;
        }
    }
    return { isBattleOver, winner, nextRound };
}

const heroStates = (heroes: IHero[]) => {
    const aliveHeroes = heroes.filter(hero => hero.stamina.hitPoints > 0);
    const deadHeroes = heroes.filter(hero => hero.stamina.hitPoints <= 0);
    return { aliveHeroes, deadHeroes };
}

const monsterStates = (monsters: IMonster[]) => {
    const aliveMonsters = monsters.filter(monster => monster.stamina.hitPoints > 0);
    const deadMonsters = monsters.filter(monster => monster.stamina.hitPoints <= 0);
    return { aliveMonsters, deadMonsters };
}

enum CharacterType {
    HEROES = "Heroes",
    MONSTERS = "Monsters"
}