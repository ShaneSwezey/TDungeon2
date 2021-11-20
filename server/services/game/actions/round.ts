import { ActionEvent } from "../../persistence/mongo/collections/battleEvent";
import { Turn } from "../enum/round";
import { Hero } from "../hero";
import { Monster } from "../monster";
import { attackHeroes, attackMonsters, executeHeroesAttack, executeMonstersAttack } from "./attack";


export interface RoundArgs {
    battleId: string;
    turn: string;
    round: number;
    heroes: Hero[];
    monsters: Monster[]; 
}

export interface RoundResults {
    battleId: string;
    isBattleOver: boolean;
    winner?: string;
    nextRound: number;
    aliveHeroes: Hero[];
    deadHeroes: Hero[];
    aliveMonsters: Monster[];
    deadMonsters: Monster[];
    actionEvents: ActionEvent[];
}

export const executeRound = ({ battleId, turn, round, heroes, monsters }: RoundArgs): RoundResults => {

    let nextRound = round + 1;

    // execute attack turn
    let actionEvents: ActionEvent[];
    if (turn === Turn.HERO) {
        actionEvents = executeHeroesAttack(heroes, monsters, battleId, round);
    } else {
        actionEvents = executeMonstersAttack(heroes, monsters, battleId, round);
    }
    
    const deadHeroes: Hero[] = [];
    const aliveHeroes: Hero[] = [];
    heroes.forEach(hero => hero.stamina.hitPoints <= 0 ? deadHeroes.push(hero) : aliveHeroes.push(hero));

    const deadMonsters: Monster[] = [];
    const aliveMonsters: Monster[] = [];
    monsters.forEach(monster => monster.stamina.hitPoints <= 0 ? deadMonsters.push(monster) : aliveMonsters.push(monster));


    // determine is round over and if yes, who is winner?
    let isBattleOver = false;
    let winner;
    if (!aliveHeroes.length || !aliveMonsters.length) {
        isBattleOver = true;
        nextRound = -1;
        if (!aliveHeroes.length) {
            winner = "Monsters";
        } else {
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
    }
};