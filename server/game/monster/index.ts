import { MonsterType } from "../enums/monster";
import { IHero } from "../interfaces/hero";
import { getRandomInt } from "../utils/math";
import { bearCub, executeBearCubAttack } from "./bear";
import { executeGhoulAttack, ghoul } from "./ghoul";
import { executeGoblinAttack, goblin } from "./goblin";
import { executeOgreAttack, ogre } from "./ogre";
import { executeOrcAttack, orc } from "./orc";
import { executeForestSpiderAttack, forestSpider } from "./spider";
import { executeThiefAttack, thief } from "./thief";
import { 
    IBearCub, 
    ICentaur, 
    IForestSpider, 
    IGhoul, 
    IGoblin, 
    IMonster, 
    IMonsterStats, 
    IOgre, 
    IOrc, 
    IThief 
} from "../interfaces/monster";
import { centaur, executeCentaurAttack } from "./centaur";

export const monsterExecutionSwitch = (monster: IMonster) => {
    switch(monster.type) {
        case MonsterType.ORC:
            return executeOrcAttack(monster as IOrc);
        case MonsterType.GOBLIN:
            return executeGoblinAttack(monster as IGoblin);
        case MonsterType.GHOUL:
            return executeGhoulAttack(monster as IGhoul);
        case MonsterType.OGRE:
            return executeOgreAttack(monster as IOgre);
        case MonsterType.THIEF:
            return executeThiefAttack(monster as IThief);
        case MonsterType.FORESTSPIDER:
            return executeForestSpiderAttack(monster as IForestSpider);
        case MonsterType.BEARCUB:
            return executeBearCubAttack(monster as IBearCub);
        case MonsterType.CENTAUR:
            return executeCentaurAttack(monster as ICentaur);
        default:
            throw new Error(`${monster.type} does not exist`);
    }
}

export const monsterFactory = (monsterStats: IMonsterStats): IMonster => { 
    switch(monsterStats.type) {
        case MonsterType.ORC:
            return orc(monsterStats);
        case MonsterType.GOBLIN:
            return goblin(monsterStats);
        case MonsterType.GHOUL:
            return ghoul(monsterStats);
        case MonsterType.OGRE:
            return ogre(monsterStats);
        case MonsterType.THIEF:
            return thief(monsterStats);
        case MonsterType.FORESTSPIDER:
            return forestSpider(monsterStats);
        case MonsterType.BEARCUB:
            return bearCub(monsterStats);
        case MonsterType.CENTAUR:
            return centaur(monsterStats);
        default:
            throw new Error(`Monster type ${monsterStats.type} was not found!`);
    }
}

const getRandomMonsterInGroupZero = () => {
    const randInt = getRandomInt(1, 2);
    if (randInt === 1) {
        return monsterFactory({ type: MonsterType.GHOUL });
    } else {
        return monsterFactory({ type: MonsterType.GOBLIN });
    }
}

const getRandomMonsterInGroupOne = () => {
    const randInt = getRandomInt(1, 3);
    if (randInt === 1) {
        return monsterFactory({ type: MonsterType.ORC })
    } else if (randInt === 2) {
        return monsterFactory({ type: MonsterType.FORESTSPIDER });
    } else {
        return monsterFactory({ type: MonsterType.THIEF });
    }
}

const getRandomMonsterInGroupTwo = () => {
    const randInt = getRandomInt(1, 2);
    if (randInt === 1) {
        return monsterFactory({ type: MonsterType.BEARCUB });
    } else {
        return monsterFactory({ type: MonsterType.CENTAUR });
    }
}

const getRandomMonsterInGroupThree = () => {
    return monsterFactory({ type: MonsterType.OGRE });
}

const getMonsterByGroupValue = (groupValue: number) =>{
    switch(groupValue) {
        case 0:
            return getRandomMonsterInGroupZero();
        case 1:
            return getRandomMonsterInGroupOne();
        case 2:
            return getRandomMonsterInGroupTwo();
        case 3:
            return getRandomMonsterInGroupThree();
        default:
            return getRandomMonsterInGroupZero();
    }
}

export const createMonsters = (hero: IHero) => {
    const heroGroupValue = Math.floor(hero.stamina.maxHitPoints / 10);
    return getMonsterByGroupValue(heroGroupValue);
}