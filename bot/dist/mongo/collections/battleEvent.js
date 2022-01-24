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
}
exports.BattleEventCollection = BattleEventCollection;
