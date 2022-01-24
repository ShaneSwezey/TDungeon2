"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinBattle = void 0;
const hero_1 = require("../game/hero");
const monster_1 = require("../game/monster");
const index_1 = require("../mongo/collections/index");
const redis_1 = require("../redis");
const response_1 = require("./enum/response");
const joinBattle = async (userName) => {
    try {
        const battleId = await redis_1.RedisInstance.getBattleId();
        if (!battleId)
            return { type: response_1.ResponseType.IGNORE, text: "Battle not in session!" };
        const battleStatus = await redis_1.RedisInstance.getBattleStatus();
        if (!battleStatus || battleStatus === "IN_SESSION")
            return { type: response_1.ResponseType.IGNORE, text: "Battle already in session!" };
        const heroRecord = await index_1.TDungeonDB.HeroCollection.findActiveHeroByName(userName);
        if (!heroRecord)
            return { type: response_1.ResponseType.IGNORE, text: "User not found!" };
        const hero = (0, hero_1.heroFactory)(heroRecord);
        // these redis calls should be turned into a transaction
        await redis_1.RedisInstance.setAliveHero(hero);
        await redis_1.RedisInstance.setHeroBattleParticipation(hero);
        await redis_1.RedisInstance.setHero(hero);
        const monster = (0, monster_1.createMonsters)(hero);
        await redis_1.RedisInstance.setAliveMonsters([monster]); // fix
        return { type: response_1.ResponseType.MESSAGE, text: `${userName} has joined the raid!` };
    }
    catch (error) {
        console.error('[joinRaid]', error);
        throw error;
    }
};
exports.joinBattle = joinBattle;
