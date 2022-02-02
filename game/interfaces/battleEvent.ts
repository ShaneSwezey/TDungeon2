import { Event } from "../enums/event";
import { BattleEventCharacter } from "../types/character";
import { IWeapon } from "./weapon";

export interface IBattleEvent extends IActionEvent {
    id?: string;
    battleId: string;
    turn: string;
    round: number;
}

export interface IActionEvent {
    iteration: number;
    initiator: ICharacterAction;
    receiver: ICharacterAction;
}

export interface ICharacterAction {
    character: BattleEventCharacter;
    action: IAction;
}

export interface IAction {
    events: Event[];
    value?: number;
    isCrit?: boolean; 
    weapon?: IWeapon;
}