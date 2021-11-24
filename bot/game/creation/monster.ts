import { orc } from '../monster/orc';
import { goblin } from '../monster/goblin';
//import { orge } from '../monster/ogre';
import { MonsterType } from '../monster';
import { ghoul } from '../monster/ghoul';

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
        case MonsterType.GHOUL:
            return ghoul(monsterStats);
        default:
            throw new Error(`Monster type ${monsterStats.type} was not found!`);
    }
}