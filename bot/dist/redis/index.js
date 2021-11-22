"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisInstance = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
class RedisInstance {
    constructor() { }
    static async setBattleId(battleId) {
        try {
            return await this.redis.set(this.battleId, battleId);
        }
        catch (error) {
            throw error;
        }
    }
    static async getBattleId() {
        try {
            return await this.redis.get(this.battleId);
        }
        catch (error) {
            throw error;
        }
    }
    static async setBattleStatus(battleStatus) {
        try {
            return await this.redis.set(this.battleStatus, battleStatus);
        }
        catch (error) {
            throw error;
        }
    }
    static async getBattleStatus() {
        try {
            return await this.redis.get(this.battleStatus);
        }
        catch (error) {
            throw error;
        }
    }
    static async setTurn(turn) {
        try {
            return await this.redis.set(this.battleTurn, turn);
        }
        catch (error) {
            throw error;
        }
    }
    static async getTurn() {
        try {
            return await this.redis.get(this.battleTurn);
        }
        catch (error) {
            throw error;
        }
    }
    static async setRound(roundNumber) {
        try {
            return await this.redis.set(this.battleRound, roundNumber);
        }
        catch (error) {
            throw error;
        }
    }
    static async getRound() {
        try {
            return await this.redis.get(this.battleRound);
        }
        catch (error) {
            throw error;
        }
    }
    static async setHeroBattleParticipation(hero) {
        try {
            return await this.redis.sadd(this.battleParticipants, `${hero.name}:${hero.type}`);
        }
        catch (error) {
            throw error;
        }
    }
    static async getHeroBattleParticipants() {
        try {
            return await this.redis.smembers(this.battleParticipants);
        }
        catch (error) {
            throw error;
        }
    }
    static async setAliveHero(hero) {
        try {
            return await this.redis.sadd(this.battleHeroAlive, `${hero.name}:${hero.type}`);
        }
        catch (error) {
            throw error;
        }
    }
    static async setAliveHeroes(heroes) {
        try {
            return await this.redis.sadd(this.battleHeroAlive, heroes.map(({ name, type }) => `${name}:${type}`));
        }
        catch (error) {
            throw error;
        }
    }
    static async getAliveHeroes() {
        try {
            return await this.redis.smembers(this.battleHeroAlive);
        }
        catch (error) {
            throw error;
        }
    }
    static async setAttackingHero(hero) {
        try {
            return await this.redis.sadd(this.battleHeroAttack, `${hero.name}:${hero.type}`);
        }
        catch (error) {
            throw error;
        }
    }
    static async getAttackingHeroes() {
        try {
            return await this.redis.smembers(this.battleHeroAttack);
        }
        catch (error) {
            throw error;
        }
    }
    static async setHero(hero) {
        try {
            const heroMap = new Map();
            heroMap.set("name", hero.name);
            heroMap.set("type", hero.type);
            heroMap.set("currentHitPoints", `${hero.stamina.hitPoints}`);
            heroMap.set("armor", this.getArmorString(hero.armor));
            heroMap.set("weapons", this.getWeaponString(hero.weapons));
            return await this.redis.hmset(`${this.heroPrefix}:${hero.name}`, heroMap);
        }
        catch (error) {
            throw error;
        }
    }
    static async updateHeroStat(hero) {
        try {
            return await this.redis.hmset(`${this.heroPrefix}:${hero.name}`, 'currentHitPoints', `${hero.stamina.hitPoints}`);
        }
        catch (error) {
            throw error;
        }
    }
    static async getHero(heroName) {
        try {
            return await this.redis.hgetall(`${this.heroPrefix}:${heroName}`);
        }
        catch (error) {
            throw error;
        }
    }
    static async setAliveMonsters(monsters) {
        try {
            const monsterList = monsters.map(({ id, type, stamina }) => `${id}:${type}:${stamina.hitPoints}`);
            await this.redis.del(this.battleMonsterAlive);
            return await this.redis.rpush(this.battleMonsterAlive, monsterList);
        }
        catch (error) {
            throw error;
        }
    }
    static async getAliveMonsters() {
        try {
            return await this.redis.lrange(this.battleMonsterAlive, 0, -1);
        }
        catch (error) {
            throw error;
        }
    }
    static disconnect() {
        try {
            return this.redis.disconnect();
        }
        catch (e) {
            throw e;
        }
    }
    // Armor: name!type!slot
    // look into string builder if javascript has one
    // private static getArmorString(armorList: Armor[]) {
    //     let armStr = "";
    //     armorList.forEach((armor, i) => {
    //         if (armorList.length - 1  === i) armStr + `${armor.name}!${armor.type}!${armor.slot}`
    //         else armStr + `${armor.name}!${armor.type}!${armor.slot}:`;
    //     });
    //     return armStr;
    // }
    // // Weapon: name!type
    // // look into string builder if javascript has one
    // private static getWeaponString(weapons: Weapon[]) {
    //     let weaponsStr = "";
    //     weapons.forEach((weapon, i) => {
    //         if (weapons.length - 1 === i) weaponsStr + `${weapon.name}!${weapon.type}`;
    //         else weaponsStr + `${weapon.name}!${weapon.type}:`;
    //     });
    //     return weaponsStr;
    // }
    // Armor: name:type:slot
    static getArmorString(armor) {
        return armor.map(({ name, type, slot }) => `${name}:${type}:${slot}`).toString();
    }
    // Weapon: name:type
    static getWeaponString(weapons) {
        return weapons.map(({ name, type }) => `${name}:${type}`).toString();
    }
}
exports.RedisInstance = RedisInstance;
RedisInstance.battlePrefix = "battle";
RedisInstance.heroPrefix = "hero";
RedisInstance.battleId = "battle:id";
RedisInstance.battleStatus = "battle:status";
RedisInstance.battleTurn = "battle:turn";
RedisInstance.battleRound = "battle:round";
RedisInstance.battleParticipants = "battle:hero:participants";
RedisInstance.battleHeroAlive = "battle:hero:alive";
RedisInstance.battleHeroAttack = "battle:hero:attack";
RedisInstance.battleMonsterAlive = "battle:monster:alive";
RedisInstance.redis = new ioredis_1.default({
    host: "127.0.0.1",
    port: 6379
});
