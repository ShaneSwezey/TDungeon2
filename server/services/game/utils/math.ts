import { Turn } from "../enum/round";
import { Hero } from "../hero";
import { Monster } from "../monster";
import { Stamina } from "../stats/stamina";
import { v4 as uuidv4 } from 'uuid';

export const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

export const getStaminaPercentage = (stamina: Stamina) => {
    return (stamina.hitPoints / stamina.maxHitPoints) * 100;
}

export const getRandomTurn = () => {
    return Math.random() ? Turn.HEROINPUT : Turn.MONSTER;
}

export const selectRandomHeroes = (heroes: Hero[], numberOfheroes: number) => {
    if (heroes.length <= numberOfheroes) return heroes;

    const set = new Set<number>();
    while (set.size !== numberOfheroes) set.add(getRandomInt(0, heroes.length - 1));
    
    const selectedHeroes: Hero[] = [];
    for (let index of set) selectedHeroes.push(heroes[index]);

    return selectedHeroes;
}

export const selectRandomMonsters = (monsters: Monster[], numberOfMonsters: number) => {
    if (monsters.length <= numberOfMonsters) return monsters;

    const set = new Set<number>();
    while (set.size !== numberOfMonsters) set.add(getRandomInt(0, monsters.length - 1));

    const selectedMonsters: Monster[] = [];
    for (let index of set) selectedMonsters.push(monsters[index]);

    return selectedMonsters;
}

export function selectRandom<Type>(array: Type[], numberToSelect: number) {
    if (array.length < numberToSelect) return array;

    const set = new Set<number>();
    while (set.size !== numberToSelect) set.add(getRandomInt(0, array.length - 1));

    const selectedMembers: Type[] = [];
    for (let index of set) array.push(array[index]);

    return selectedMembers;
}

export const probabilityDistributor = (categories: string[], weights: number[]) => {

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

    return -999; // Will never execute 
}

export const getUuid = () => uuidv4();