import { MonsterType } from "../enums/monster";
import { IStamina } from "./stamina";
import { IWeapon } from "./weapon";

export interface IMonster {
    id?: string;
    stamina: IStamina;
    crit: number;
    dodge: number;
    attackPower: number;
    block: number;
    readonly type: MonsterType;
    readonly weapons: IWeapon[];
}

export interface IMonsterStats {
    type: string;
    id?: string;
    currentHitPoints?: string;
}

export interface IOrc extends IMonster {
    type: MonsterType.ORC;
}

export interface IGoblin extends IMonster {
    type: MonsterType.GOBLIN;
}

export interface IGhoul extends IMonster {
    type: MonsterType.GHOUL;
}

export interface IBattleEventMonster {
    id?: string;
    stamina: IStamina;
    crit: number;
    dodge: number;
    attackPower: number;
    block: number;
    readonly monsterType: MonsterType;
    readonly weapons: IWeapon[];
    readonly imgSrc: string;
}