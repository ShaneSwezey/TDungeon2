import { orc } from '../monster/orc';
import { goblin } from '../monster/goblin';
//import { orge } from '../monster/ogre';
import { MonsterType } from '../monster';

export interface MonsterStats {
    type: string;
    id?: string;
    currentHitPoints?: string;
}

export const monsterFactory = (monsterStats: MonsterStats) => {
    switch(monsterStats.type) {
        case MonsterType.Orc:
            return orc(monsterStats);
        case MonsterType.Goblin:
            return goblin(monsterStats);
        // case MonsterType.Ogre:
        //     return orge();
        default:
            throw new Error(`Monster type ${monsterStats.type} was not found!`);
    }
}