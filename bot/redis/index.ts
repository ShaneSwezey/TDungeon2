import Redis from 'ioredis';
import { Turn } from '../game/enums/round';
import { IArmor } from '../game/interfaces/armor';
import { IHero } from '../game/interfaces/hero';
import { IMonster } from '../game/interfaces/monster';
import { IWeapon } from '../game/interfaces/weapon';
import { getRedisConnectionConfig } from './options';


export class RedisInstance {

    private static heroPrefix = "hero";
    private static battleId = "battle:id";
    private static battleStatus = "battle:status";
    private static battleTurn = "battle:turn";
    private static battleRound = "battle:round";
    private static battleParticipants = "battle:hero:participants";
    private static battleHeroAlive = "battle:hero:alive";
    private static battleHeroAttack = "battle:hero:attack";
    private static battleMonsterAlive = "battle:monster:alive";

    private static redis = new Redis(getRedisConnectionConfig());

    public constructor() {}

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
            return await this.redis.get(this.battleTurn) as string;
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

    public static async setHeroBattleParticipation(hero: IHero) {
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

    public static async setAliveHero(hero: IHero) {
        try {
            return await this.redis.sadd(this.battleHeroAlive, hero.name);
        } catch(error) {
            throw error;
        }
    }

    public static async setAliveHeroes(heroes: IHero[]) {
        try {
            return await this.redis.sadd(this.battleHeroAlive, heroes.map(({ name }) => name));
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

    public static async setAttackingHero(hero: IHero) {
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

    public static async setHero(hero: IHero) {
        try {
            const heroMap = new Map<string, string>();
            heroMap.set("id", hero.id!);
            heroMap.set("name", hero.name);
            heroMap.set("type", hero.type);
            heroMap.set("hitPoints", `${hero.stamina.hitPoints}`);
            heroMap.set("armor", this.getArmorString(hero.armor));
            heroMap.set("weapons", this.getWeaponString(hero.weapons));
            return await this.redis.hmset(`${this.heroPrefix}:${hero.name}`, heroMap);
        } catch(error) {
            throw error;
        }
    }

    public static async updateHeroStat(hero: IHero) {
        try {
            return await this.redis.hmset(`${this.heroPrefix}:${hero.name}`, 'hitPoints', `${hero.stamina.hitPoints}`);
        } catch(error) {
            throw error;
        }
    }
    
    public static async getHero(heroName: string) {
        try {
            const redisHeroRecord = await this.redis.hgetall(`${this.heroPrefix}:${heroName}`);
            return redisHeroRecord ? 
            {
                id: redisHeroRecord.id,
                name: redisHeroRecord.name,
                type: redisHeroRecord.type,
                hitPoints: redisHeroRecord.hitPoints,
                armor: this.createArmorRecords(redisHeroRecord.armor),
                weapons: this.createWeaponRecords(redisHeroRecord.weapons)
            } : null;
        } catch(error) {
            throw error;
        }
    }

    public static async setAliveMonsters(monsters: IMonster[]) {
        try {
            const monsterList = monsters.map(({ id, type, stamina }) => `${id}:${type}:${stamina.hitPoints}`)
            return await this.redis.rpush(this.battleMonsterAlive, monsterList);
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

    public static async delAliveMontsers() {
        try {
            await this.redis.del(this.battleMonsterAlive);
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
                return await this.redis.del(`hero:${heroName}`);
            }));
        } catch(error) {
            throw error;
        }
    }

    public static async disconnect() {
        try {
            return this.redis.disconnect();
        } catch(e) {
            throw e;
        }
    }

    // Armor: name:type:slot
    private static getArmorString(armor: IArmor[]) {
        return armor.map(({ name, type, slot }) => `${name}:${type}:${slot}`).toString();
    }

    // Weapon: name:type
    private static getWeaponString(weapons: IWeapon[]) {
        return weapons.map(({ name, type }) => `${name}:${type}`).toString();
    }

    private static createArmorRecords(armorString: string) {
        return armorString.split(",").map(armorString => {
            const parsedString = armorString.split(":");
            return { name: parsedString[0], type: parsedString[1], slot: parsedString[2] };
        });
    }

    private static createWeaponRecords(weaponString: string) {
        return weaponString.split(",").map(weaponString => {
            const parsedString = weaponString.split(":");
            return { name: parsedString[0], type: parsedString[1] };
        });
    }
}