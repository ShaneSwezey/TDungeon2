import { Redis } from 'ioredis';
import { Turn } from '../game/enums/round';
import { IArmor } from '../game/interfaces/armor';
import { IHero } from '../game/interfaces/hero';
import { IMonster } from '../game/interfaces/monster';
import { IWeapon } from '../game/interfaces/weapon';


export class RedisInstance {

    private heroPrefix = "hero";
    private battleId = "battle:id";
    private battleTurn = "battle:turn";
    private battleRound = "battle:round";
    private battleParticipants = "battle:hero:participants";
    private battleHeroAlive = "battle:hero:alive";
    private battleMonsterAlive = "battle:monster:alive";

    private redis: Redis;

    public constructor(redis: Redis) {
        this.redis = redis;
    }

    public async setBattleId(battleId: string) {
        try {
            return await this.redis.set(this.battleId, battleId);
        } catch(error) {
            throw error;
        }
    }

    public async getBattleId() {
        try {
            return await this.redis.get(this.battleId);
        } catch(error) {
            throw error;
        }
    }

    public async setTurn(turn: Turn) {
        try {
            return await this.redis.set(this.battleTurn, turn);
        } catch(error) {
            throw error;
        }
    }

    public async getTurn() {
        try {
            return await this.redis.get(this.battleTurn);
        } catch(error) {
            throw error;
        }
    }

    public async setRound(roundNumber: number) {
        try {
            return await this.redis.set(this.battleRound, roundNumber);
        } catch(error) {
            throw error;
        }
    }

    public async getRound() {
        try {
            return await this.redis.get(this.battleRound);
        } catch(error) {
            throw error;
        }
    }

    public async setHeroBattleParticipation(hero: IHero) {
        try {
            return await this.redis.sadd(this.battleParticipants, `${hero.name}`);
        } catch(error) {
            throw error;
        }
    }

    public async getHeroBattleParticipants() {
        try {
            return await this.redis.smembers(this.battleParticipants);
        } catch(error) {
            throw error;
        }
    }

    public async setAliveHero(hero: IHero) {
        try {
            return await this.redis.sadd(this.battleHeroAlive, hero.name);
        } catch(error) {
            throw error;
        }
    }

    public async setAliveHeroes(heroes: IHero[]) {
        try {
            return await this.redis.sadd(this.battleHeroAlive, heroes.map(({ name }) => name))
        } catch(error) {
            throw error;
        }
    }

    public async getAliveHeroes() {
        try {
            return await this.redis.smembers(this.battleHeroAlive);
        } catch(error) {
            throw error;
        }
    }

    public async setHero(hero: IHero) {
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

    public async updateHeroStat(hero: IHero) {
        try {
            return await this.redis.hmset(`${this.heroPrefix}:${hero.name}`, 'hitPoints', `${hero.stamina.hitPoints}`);
        } catch(error) {
            throw error;
        }
    }
    
    public async getHero(heroName: string) {
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

    public async setAliveMonsters(monsters: IMonster[]) {
        try {
            const monsterList = monsters.map(({ id, type, stamina }) => `${id}:${type}:${stamina.hitPoints}`)
            await this.redis.del(this.battleMonsterAlive)
            return await this.redis.rpush(this.battleMonsterAlive, monsterList);
        } catch(error) {
            throw error;
        }
    }

    public async getAliveMonsters() {
        try {
            return await this.redis.lrange(this.battleMonsterAlive, 0, -1);
        } catch(error) {
            throw error;
        }
    }

    public disconnect() {
        try {
            return this.redis.disconnect();
        } catch(e) {
            throw e;
        }
    }

    // Armor: name:type:slot
    private getArmorString(armor: IArmor[]) {
        return armor.map(({ name, type, slot }) => `${name}:${type}:${slot}`).toString();
    }

    // Weapon: name:type
    private getWeaponString(weapons: IWeapon[]) {
        return weapons.map(({ name, type }) => `${name}:${type}`).toString();
    }

    private createArmorRecords(armorString: string) {
        return armorString.split(",").map(armorString => {
            const parsedString = armorString.split(":");
            return { name: parsedString[0], type: parsedString[1], slot: parsedString[2] };
        });
    }

    private createWeaponRecords(weaponString: string) {
        return weaponString.split(",").map(weaponString => {
            const parsedString = weaponString.split(":");
            return { name: parsedString[0], type: parsedString[1] };
        });
    }

}