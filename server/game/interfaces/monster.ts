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
    readonly monsterImgSrc: string;
    readonly monsterHitImgSrc: string;
}

export interface IBattleEventMonster {
    id?: string;
    stamina: IStamina;
    crit: number;
    dodge: number;
    attackPower: number;
    block: number;
    readonly type: MonsterType;
    readonly weapons: IWeapon[];
    readonly imgSrc: string;
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

export interface IOgre extends IMonster {
    type: MonsterType.OGRE;
}

export interface IThief extends IMonster {
    type: MonsterType.THIEF;
}

export interface IForestSpider extends IMonster {
    type: MonsterType.FORESTSPIDER;
}

export interface IBearCub extends IMonster {
    type: MonsterType.BEARCUB;
}

export interface ICentaur extends IMonster {
    type: MonsterType.CENTAUR;
}