import { v4 as uuidv4 } from 'uuid';
import { IMonster } from "../interfaces/monster";
import { IHero } from "../interfaces/hero";
import { IStamina } from "../interfaces/stamina";
import { IWeapon } from "../interfaces/weapon";
import { IArmor } from "../interfaces/armor";
import { Turn } from '../enums/round';
import { CurrentAvailiableItemRarity, ItemRarity } from '../enums/item';
import { shuffle } from 'lodash';

// inclusive maximum
export const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export const getStaminaPercentage = (stamina: IStamina) => {
    return (stamina.hitPoints / stamina.maxHitPoints) * 100;
}

export const getRandomTurn = () => {
    return getRandomInt(0, 1) ? Turn.HEROES : Turn.MONSTERS;
}

export const getNextTurn = (currentTurn: string) => {
    return currentTurn === Turn.MONSTERS ? Turn.HEROES : Turn.MONSTERS;
}

export const selectRandomHeroes = (heroes: IHero[], numberOfheroes: number) => {
    if (heroes.length <= numberOfheroes) return shuffle(heroes);

    const set = new Set<number>();
    while (set.size !== numberOfheroes) set.add(getRandomInt(0, heroes.length - 1));
    
    const selectedHeroes: IHero[] = [];
    for (let index of set) selectedHeroes.push(heroes[index]);

    return selectedHeroes;
}

export const getAliveHeroes = (heroes: IHero[]) => heroes.filter(hero => hero.stamina.hitPoints > 0);

export const selectRandomMonsters = (monsters: IMonster[], numberOfMonsters: number) => {
    if (monsters.length <= numberOfMonsters) return shuffle(monsters);

    const set = new Set<number>();
    while (set.size !== numberOfMonsters) set.add(getRandomInt(0, monsters.length - 1));

    const selectedMonsters: IMonster[] = [];
    for (let index of set) selectedMonsters.push(monsters[index]);

    return selectedMonsters;
}

export const getAliveMonsters = (monsters: IMonster[]) => monsters.filter(monster => monster.stamina.hitPoints > 0);

export function selectRandom<Type>(array: Type[], numberToSelect: number) {
    if (array.length < numberToSelect) return array;

    const set = new Set<number>();
    while (set.size !== numberToSelect) set.add(getRandomInt(0, array.length - 1));

    const selectedMembers: Type[] = [];
    for (let index of set) selectedMembers.push(array[index]);

    return selectedMembers;
}

// export const probabilityDistributor = (categories: string[], weights: number[]) => {

//     let totalWeight = 0;
//     weights.forEach(weight => totalWeight += weight);
//     const randomV = getRandomInt(0, totalWeight);

//     let runningTotal = 0;
//     for (let i = 0; i < weights.length; i++) {
        
//         runningTotal += weights[i];
//         if (randomV < runningTotal) {
//             return categories[i];
//         }
//     }

//     return categories[0]; // Will never execute 
// }

export const probabilityDistributor = (categories: CurrentAvailiableItemRarity[], weights: number[]) => {

    let totalWeight = 0;
    weights.forEach(weight => totalWeight += weight);
    const randomV = getRandomInt(0, totalWeight);

    let runningTotal = 0;
    for (let i = 0; i < weights.length; i++) {
        
        runningTotal += weights[i];
        if (randomV < runningTotal) {
            return categories[i];
        }
    }

    return categories[0]; // Will never execute 
}

export const getUuid = () => uuidv4();

export const getMonsterPhysicalAttack = (monster: IMonster, weapon: IWeapon) => {
    let value = getRandomInt(weapon.damage.low, weapon.damage.high) + monster.attackPower;
    
    let isCrit = false;    
    if (getRandomInt(1,100) <= monster.crit + weapon.crit.chance) {
        isCrit = true;
        value = Math.floor(value * weapon.crit.multiplier);
    }

    return { value, isCrit };
}

export const calcCrit = (armor: IArmor[]) => armor.reduce((pv, armor) => pv + (armor.crit || 0), 0);

export const calcDodge = (armor: IArmor[]) => armor.reduce((pv, armor) => pv + (armor.dodge || 0), 0);

