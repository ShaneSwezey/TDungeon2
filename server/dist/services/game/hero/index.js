"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hero = exports.HeroType = void 0;
const math_1 = require("../utils/math");
var HeroType;
(function (HeroType) {
    HeroType["Melee"] = "Melee";
    HeroType["Ranged"] = "Ranged";
    HeroType["Caster"] = "Caster";
})(HeroType = exports.HeroType || (exports.HeroType = {}));
class Hero {
    constructor(heroStats) {
        this.id = heroStats.id;
        this.name = heroStats.name;
        this.type = heroStats.type;
        this.stamina = heroStats.stamina;
        this.gold = heroStats.gold;
        this.name = heroStats.name;
        this.armor = heroStats.armor;
        this.weapons = heroStats.weapons;
    }
    attack(monsters) {
        const actionEvents = [];
        this.weapons.forEach(weapon => {
            // can I cleave
            // chance of cleave
            let numOfMonstersToHit = 1;
            if (weapon.cleave.chance && math_1.getRandomInt(1, 100) <= weapon.cleave.chance)
                numOfMonstersToHit = math_1.getRandomInt(weapon.cleave.num.low, weapon.cleave.num.high);
            const aliveMonsters = monsters.filter(monster => monster.stamina.hitPoints > 0);
            const selectedMonsters = math_1.selectRandomMonsters(aliveMonsters, numOfMonstersToHit);
            selectedMonsters.forEach(monster => {
                // How many times do I hit him
                let numOfHits = 1;
                let attackType = "Physical Attack";
                if (weapon.flurry.chance && math_1.getRandomInt(1, 100) <= weapon.flurry.chance) {
                    numOfHits = math_1.getRandomInt(weapon.flurry.num.low, weapon.flurry.num.high);
                    attackType = "Flurry";
                }
                for (let i = 0; i < numOfHits; i++) {
                    let value = math_1.getRandomInt(weapon.damage.low, weapon.damage.high);
                    let isCrit = false;
                    if (math_1.getRandomInt(1, 100) <= weapon.critChance) {
                        isCrit = true;
                        value *= 2;
                    }
                    monster.stamina.hitPoints -= value;
                    const monsterSnapShot = {
                        ...monster,
                        stamina: {
                            hitPoints: monster.stamina.hitPoints,
                            maxHitPoints: monster.stamina.maxHitPoints,
                        }
                    };
                    const actionEvent = {
                        type: attackType,
                        value,
                        isCrit,
                        deathBlow: monster.stamina.hitPoints <= 0,
                        to: monsterSnapShot,
                        from: {
                            id: this.id,
                            name: this.name,
                            type: this.type,
                            stamina: this.stamina,
                            weapon,
                            armor: this.armor,
                        },
                    };
                    actionEvents.push(actionEvent);
                }
            });
        });
        return actionEvents;
    }
}
exports.Hero = Hero;
