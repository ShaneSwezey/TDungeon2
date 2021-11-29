import { ResponseType } from "../enums/responseType";
import { heroFactory } from "../game/creation/hero";
import { TDungeonDB } from "../mongo/collections/index";
import { RedisInstance } from "../redis";

enum HeroType {
    Melee = "Melee",
    Ranged = "Ranged"
}

export const getHeroTypes = () => ({ type: ResponseType.MESSAGE, text: Object.values(HeroType).toString().replace(/,/g, ', ') });

export const createHero = async (creationCommand: string, name: string) => {
    try {
        const type = getHeroType(creationCommand);

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

        if (parseInt(redisHero.currentHitPoints) <= 0) return { type: ResponseType.MESSAGE, text: `${userName} is dead!` };

        const hero = heroFactory(redisHero as any); // fix

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
        case HeroType.Melee:
            return HeroType.Melee;
        case HeroType.Ranged:
            return HeroType.Ranged;
        // case HeroType.Caster:
        //     return HeroType.Caster;
        default:
            return HeroType.Melee;
    }
}