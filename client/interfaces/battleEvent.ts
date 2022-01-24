import { EventCharacter } from "../enums/character";
import { Character } from "../types/character";
import { IAction } from "./action";

export interface IBattleEvent extends IActionEvent {
    id: string;
    battleId: string;
    turn: string;
    round: number;
}

export interface IActionEvent {
    iteration: number;
    initiatorType: EventCharacter
    initiator: Character;
    initiatorAction: IAction;
    receiverType: EventCharacter;
    receiver: Character;
    receiverAction: IAction;
}