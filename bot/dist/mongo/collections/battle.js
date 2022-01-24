"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BattleCollection = void 0;
const mongodb_1 = require("mongodb");
class BattleCollection {
    constructor(tdungeon) {
        this.battleCollection = tdungeon.collection("Battle");
    }
    async createNewBattle() {
        try {
            const res = await this.battleCollection.insertOne({});
            return {
                id: res.insertedId.toString(),
            };
        }
        catch (error) {
            throw error;
        }
    }
    async updateBattle(battleId, { winner, alive }) {
        try {
            return await this.battleCollection.updateOne({
                _id: new mongodb_1.ObjectId(battleId)
            }, {
                $set: {
                    winner: winner,
                    alive: alive,
                }
            });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.BattleCollection = BattleCollection;
