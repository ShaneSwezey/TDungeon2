import { ResponseType } from "../enums/responseType";
import { heroFactory } from "../game/creation/hero";
import { TDungeonDB } from "../mongo/collections/index";
import { RedisInstance } from "../redis";


export const joinBattle = async (userName: string) => {
    try {
        const battleId = await RedisInstance.getBattleId();

        if (!battleId) return { type: ResponseType.IGNORE, text: "Battle not in session!" };

        const battleStatus = await RedisInstance.getBattleStatus();

        if (!battleStatus || battleStatus === "IN_SESSION") return { type: ResponseType.IGNORE, text: "Battle already in session!" };

        const heroRecord = await TDungeonDB.HeroCollection.findHeroByAttr(userName);

        if (!heroRecord) return { type: ResponseType.IGNORE, text: "User not found!" };

        const hero = heroFactory({
            ...heroRecord,
            id: heroRecord._id.toString(),
            armor: heroRecord.armor.map(({ name, type, slot }) => `${name}:${type}:${slot}`).toString(),
            weapons: heroRecord.weapons.map(({ name, type }) => `${name}:${type}`).toString(),
        });

        await RedisInstance.setAliveHero(hero);
        await RedisInstance.setHero(hero); 

        return { type: ResponseType.MESSAGE, text: `${userName} has joined the raid!` };
    } catch(error) {
        console.error('[joinRaid]', error);
        throw error;
    }
}