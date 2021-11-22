import { Stamina } from '../stats/stamina';
import { MonsterAttack } from '../stats/attack';

export enum MonsterType {
    //PigMan = "Pig Man",
    Orc = "Orc",
    Goblin = "Goblin",
    GHOUL = "Ghoul",
    //Spiderling = "Spiderling",
    //GiantSpider = "Giant Spider",
    //SpiderQueen = "Spider Queen",
    //Ogre = "Ogre"
}

export interface Monster {
    id?: string;
    stamina: Stamina;
    readonly type: MonsterType;
    readonly attack: MonsterAttack;
}