export const calcAttackPower = (weapons: IWeapon[], armor: IArmor[]) => {
    let attackPower = 0;
    attackPower += weapons.reduce((pv, weapon) => pv + (weapon.attackPower || 0), 0);
    attackPower += armor.reduce((pv, armor) => pv + (armor.attackPower || 0), 0);
    return attackPower;
}

export const getRandomType = <T>(types: T[]) => {
    const ceiling = types.length;
    const rand = getRandomInt(1, ceiling);
    return types[rand - 1];
}

export const getItemGoldValue = (rarity: ItemRarity) =>  {
    switch(rarity) {
        case ItemRarity.COMMON:
            return 1;
        case ItemRarity.UNCOMMON:
            return 5;
        case ItemRarity.RARE:
            return 10;
        case ItemRarity.EPIC:
            return 20;
        case ItemRarity.LEGENDARY:
            return 50;
        default:
            return 1;
    }
}

export const getHeroAttackList = (heroes: IHero[], monsterGroupValue: number) => {
    let minHeroGroupValue = Number.MAX_SAFE_INTEGER;
    let maxHeroGroupValue = Number.MIN_SAFE_INTEGER;

    heroes.forEach(hero => {
        if (Math.floor(hero.stamina.maxHitPoints / 10) < minHeroGroupValue) minHeroGroupValue = Math.floor(hero.stamina.maxHitPoints / 10);
        if (Math.floor(hero.stamina.maxHitPoints / 10) > maxHeroGroupValue) maxHeroGroupValue = Math.floor(hero.stamina.maxHitPoints / 10);
    });

    if (monsterGroupValue >= maxHeroGroupValue) {
        // highest level heroes
        // descending 
        return heroes.slice().sort((aHero, bHero) => Math.floor(bHero.stamina.maxHitPoints / 10) - Math.floor(aHero.stamina.maxHitPoints / 10));
    } else if (monsterGroupValue <= minHeroGroupValue) {
        // weakest heroes
        // ascending
        return heroes.slice().sort((aHero, bHero) => Math.floor(aHero.stamina.maxHitPoints / 10) - Math.floor(bHero.stamina.maxHitPoints / 10));
    } else {    
        // mid level heroes
        const heroesAtMonsterGroupValue = heroes.filter(hero => Math.floor(hero.stamina.maxHitPoints / 10) === monsterGroupValue);
        const heroesNotAtMonsterGroupValue = heroes.filter(hero => Math.floor(hero.stamina.maxHitPoints / 10) !== monsterGroupValue).sort((a, b) => a.stamina.maxHitPoints - b.stamina.maxHitPoints);
        return [...heroesAtMonsterGroupValue, ...heroesNotAtMonsterGroupValue];
    }
}

export const getMonsterAttackList = (monsters: IMonster[], heroGroupValue: number) => {
    let minHeroGroupValue = Number.MAX_SAFE_INTEGER;
    let maxHeroGroupValue = Number.MIN_SAFE_INTEGER;

    monsters.forEach(hero => {
        if (Math.floor(hero.stamina.maxHitPoints / 10) < minHeroGroupValue) minHeroGroupValue = Math.floor(hero.stamina.maxHitPoints / 10);
        if (Math.floor(hero.stamina.maxHitPoints / 10) > maxHeroGroupValue) maxHeroGroupValue = Math.floor(hero.stamina.maxHitPoints / 10);
    });

    if (heroGroupValue >= maxHeroGroupValue) {
        // highest level heroes
        // descending 
        return monsters.slice().sort((a, b) => Math.floor(b.stamina.maxHitPoints / 10) - Math.floor(a.stamina.maxHitPoints / 10));
    } else if (heroGroupValue <= minHeroGroupValue) {
        // weakest heroes
        // ascending
        return monsters.slice().sort((a, b) => Math.floor(a.stamina.maxHitPoints / 10) - Math.floor(b.stamina.maxHitPoints / 10));
    } else {    
        // mid level heroes
        const heroesAtMonsterGroupValue = monsters.filter(hero => Math.floor(hero.stamina.maxHitPoints / 10) === heroGroupValue);
        const heroesNotAtMonsterGroupValue = monsters.filter(hero => Math.floor(hero.stamina.maxHitPoints / 10) !== heroGroupValue).sort((a, b) => a.stamina.maxHitPoints - b.stamina.maxHitPoints);
        return [...heroesAtMonsterGroupValue, ...heroesNotAtMonsterGroupValue];
    }
}
