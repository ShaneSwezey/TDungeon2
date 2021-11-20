import { ActionEvent } from '../../persistence/mongo/collections/battleEvent';
import { Effect, EffectType } from '../effects';
import { Weapon } from '../gear/weapon';
import { IHero } from '../hero';
import { Monster, MonsterType } from '../monster';
import { executeGoblinAttack, Goblin } from '../monster/goblin';
import { ExecuteOrcAttack, Orc } from '../monster/orc';
import { Stamina } from '../stats/stamina';
import { getRandomInt, getUuid, selectRandom } from '../utils/math';

interface ExecutionPayload {
    heroes: IHero[],
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

const monsterExecutionSwitch = (monster: Monster, heroes: IHero[]) => {
    switch(monster.type) {
        case MonsterType.Orc:
            return ExecuteOrcAttack(monster as Orc, heroes);
        case MonsterType.Goblin:
            return executeGoblinAttack(monster as Goblin, heroes);
        // case MonsterType.Spiderling:
        //     return executeSpiderlingAttack(monster as SpiderLing, heroes);
        default:
            throw new Error(`${monster.type} does not exist`);
    }
}

export const executeMonstersAttack = (heroes: IHero[], monsters: Monster[], battleId: string, round: number) => {
    const actionEvents: ActionEvent[] = [];
    let iteration = 0;
    monsters.forEach(monster => {
        const events = monsterExecutionSwitch(monster, heroes);
        events.forEach(event => actionEvents.push({ battleId, round, iteration, event, createdAt: new Date().toUTCString(), updatedAt: new Date().toUTCString() }));
        iteration++;
    });
    return actionEvents;
};


export const executeHeroesAttack = (heroes: IHero[], monsters: Monster[], battleId: string, round: number) => {
    const actionEvents: ActionEvent[] = [];
    let iteration = 0;
    heroes.forEach(hero => {
        const events = hero.attack(monsters);
        events.forEach(event => actionEvents.push({ battleId, round, iteration, event, createdAt: new Date().toUTCString(), updatedAt: new Date().toUTCString() }));
        iteration++;
    });
    return actionEvents;
};

export const isDeathBlow = (stamina: Stamina): boolean => {
    return stamina.hitPoints <= 0;
}


export const attackHeroes = (heroes: IHero[], monsters: Monster[], battleId: string, round: number) => {
    const actionEvents: ActionEvent[] = [];
    let iteration = 0;
    monsters.forEach(monster => {
        iteration++;
        const aliveHeroes = heroes.filter(hero => hero.stamina.hitPoints > 0);
        if (aliveHeroes.length > 0) {
            const selectedHero = selectRandom(aliveHeroes, 1)[0];
            
            const value = getRandomInt(monster.attack.low, monster.attack.high) + monster.attack.attackPower;
            const isCrit = false;

            const currentHeroStatus: IHero = {
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
export const attackMonsters = (heroes: IHero[], monsters: Monster[], battleId: string, round: number)  => {
    const actionEvents: ActionEvent[] = [];
    let iteration = 0;
    heroes.forEach(hero => {
        const aliveMonsters = monsters.filter(monster => monster.stamina.hitPoints > 0);
        if (aliveMonsters.length > 0) {
            const monster = selectRandom(aliveMonsters, 1)[0];
            iteration++;
            hero.weapons.forEach(weapon => {
                let numOfAttacks = 1;
                let attackType = "Physical Attack";

                if (hero.type === "Ranged") {
                    if (getRandomInt(1,100) <= 20) {
                        numOfAttacks = getRandomInt(2,3);
                        attackType = "Flurry";
                    }
                }

                for (let i = 0; i < numOfAttacks; i++) {
                    const attackDodged = false;
                    let isCrit = false;
                    
                    let value = getRandomInt(weapon.damage.low, weapon.damage.high);

                    if (getRandomInt(1,100) <= 10) {
                        isCrit = true;
                        value *= 2;
                    }

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
                            type: attackType,
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
                }
            });
        }
    });
    return actionEvents; 
}

enum EventType {
    PHSYICALATTACK = "Physical Attack",
    FLURRY = "Flurry"
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