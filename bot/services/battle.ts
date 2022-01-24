import { heroFactory } from "../game/hero";
import { createMonsters } from "../game/monster";
import { TDungeonDB } from "../mongo/collections/index";
import { RedisInstance } from "../redis";
import { ResponseType } from "./enum/response";

export const joinBattle = async (userName: string) => {
    try {
        const battleId = await RedisInstance.getBattleId();

        if (!battleId) return { type: ResponseType.IGNORE, text: "Battle not in session!" };

        const battleStatus = await RedisInstance.getBattleStatus();

        if (!battleStatus || battleStatus === "IN_SESSION") return { type: ResponseType.IGNORE, text: "Battle already in session!" };

        const heroRecord = await TDungeonDB.HeroCollection.findActiveHeroByName(userName);

        if (!heroRecord) return { type: ResponseType.IGNORE, text: "User not found!" };

        const hero = heroFactory(heroRecord);

        // these redis calls should be turned into a transaction
        await RedisInstance.setAliveHero(hero);
        await RedisInstance.setHeroBattleParticipation(hero);
        await RedisInstance.setHero(hero); 

        const monster = createMonsters(hero);
        await RedisInstance.setAliveMonsters([monster]); // fix

        return { type: ResponseType.MESSAGE, text: `${userName} has joined the raid!` };
    } catch(error) {
        console.error('[joinRaid]', error);
        throw error;
    }
}