"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setHeroAttackAction = exports.createHero = exports.getHeroTypes = void 0;
const hero_1 = require("../game/enums/hero");
const hero_2 = require("../game/hero");
const index_1 = require("../mongo/collections/index");
const redis_1 = require("../redis");
const response_1 = require("./enum/response");
const getHeroTypes = () => ({ type: response_1.ResponseType.MESSAGE, text: Object.values(hero_1.AvailableHeroTypes).toString().replace(/,/g, ', ') });
exports.getHeroTypes = getHeroTypes;
const createHero = async (creationCommand, name) => {
    try {
        const type = getHeroType(creationCommand);
        const hero = await index_1.TDungeonDB.HeroCollection.findHeroByType(name, type);
        if (hero)
            return { type: response_1.ResponseType.IGNORE, text: `${name} already has a ${type} hero!` };
        const newHero = (0, hero_2.heroFactory)({ name, type });
        await index_1.TDungeonDB.HeroCollection.createNewHero(newHero);
        return { type: response_1.ResponseType.MESSAGE, text: `${newHero.type} has been created!` };
    }
    catch (error) {
        console.error('[createHero]', error);
        throw error;
    }
};
exports.createHero = createHero;
const setHeroAttackAction = async (userName) => {
    try {
        const battleId = await redis_1.RedisInstance.getBattleId();
        if (!battleId)
            return { type: response_1.ResponseType.IGNORE, text: "Battle not in session!" };
        const redisHero = await redis_1.RedisInstance.getHero(userName);
        if (!redisHero)
            return { type: response_1.ResponseType.MESSAGE, text: "Hero not found!" };
        if (parseInt(redisHero.hitPoints) <= 0)
            return { type: response_1.ResponseType.MESSAGE, text: `${userName} is dead!` };
        const hero = (0, hero_2.heroFactory)(redisHero);
        await redis_1.RedisInstance.setAttackingHero(hero);
        return { type: response_1.ResponseType.MESSAGE, text: `${redisHero.name} attack set!` };
    }
    catch (error) {
        console.error('[setHeroAttackAction]', error);
        throw error;
    }
};
exports.setHeroAttackAction = setHeroAttackAction;
const getHeroType = (creationCommand) => {
    const creationArray = creationCommand.split(" ");
    switch (creationArray[1]) {
        case hero_1.HeroType.WARRIOR:
            return hero_1.HeroType.WARRIOR;
        case hero_1.HeroType.ROGUE:
            return hero_1.HeroType.ROGUE;
        // case HeroType.Caster:
        //     return HeroType.Caster;
        default:
            return hero_1.HeroType.WARRIOR;
    }
};
