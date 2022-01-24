import { AvailableHeroTypes, HeroType } from "../game/enums/hero";
import { heroFactory } from "../game/hero";
import { TDungeonDB } from "../mongo/collections/index";
import { RedisInstance } from "../redis";
import { ResponseType } from "./enum/response";

export const getHeroTypes = () => ({ type: ResponseType.MESSAGE, text: Object.values(AvailableHeroTypes).toString().replace(/,/g, ', ') });

export const createHero = async (creationCommand: string, name: string) => {
    try {
        const type = getHeroType(creationCommand);

        const hero = await TDungeonDB.HeroCollection.findHeroByType(name, type);

        if (hero) return { type: ResponseType.IGNORE, text: `${name} already has a ${type} hero!`};

        const newHero = heroFactory({ name, type });

        await TDungeonDB.HeroCollection.createNewHero(newHero);

        return { type: ResponseType.MESSAGE, text: `${newHero.type} has been created!` };
    } catch(error) {
        console.error('[createHero]', error);
        throw error;
    }
};

export const setHeroAttackAction = async (userName: string) => {
    try {
        const battleId = await RedisInstance.getBattleId();

        if (!battleId) return { type: ResponseType.IGNORE, text: "Battle not in session!" };

        const redisHero = await RedisInstance.getHero(userName);

        if (!redisHero) return { type: ResponseType.MESSAGE, text: "Hero not found!" };

        if (parseInt(redisHero.hitPoints) <= 0) return { type: ResponseType.MESSAGE, text: `${userName} is dead!` };

        const hero = heroFactory(redisHero);

        await RedisInstance.setAttackingHero(hero);

        return { type: ResponseType.MESSAGE, text: `${redisHero.name} attack set!` };
    } catch(error) {
        console.error('[setHeroAttackAction]', error);
        throw error;
    }
}

const getHeroType = (creationCommand: string) => {
    const creationArray = creationCommand.split(" ");
    switch(creationArray[1]) {
        case HeroType.WARRIOR:
            return HeroType.WARRIOR;
        case HeroType.ROGUE:
            return HeroType.ROGUE;
        // case HeroType.Caster:
        //     return HeroType.Caster;
        default:
            return HeroType.WARRIOR;
    }
}