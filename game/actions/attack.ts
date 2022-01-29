import { EventCharacter } from "../enums/character";
import { Event } from "../enums/event";
import { Turn } from "../enums/round";
import { IAction } from "../interfaces/action";
import { IActionEvent } from "../interfaces/battleEvent";
import { IHero } from "../interfaces/hero";
import { IMonster } from "../interfaces/monster";
import { monsterExecutionSwitch } from "../monster";
import { 
    getAliveHeroes, 
    getAliveMonsters, 
    getHeroAttackList, 
    getMonsterAttackList, 
    getRandomInt, 
    selectRandomHeroes, 
    selectRandomMonsters 
} from "../utils/math";

const executeMonstersAttack = (heroes: IHero[], monsters: IMonster[]) => {
    const actionEvents: IActionEvent[] = [];
    let iteration = 0

    monsters.forEach(monster => {
        const monsterGroupValue = Math.floor(monster.stamina.maxHitPoints / 10);
        const heroAttackList = getHeroAttackList(getAliveHeroes(heroes), monsterGroupValue);
        const actionsList = monsterExecutionSwitch(monster);
        const selectedHeroes = selectRandomHeroes(heroAttackList.slice(0, actionsList.length), actionsList.length);
        selectedHeroes.forEach(hero => {
            const actions = actionsList.shift();
            (actions || []).forEach(action => {
                if (hero.stamina.hitPoints <= 0)  {
                    hero.stamina.hitPoints -= action.value!;
                    const heroSnapShot = generateHeroSnapShot(hero);
                    actionEvents.push({
                        iteration,
                        receiverType: EventCharacter.HERO,
                        receiver: heroSnapShot,
                        receiverAction: {
                            type: [Event.HIT]
                        },
                        initiatorType: EventCharacter.MONSTER,
                        initiator: monster,
                        initiatorAction: action
                    });
                } else if (getRandomInt(1, 100) <= hero.dodge) {
                    const heroSnapShot = generateHeroSnapShot(hero);
                    actionEvents.push({
                        iteration,
                        receiverType: EventCharacter.HERO,
                        receiver: heroSnapShot,
                        receiverAction: {
                            type: [Event.DODGE]
                        },
                        initiatorType: EventCharacter.MONSTER,
                        initiator: monster,
                        initiatorAction: action
                    });
                } else if (hero.block !== 0 && getRandomInt(1, 100) <= hero.block) {
                    const heroSnapShot = generateHeroSnapShot(hero);
                    actionEvents.push({
                        iteration,
                        receiverType: EventCharacter.HERO,
                        receiver: heroSnapShot,
                        receiverAction: {
                            type: [Event.BLOCK]
                        },
                        initiatorType: EventCharacter.MONSTER,
                        initiator: monster,
                        initiatorAction: action
                    });
                } else {
                    hero.stamina.hitPoints -= action.value!;
                    const heroSnapShot = generateHeroSnapShot(hero);
                    actionEvents.push({
                        iteration,
                        receiverType: EventCharacter.HERO,
                        receiver: heroSnapShot,
                        receiverAction: {
                            type: [Event.HIT]
                        },
                        initiatorType: EventCharacter.MONSTER,
                        initiator: monster,
                        initiatorAction: action
                    });
                }
            });
        });
        iteration++;
    });
    return actionEvents;
};

