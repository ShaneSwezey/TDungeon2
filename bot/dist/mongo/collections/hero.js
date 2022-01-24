"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroCollection = void 0;
const mongodb_1 = require("mongodb");
class HeroCollection {
    constructor(tdungeon) {
        this.heroCollection = tdungeon.collection("Hero");
    }
    async createNewHero(hero) {
        try {
            const res = await this.heroCollection.insertOne({
                name: hero.name,
                type: hero.type,
                armor: this.createArmorRecords(hero.armor),
                weapons: this.createWeaponRecords(hero.weapons),
                active: true
            });
            return res;
        }
        catch (error) {
            throw error;
        }
    }
    async findHeroById(id) {
        try {
            const heroRecord = await this.heroCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
            return heroRecord ? this.unWrapHeroRecord(heroRecord) : null;
        }
        catch (error) {
            throw error;
        }
    }
    async findHeroByType(name, type) {
        try {
            const heroRecord = await this.heroCollection.findOne({ name, type });
            return heroRecord ? this.unWrapHeroRecord(heroRecord) : null;
        }
        catch (error) {
            throw error;
        }
    }
    async findActiveHeroByName(name) {
        try {
            const heroRecord = await this.heroCollection.findOne({ name, active: true });
            return heroRecord ? this.unWrapHeroRecord(heroRecord) : null;
        }
        catch (error) {
            throw error;
        }
    }
    unWrapHeroRecord(heroRecord) {
        return {
            id: heroRecord._id.toString(),
            name: heroRecord.name,
            type: heroRecord.type,
            active: heroRecord.active,
            armor: heroRecord.armor,
            weapons: heroRecord.weapons
        };
    }
    createWeaponRecords(weapons) {
        return weapons.map(({ name, type }) => ({ name, type }));
    }
    createArmorRecords(weapons) {
        return weapons.map(({ name, type, slot }) => ({ name, type, slot }));
    }
}
exports.HeroCollection = HeroCollection;
