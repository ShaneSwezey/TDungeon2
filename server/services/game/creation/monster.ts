import { orc } from '../monster/orc';
import { goblin } from '../monster/goblin';
import { orge } from '../monster/ogre';
import { MonsterType } from '../monster';

export const monsterFactory = (monsterType: MonsterType) => {
    switch(monsterType) {
        case MonsterType.Orc:
            return orc();
        case MonsterType.Goblin:
            return goblin();
        case MonsterType.Ogre:
            return orge();
        default:
            throw new Error(`Monster type ${monsterType} was not found!`);
    }
}