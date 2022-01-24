import { IActionEvent } from "./battleEvent";
import { IHero } from "./hero";
import { IMonster } from "./monster";
export interface IRoundResults {
    isBattleOver: boolean;
    winner?: string;
    nextRound: number;
    aliveHeroes: IHero[];
    deadHeroes: IHero[];
    aliveMonsters: IMonster[];
    deadMonsters: IMonster[];
    actionEvents: IActionEvent[];
}
export interface IRoundArgs {
    turn: string;
    round: number;
    heroes: IHero[];
    monsters: IMonster[];
}
export interface IWorkerRoundArgs {
    battleId: string;
    round: number;
}
export interface IWorkerRoundResults extends IRoundResults {
    battleId: string;
}
//# sourceMappingURL=round.d.ts.map