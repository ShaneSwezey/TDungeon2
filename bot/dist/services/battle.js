"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinBattle = void 0;
const responseType_1 = require("../enums/responseType");
const hero_1 = require("../game/creation/hero");
const creation_1 = require("../game/utils/creation");
const index_1 = require("../mongo/collections/index");
const redis_1 = require("../redis");
const joinBattle = async (userName) => {
    try {
        const battleId = await redis_1.RedisInstance.getBattleId();
        if (!battleId)
            return { type: responseType_1.ResponseType.IGNORE, text: "Battle not in session!" };
        const battleStatus = await redis_1.RedisInstance.getBattleStatus();
        if (!battleStatus || battleStatus === "IN_SESSION")
            return { type: responseType_1.ResponseType.IGNORE, text: "Battle already in session!" };
        const heroRecord = await index_1.TDungeonDB.HeroCollection.findHeroByAttr(userName);
        if (!heroRecord)
            return { type: responseType_1.ResponseType.IGNORE, text: "User not found!" };
        const hero = hero_1.heroFactory({
            ...heroRecord,
            id: heroRecord._id.toString(),
            armor: heroRecord.armor.map(({ name, type, slot }) => `${name}:${type}:${slot}`).toString(),
            weapons: heroRecord.weapons.map(({ name, type }) => `${name}:${type}`).toString(),
        });
        await redis_1.RedisInstance.setAliveHero(hero);
        await redis_1.RedisInstance.setHero(hero);
        const monsters = creation_1.createMonsters(1, 1);
        await redis_1.RedisInstance.setAliveMonsters(monsters); // fix
        return { type: responseType_1.ResponseType.MESSAGE, text: `${userName} has joined the raid!` };
    }
    catch (error) {
        console.error('[joinRaid]', error);
        throw error;
    }
};
exports.joinBattle = joinBattle;
