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
            const date = new Date().toUTCString();
            const res = await this.heroCollection.insertOne({
                name: hero.name,
                type: hero.type,
                armor: hero.armor.map(({ name, type, slot }) => ({ name, type, slot })),
                weapons: hero.weapons.map(({ name, type }) => ({ name, type })),
                createdAt: date,
                updatedAt: date,
            });
            return true;
        }
        catch (error) {
            throw error;
        }
    }
    async createNewHeroes(heroes) {
        try {
            const date = new Date().toUTCString();
            const res = await this.heroCollection.insertMany(heroes.map(hero => ({
                name: hero.name,
                type: hero.type,
                armor: hero.armor.map(({ name, type, slot }) => ({ name, type, slot })),
                weapons: hero.weapons.map(({ name, type }) => ({ name, type })),
                createdAt: date,
                updatedAt: date,
            })));
            return true;
        }
        catch (error) {
            throw error;
        }
    }
    async findHeroById(id) {
        try {
            const res = await this.heroCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
            return res;
        }
        catch (error) {
            throw error;
        }
    }
    async findHeroByAttr(name, type) {
        try {
            const res = await this.heroCollection.findOne({ name });
            return res;
        }
        catch (error) {
            throw error;
        }
    }
    async getAllHeroes() {
        try {
            return await this.heroCollection.find().toArray();
        }
        catch (error) {
            throw error;
        }
    }
}
exports.HeroCollection = HeroCollection;
