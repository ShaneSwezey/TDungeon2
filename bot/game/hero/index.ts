import { ActionEvent, Event } from "../../mongo/collections/battleEvent";
import { Armor } from "../gear/armor";
import { Weapon } from "../gear/weapon";
import { Monster } from "../monster";
import { Stamina } from "../stats/stamina";
import { getRandomInt, selectRandomMonsters } from "../utils/math";

export enum HeroType {
    Melee = "Melee",
    Ranged = "Ranged",
    Caster = "Caster"
}

export interface IHero {
    id?: string;
    stamina: Stamina;
    gold: number;   
    readonly name: string;
    readonly type: HeroType;
    readonly armor: Armor[];
    readonly weapons: Weapon[];
    readonly attack: (monsters: Monster[]) => Event[];
}

export interface IHeroStats {
    id?: string;
    stamina: Stamina;
    gold: number;   
    readonly name: string;
    readonly type: HeroType;
    readonly armor: Armor[];
    readonly weapons: Weapon[];
}

export class Hero implements IHero {

    id?: string;
    name: string;
    type: HeroType;
    stamina: Stamina;
    gold: number;
    armor: Armor[];
    weapons: Weapon[];

    constructor(heroStats: IHeroStats) {
        this.id = heroStats.id;
        this.name = heroStats.name;
        this.type = heroStats.type;
        this.stamina = heroStats.stamina;
        this.gold = heroStats.gold;
        this.name = heroStats.name;
        this.armor = heroStats.armor;
        this.weapons = heroStats.weapons;
    }


    public attack(monsters: Monster[]) {

        const actionEvents: Event[] = [];
        this.weapons.forEach(weapon => {

            // can I cleave
            // chance of cleave
            let numOfMonstersToHit = 1;
            if (weapon.cleave.chance && getRandomInt(1,100) <= weapon.cleave.chance) numOfMonstersToHit = getRandomInt(weapon.cleave.num!.low, weapon.cleave.num!.high);

            const aliveMonsters = monsters.filter(monster => monster.stamina.hitPoints > 0);

            const selectedMonsters = selectRandomMonsters(aliveMonsters, numOfMonstersToHit);

            selectedMonsters.forEach(monster => {
                
                // How many times do I hit him
                let numOfHits = 1;
                let attackType = "Physical Attack";
                if (weapon.flurry.chance && getRandomInt(1, 100) <= weapon.flurry.chance) {
                    numOfHits = getRandomInt(weapon.flurry.num!.low, weapon.flurry.num!.high);
                    attackType = "Flurry";
                }

                for (let i = 0; i < numOfHits; i++) {
                    
                    let value = getRandomInt(weapon.damage.low, weapon.damage.high);

                    let isCrit = false;
                    if (getRandomInt(1, 100) <= weapon.critChance) {
                        isCrit = true;
                        value *= 2;
                    }

                    monster.stamina.hitPoints -= value;

                    const monsterSnapShot: Monster = {
                        ...monster,
                        stamina: {
                            hitPoints: monster.stamina.hitPoints,
                            maxHitPoints: monster.stamina.maxHitPoints,
                        }
                    }
                
                    const actionEvent: Event = {
                        type: attackType,
                        value,
                        isCrit,
                        deathBlow: monster.stamina.hitPoints <= 0,
                        to: monsterSnapShot,
                        from: {
                            id: this.id!,
                            name: this.name,
                            type: this.type,
                            stamina: this.stamina,
                            weapon,
                            armor: this.armor,
                        },
                    }

                    actionEvents.push(actionEvent);
                }
            });
        });

        return actionEvents;
    }

}