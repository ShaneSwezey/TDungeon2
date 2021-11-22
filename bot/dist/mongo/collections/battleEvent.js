"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BattleEventCollection = void 0;
class BattleEventCollection {
    constructor(tdungeon) {
        this.battleEventCollection = tdungeon.collection("BattleEvent");
    }
    async createNewBattleEvents(battleEvents) {
        try {
            return await this.battleEventCollection.insertMany(battleEvents);
        }
        catch (error) {
            throw error;
        }
    }
    async findBattleEvents(battleId) {
        try {
            const records = await this.battleEventCollection.find({ battleId }).toArray();
            return records.map(record => ({ ...record, _id: record._id.toString() }));
        }
        catch (error) {
            throw error;
        }
    }
}
exports.BattleEventCollection = BattleEventCollection;
