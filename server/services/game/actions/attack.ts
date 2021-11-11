import { Effect, EffectType } from '../effects';
import { Weapon } from '../gear/weapon';
import { Hero } from '../hero';
import { Monster, MonsterType } from '../monster';
import { getRandomInt, selectRandom } from '../utils/math';

interface ExecutionPayload {
    heroes: Hero[],
    monsters: Monster[],
    messages: string[]
}

// export const monsterTurn = (heroes: Hero[], monsters: Monster[]): ExecutionPayload => {
//     const messages: string[] = [];
//     monsters.forEach(monster => {
//         const result = monsterExecutionSwitch(monster, heroes);
//         if (result.message) messages.push(result.message);  
//     });
//     return { heroes, monsters, messages };
// }

// const monsterExecutionSwitch = (monster: Monster, heroes: Hero[]) => {
//     switch(monster.type) {
//         case MonsterType.Ogre:
//             return executeOgreAttack(monster as Ogre, heroes);
//         case MonsterType.Goblin:
//             return executeGoblinAttack(monster as Goblin, heroes);
//         case MonsterType.Spiderling:
//             return executeSpiderlingAttack(monster as SpiderLing, heroes);
//         default:
//             throw new Error(`${monster.type} does not exist`);
//     }
// }

interface ActionEvent {
    type: string; // change to enum
    value: number;
    to: Hero | Monster
    from: Hero | Monster
    with?: Weapon;
    createdAt: Date
}

export const attackHeroes = (heroes: Hero[], monsters: Monster[]) => {
    const actionEvents: ActionEvent[] = [];
    monsters.forEach(monster => {
        heroes.forEach(hero => {
            const attackValue = getRandomInt(monster.attack.low, monster.attack.high) + monster.attack.attackPower;
            actionEvents.push({
                type: "ATTACKED",
                value: attackValue,
                to: hero,
                from: monster,
                createdAt: new Date(),
            });
        });
    });
    return actionEvents; 
}

// add crit
export const attackMonsters = (heroes: Hero[], monsters: Monster[])  => {
    const actionEvents: ActionEvent[] = [];
    heroes.forEach(hero => {
        hero.weapons.forEach(weapon => {
            const attackDodged = false;
            const monster = selectRandom(monsters, 1)[0];
            
        });
    });
    return actionEvents; 
}

