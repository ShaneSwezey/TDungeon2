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



export const attackHeroes = (heroes: Hero[], monsters: Monster[]) => {
    const actionEvents: ActionEvent[] = [];
    let iteration = 0;
    monsters.forEach(monster => {
        iteration++;
        const aliveHeroes = heroes.filter(hero => hero.stamina.hitPoints > 0);
        const selectedHero = selectRandom(aliveHeroes, 1)[0];
        
        const value = getRandomInt(monster.attack.low, monster.attack.high) + monster.attack.attackPower;
        const isCrit = false;

        const currentHeroStatus: Hero = { ...selectedHero };
        currentHeroStatus.stamina.hitPoints -= value;

        actionEvents.push({
            type: "Physical Attack",
            value,
            isCrit,
            to: currentHeroStatus,
            from: monster,
            iteration,
        });

        selectedHero.stamina.hitPoints -= value;
    });
    return actionEvents; 
}

// add crit
export const attackMonsters = (heroes: Hero[], monsters: Monster[])  => {
    const actionEvents: ActionEvent[] = [];
    let iteration = 0;
    heroes.forEach(hero => {
        const aliveMonsters = monsters.filter(monster => monster.stamina.hitPoints > 0);
        const monster = selectRandom(aliveMonsters, 1)[0];
        iteration++;
        hero.weapons.forEach(weapon => {
            const attackDodged = false;
            const isCrit = false;
            
            const value = getRandomInt(weapon.damage.low, weapon.damage.high);

            const currentMonsterStatus: Monster = { ...monster };
            currentMonsterStatus.stamina.hitPoints -= value;

            const actionEvent: ActionEvent = {
                type: "Physical Attack",
                value,
                isCrit,
                to: currentMonsterStatus,
                from: {
                    id: hero.id,
                    name: hero.name,
                    type: hero.type,
                    stamina: hero.stamina,
                    weapon,
                    armor: hero.armor,
                },
                iteration 
            }
            
            actionEvents.push(actionEvent);

            monster.stamina.hitPoints -= value;
        });
    });
    return actionEvents; 
}

interface ActionEvent {
    type: string; // change to enum
    value: number;
    isCrit: boolean;
    to: Hero | Monster
    from: Object;
    iteration: number;
}