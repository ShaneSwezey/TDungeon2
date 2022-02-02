"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TDungeonDB = void 0;
const mongodb_1 = require("mongodb");
const battle_1 = require("./battle");
const battleEvent_1 = require("./battleEvent");
const hero_1 = require("./hero");
const inventory_1 = require("./inventory");
class TDungeonDB {
    static async connect() {
        try {
            if (!this.mongoClient) {
                const mC = new mongodb_1.MongoClient("mongodb://127.0.0.1:27017");
                const db = mC.db("tdungeon");
                this.BattleCollection = new battle_1.BattleCollection(db);
                this.HeroCollection = new hero_1.HeroCollection(db);
                this.BattleEventCollection = new battleEvent_1.BattleEventCollection(db);
                this.InventoryCollection = new inventory_1.InventoryCollection(db);
                this.mongoClient = await mC.connect();
            }
            return true;
        }
        catch (error) {
            console.error('[connnect]', error);
            throw error;
        }
    }
    static async disconnect() {
        try {
            return await this.mongoClient.close();
        }
        catch (error) {
            console.error('[disconnect]', error);
            throw error;
        }
    }
}
exports.TDungeonDB = TDungeonDB;
