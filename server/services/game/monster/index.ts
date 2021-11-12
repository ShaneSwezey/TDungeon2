import { Stamina } from '../stats/stamina';
import { MonsterAttack } from '../stats/attack';


export enum MonsterType {
    PigMan = "Pig Man",
    Orc = "Orc",
    Goblin = "Goblin",
    Spiderling = "Spiderling",
    GiantSpider = "Giant Spider",
    SpiderQueen = "Spider Queen",
    Ogre = "Ogre"
}

export interface Monster {
    readonly id: string;
    readonly type: MonsterType;
    readonly stamina: Stamina;
    readonly attack: MonsterAttack;
}