const executeHeroesAttack = (heroes: IHero[], monsters: IMonster[]) => {
    const actionEvents: IActionEvent[] = [];
    let iteration = 0;
    heroes.forEach(hero => {
        const heroGroupValue = Math.floor(hero.stamina.maxHitPoints / 10);
        const monsterAttackList = getMonsterAttackList(getAliveMonsters(monsters), heroGroupValue);
        const actionsList = executeHeroAttack(hero);
        const selectedMonsters = selectRandomMonsters(monsterAttackList.slice(0, actionsList.length), actionsList.length);
        selectedMonsters.forEach(monster => {
            const actions = actionsList.shift();
            (actions || []).forEach(action => {
                if (monster.stamina.hitPoints <= 0) {
                    monster.stamina.hitPoints -= action.value!;
                    const monsterSnapShot = generateMonsterSnapShot(monster);
                    actionEvents.push({
                        iteration,
                        initiatorType: EventCharacter.HERO,
                        initiator: hero,
                        initiatorAction: action,
                        receiverType: EventCharacter.MONSTER,
                        receiver: monsterSnapShot,
                        receiverAction: {
                            type: [Event.HIT]
                        }
                    });
                } else if (getRandomInt(1, 100) <= monster.dodge) {
                    const monsterSnapShot = generateMonsterSnapShot(monster);
                    actionEvents.push({
                        iteration,
                        initiatorType: EventCharacter.HERO,
                        initiator: hero,
                        initiatorAction: action,
                        receiverType: EventCharacter.MONSTER,
                        receiver: monsterSnapShot,
                        receiverAction: {
                            type: [Event.DODGE]
                        }
                    });
                } else if (monster.block !== 0 && getRandomInt(1, 100) <= monster.block) {
                    const monsterSnapShot = generateMonsterSnapShot(monster);
                    actionEvents.push({
                        iteration,
                        initiatorType: EventCharacter.HERO,
                        initiator: hero,
                        initiatorAction: action,
                        receiverType: EventCharacter.MONSTER,
                        receiver: monsterSnapShot,
                        receiverAction: {
                            type: [Event.BLOCK]
                        }
                    });
                } else {
                    monster.stamina.hitPoints -= action.value!;
                    const monsterSnapShot = generateMonsterSnapShot(monster);
                    actionEvents.push({
                        iteration,
                        initiatorType: EventCharacter.HERO,
                        initiator: hero,
                        initiatorAction: action,
                        receiverType: EventCharacter.MONSTER,
                        receiver: monsterSnapShot,
                        receiverAction: {
                            type: [Event.HIT]
                        }
                    });
                }
            });
        });
        iteration++;
    });
    return actionEvents;
};


const executeHeroAttack = (hero: IHero) => {
    const actions: IAction[][] = [];
    hero.weapons.forEach(weapon => {
        const events: Event[] = [Event.PHYSICALATTACK];
        let numOfMonstersToHit = 1;
        if (weapon.cleave && getRandomInt(1,100) <= weapon.cleave.chance) {
            numOfMonstersToHit = getRandomInt(weapon.cleave.num.low, weapon.cleave.num.high);
            events.push(Event.CLEAVE);
        }
    
        let numOfHitsPerMonster = 1;
        if (weapon.flurry && getRandomInt(1, 100) <= weapon.flurry.chance) {
            numOfHitsPerMonster = getRandomInt(weapon.flurry.num.low, weapon.flurry.num.high);
            events.push(Event.FLURRY);
        }

        for (let i = 0; i < numOfMonstersToHit; i++) {
            const actionsOnMonster: IAction[] = [];
            for (let j = 0; j < numOfHitsPerMonster; j++) {
                        
                let attackValue = getRandomInt(weapon.damage.low, weapon.damage.high);

                let isCrit = false;
                if (getRandomInt(1, 100) <= weapon.crit.chance + hero.crit) {
                    isCrit = true;
                    attackValue = Math.floor(attackValue * weapon.crit.multiplier);
                    events.push(Event.CRITICAL);
                }

                attackValue += hero.attackPower;

                actionsOnMonster.push({
                    type: events,
                    value: attackValue,
                    isCrit,
                    weapon
                });
            }
            actions[i] ? actions[i].push(...actionsOnMonster) : actions.push(actionsOnMonster);
        }
    });
    return actions;
}

export const executeAttacks = (turn: string, heroes: IHero[], monsters: IMonster[]) => {
    if (turn === Turn.HEROES) {
        return executeHeroesAttack(heroes, monsters);
    } else {
        return executeMonstersAttack(heroes, monsters);
    }
};

const generateMonsterSnapShot = (monster: IMonster): IMonster => {
    return {
        ...monster,
        stamina: {
            hitPoints: monster.stamina.hitPoints,
            maxHitPoints: monster.stamina.maxHitPoints
        }
    }
}

const generateHeroSnapShot = (hero: IHero): IHero => {
    return {
        ...hero,
        stamina: {
            hitPoints: hero.stamina.hitPoints,
            maxHitPoints: hero.stamina.maxHitPoints
        }
    };
}