import { Stamina } from '../stats/stamina';
import { Attack } from '../stats/attack';


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
    readonly type: MonsterType;
    readonly stamina: Stamina;
    readonly attack: Attack;
}

