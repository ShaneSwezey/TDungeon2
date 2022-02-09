import { Character } from "../types/character";
import { IWeapon } from "./weapon";
import { Event } from "../enums/event";

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
    character: Character;
    action: IAction;
}

export interface IAction {
    events: Event[];
    value?: number;
    isCrit?: boolean; 
    weapon?: IWeapon;
}