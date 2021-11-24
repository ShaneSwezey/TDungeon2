"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setHeroAttackAction = exports.createHero = exports.getHeroTypes = void 0;
const responseType_1 = require("../enums/responseType");
const hero_1 = require("../game/creation/hero");
const index_1 = require("../mongo/collections/index");
const redis_1 = require("../redis");
var HeroType;
(function (HeroType) {
    HeroType["Melee"] = "Melee";
    HeroType["Ranged"] = "Ranged";
})(HeroType || (HeroType = {}));
const getHeroTypes = () => ({ type: responseType_1.ResponseType.MESSAGE, text: Object.values(HeroType).toString().replace(/,/g, ', ') });
exports.getHeroTypes = getHeroTypes;
const createHero = async (creationCommand, name) => {
    try {
        const type = getHeroType(creationCommand);
        const newHero = hero_1.heroFactory({ name, type });
        await index_1.TDungeonDB.HeroCollection.createNewHero(newHero);
        return { type: responseType_1.ResponseType.MESSAGE, text: `${newHero.type} has been created!` };
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
            return { type: responseType_1.ResponseType.IGNORE, text: "Battle not in session!" };
        const redisHero = await redis_1.RedisInstance.getHero(userName);
        if (!redisHero)
            return { type: responseType_1.ResponseType.IGNORE, text: "Hero not found!" };
        const hero = hero_1.heroFactory(redisHero); // fix
        await redis_1.RedisInstance.setAttackingHero(hero);
        return { type: responseType_1.ResponseType.MESSAGE, text: `${redisHero.name} attack set!` };
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
        case HeroType.Melee:
            return HeroType.Melee;
        case HeroType.Ranged:
            return HeroType.Ranged;
        // case HeroType.Caster:
        //     return HeroType.Caster;
        default:
            return HeroType.Melee;
    }
};
