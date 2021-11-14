import { ActionEvent } from '../../persistence/mongo/collections/battleEvent';
import { Effect, EffectType } from '../effects';
import { Weapon } from '../gear/weapon';
import { Hero } from '../hero';
import { Monster, MonsterType } from '../monster';
import { Stamina } from '../stats/stamina';
import { getRandomInt, getUuid, selectRandom } from '../utils/math';

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


const isDeathBlow = (stamina: Stamina): boolean => {
    return stamina.hitPoints <= 0;
}


export const attackHeroes = (heroes: Hero[], monsters: Monster[], battleId: string, round: number) => {
    const actionEvents: ActionEvent[] = [];
    let iteration = 0;
    monsters.forEach(monster => {
        iteration++;
        const aliveHeroes = heroes.filter(hero => hero.stamina.hitPoints > 0);
        if (aliveHeroes.length > 0) {
            const selectedHero = selectRandom(aliveHeroes, 1)[0];
            
            const value = getRandomInt(monster.attack.low, monster.attack.high) + monster.attack.attackPower;
            const isCrit = false;

            const currentHeroStatus: Hero = {
                ...selectedHero,
                stamina: {
                    hitPoints: selectedHero.stamina.hitPoints,
                    maxHitPoints: selectedHero.stamina.maxHitPoints
                },
            }
            currentHeroStatus.stamina.hitPoints -= value;

            actionEvents.push({
                battleId,
                round,
                iteration,
                event: {
                    type: EventType.PHSYICALATTACK,
                    value,
                    isCrit,
                    deathBlow: isDeathBlow(currentHeroStatus.stamina),
                    to: currentHeroStatus,
                    from: monster,
                },
                createdAt: new Date().toUTCString(),
                updatedAt: new Date().toUTCString(),
            });

            selectedHero.stamina.hitPoints -= value;
        }
    });
    return actionEvents; 
}

// add crit
export const attackMonsters = (heroes: Hero[], monsters: Monster[], battleId: string, round: number)  => {
    const actionEvents: ActionEvent[] = [];
    let iteration = 0;
    heroes.forEach(hero => {
        const aliveMonsters = monsters.filter(monster => monster.stamina.hitPoints > 0);
        if (aliveMonsters.length > 0) {
            const monster = selectRandom(aliveMonsters, 1)[0];
            iteration++;
            hero.weapons.forEach(weapon => {
                const attackDodged = false;
                const isCrit = false;
                
                const value = getRandomInt(weapon.damage.low, weapon.damage.high);

                const currentMonsterStatus: Monster = {
                    ...monster,
                    stamina: {
                        hitPoints: monster.stamina.hitPoints,
                        maxHitPoints: monster.stamina.maxHitPoints,
                    }
                }
                currentMonsterStatus.stamina.hitPoints -= value;

                const actionEvent: ActionEvent = {
                    battleId,
                    round,
                    iteration,
                    event: {
                        type: EventType.PHSYICALATTACK,
                        value,
                        isCrit,
                        deathBlow: isDeathBlow(currentMonsterStatus.stamina),
                        to: currentMonsterStatus,
                        from: {
                            id: hero.id,
                            name: hero.name,
                            type: hero.type,
                            stamina: hero.stamina,
                            weapon,
                            armor: hero.armor,
                        },
                        
                    },
                    createdAt: new Date().toUTCString(),
                    updatedAt: new Date().toUTCString(), 
                }
                
                actionEvents.push(actionEvent);

                monster.stamina.hitPoints -= value;
            });
        }
    });
    return actionEvents; 
}

enum EventType {
    PHSYICALATTACK = "Physical Attack",
}

// export interface ActionEvent {
//     battleId: string;
//     round: number;
//     iteration: number;
//     event: {
//         type: EventType; // change to enum
//         value: number;
//         isCrit: boolean;
//         deathBlow: boolean;
//         to: Object; // add stricter typing later
//         from: Object;   
//     }
//     createdAt: string;
//     updatedAt: string
// }