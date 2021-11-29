import Redis from 'ioredis';
import { Turn } from '../game/enum/round';
import { Armor } from '../game/gear/armor';
import { Weapon } from '../game/gear/weapon';
import { Hero } from '../game/hero';
import { Monster } from '../game/monster';



export class RedisInstance {

    private static battlePrefix = "battle"
    private static heroPrefix = "hero";
    private static battleId = "battle:id";
    private static battleStatus = "battle:status";
    private static battleTurn = "battle:turn";
    private static battleRound = "battle:round";
    private static battleParticipants = "battle:hero:participants";
    private static battleHeroAlive = "battle:hero:alive";
    private static battleHeroAttack = "battle:hero:attack";
    private static battleMonsterAlive = "battle:monster:alive";


    private static redis = new Redis({
        host: "127.0.0.1",
        port: 6379
    })

    private constructor() {}

    public static async setBattleId(battleId: string) {
        try {
            return await this.redis.set(this.battleId, battleId);
        } catch(error) {
            throw error;
        }
    }

    public static async getBattleId() {
        try {
            return await this.redis.get(this.battleId);
        } catch(error) {
            throw error;
        }
    }

    public static async setBattleStatus(battleStatus: string) {
        try {
            return await this.redis.set(this.battleStatus, battleStatus);
        } catch(error) {
            throw error;
        }
    }

    public static async getBattleStatus() {
        try {
            return await this.redis.get(this.battleStatus);
        } catch(error) {
            throw error;
        }
    }

    public static async setTurn(turn: Turn) {
        try {
            return await this.redis.set(this.battleTurn, turn);
        } catch(error) {
            throw error;
        }
    }

    public static async getTurn() {
        try {
            return await this.redis.get(this.battleTurn);
        } catch(error) {
            throw error;
        }
    }

    public static async setRound(roundNumber: number) {
        try {
            return await this.redis.set(this.battleRound, roundNumber);
        } catch(error) {
            throw error;
        }
    }

    public static async getRound() {
        try {
            return await this.redis.get(this.battleRound);
        } catch(error) {
            throw error;
        }
    }

    public static async setHeroBattleParticipation(hero: Hero) {
        try {
            return await this.redis.sadd(this.battleParticipants, `${hero.name}`);
        } catch(error) {
            throw error;
        }
    }

    public static async getHeroBattleParticipants() {
        try {
            return await this.redis.smembers(this.battleParticipants);
        } catch(error) {
            throw error;
        }
    }

    public static async setAliveHero(hero: Hero) {
        try {
            return await this.redis.sadd(this.battleHeroAlive, `${hero.name}`);
        } catch(error) {
            throw error;
        }
    }

    public static async setAliveHeroes(heroes: Hero[]) {
        try {
            return await this.redis.sadd(this.battleHeroAlive, heroes.map(({ name }) => `${name}`))
        } catch(error) {
            throw error;
        }
    }

    public static async getAliveHeroes() {
        try {
            return await this.redis.smembers(this.battleHeroAlive);
        } catch(error) {
            throw error;
        }
    }

    public static async delAliveHero(heroName: string) {
        try {
            return await this.redis.srem(this.battleHeroAlive, heroName);
        } catch(error) {
            throw error;
        }
    }

    public static async setAttackingHero(hero: Hero) {
        try {
            return await this.redis.sadd(this.battleHeroAttack, `${hero.name}`);
        } catch(error) {
            throw error;
        }
    }

    public static async getAttackingHeroes() {
        try {
            return await this.redis.smembers(this.battleHeroAttack);
        } catch(error) {
            throw error;
        }
    }

    public static async clearAttackingHeroes() {
        try {
            return await this.redis.del(this.battleHeroAttack);
        } catch(error) {
            throw error;
        }
    }

    public static async setHero(hero: Hero) {
        try {
            const heroMap = new Map<string, string>();
            heroMap.set("name", hero.name);
            heroMap.set("type", hero.type);
            heroMap.set("currentHitPoints", `${hero.stamina.hitPoints}`);
            heroMap.set("armor", this.getArmorString(hero.armor));
            heroMap.set("weapons", this.getWeaponString(hero.weapons));
            return await this.redis.hmset(`battle:${hero.name}`, heroMap);
        } catch(error) {
            throw error;
        }
    }

    public static async updateHeroStat(hero: Hero) {
        try {
            return await this.redis.hmset(`battle:${hero.name}`, 'currentHitPoints', `${hero.stamina.hitPoints}`);
        } catch(error) {
            throw error;
        }
    }
    
    public static async getHero(heroName: string) {
        try {
            return await this.redis.hgetall(`battle:${heroName}`);
        } catch(error) {
            throw error;
        }
    }

    public static async setAliveMonsters(monsters: Monster[]) {
        try {
            const monsterList = monsters.map(({ id, type, stamina }) => `${id}:${type}:${stamina.hitPoints}`)
            return await this.redis.rpush(this.battleMonsterAlive, monsterList);
        } catch(error) {
            throw error;
        }
    }

    public static async delAliveMontsers() {
        try {
            await this.redis.del(this.battleMonsterAlive);
        } catch(error) {
            throw error;
        }
    }

    public static async getAliveMonsters() {
        try {
            return await this.redis.lrange(this.battleMonsterAlive, 0, -1);
        } catch(error) {
            throw error;
        }
    }

    public static async clearBattle() {
        try {
            return await this.redis.multi()
                .del(this.battleId)
                .del(this.battleStatus)
                .del(this.battleTurn)
                .del(this.battleParticipants)
                .del(this.battleHeroAlive)
                .del(this.battleHeroAttack) 
                .del(this.battleMonsterAlive) 
                .del(this.battleRound)
                .exec();
        } catch(error) {
            throw error;
        }
    }

    public static async clearHeroes(heroNames: string[]) {
        try {
            return await Promise.all(heroNames.map(async heroName => {
                return await this.redis.del(`battle:${heroName}`);
            }));
        } catch(error) {
            throw error;
        }
    }

    public static disconnect() {
        try {
            return this.redis.disconnect();
        } catch(e) {
            throw e;
        }
    }

    // Armor: name:type:slot
    private static getArmorString(armor: Armor[]) {
        return armor.map(({ name, type, slot }) => `${name}:${type}:${slot}`).toString();
    }

    // Weapon: name:type
    private static getWeaponString(weapons: Weapon[]) {
        return weapons.map(({ name, type }) => `${name}:${type}`).toString();
    }

}