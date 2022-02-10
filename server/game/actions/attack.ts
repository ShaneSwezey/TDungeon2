import { Event } from "../enums/event";
import { Turn } from "../enums/round";
import { IAction, IActionEvent } from "../interfaces/battleEvent";
import { IBattleEventHero, IHero } from "../interfaces/hero";
import { IBattleEventMonster, IMonster } from "../interfaces/monster";
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
            let events: Event[] = [];
            let hit = false;
            (actions || []).forEach(action => {
                if (hero.stamina.hitPoints <= 0) {
                    hero.stamina.hitPoints -= action.value!;
                    events = [Event.HIT];
                    hit = true;
                } else if (getRandomInt(1, 100) <= hero.dodge) {
                    events = [Event.DODGE];
                } else if (hero.block !== 0 && getRandomInt(1, 100) <= hero.block) {
                    events = [Event.BLOCK];
                } else {
                    hero.stamina.hitPoints -= action.value!;
                    events = [Event.HIT];
                    hit = true;
                }
                actionEvents.push({
                    iteration,
                    receiver: {
                        character: generateHeroSnapShot(hero, hit),
                        action: {
                            events,
                            value: action.value,
                            isCrit: action.isCrit
                        },
                    },
                    initiator: {
                        character: generateMonsterSnapShot(monster, false),
                        action
                    }
                });
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
            let events: Event[] = [];
            let hit = false;
            (actions || []).forEach(action => {
                if (monster.stamina.hitPoints <= 0) {
                    monster.stamina.hitPoints -= action.value!;
                    events = [Event.HIT];
                    hit = true;
                } else if (getRandomInt(1, 100) <= monster.dodge) {
                    events = [Event.DODGE];
                } else if (monster.block !== 0 && getRandomInt(1, 100) <= monster.block) {
                    events = [Event.BLOCK];
                } else {
                    monster.stamina.hitPoints -= action.value!;
                    events = [Event.HIT];
                    hit = true;
                }
                actionEvents.push({
                    iteration,
                    initiator: {
                        character: generateHeroSnapShot(hero, false),
                        action,
                    },
                    receiver: {
                        character: generateMonsterSnapShot(monster, hit),
                        action: {
                            events,
                            value: action.value,
                            isCrit: action.isCrit
                        }
                    }
                });
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
                    events,
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

const generateMonsterSnapShot = (monster: IMonster, hit: boolean): IBattleEventMonster => {
    return {
        id: monster.id,
        type: monster.type,
        crit: monster.crit,
        dodge: monster.dodge,
        attackPower: monster.attackPower,
        block: monster.block,
        weapons: monster.weapons,
        stamina: {
            hitPoints: monster.stamina.hitPoints,
            maxHitPoints: monster.stamina.maxHitPoints
        },
        imgSrc: hit ? monster.monsterHitImgSrc : monster.monsterImgSrc
    }
}

const generateHeroSnapShot = (hero: IHero, hit: boolean): IBattleEventHero => {
    return {
        id: hero.id!,
        name: hero.name,
        type: hero.type,
        crit: hero.crit,
        dodge: hero.dodge,
        block: hero.block,
        attackPower: hero.attackPower,
        armor: hero.armor,
        weapons: hero.weapons,
        stamina: {
            hitPoints: hero.stamina.hitPoints,
            maxHitPoints: hero.stamina.maxHitPoints
        },
        imgSrc: hit ? hero.heroHitImgSrc : hero.heroImgSrc
    };
}