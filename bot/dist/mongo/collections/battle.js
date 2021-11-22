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
            const date = new Date().toUTCString();
            const res = await this.battleCollection.insertOne({
                createdAt: date,
                updatedAt: date
            });
            return {
                id: res.insertedId.toString(),
                createdAt: date,
                updatedAt: date
            };
        }
        catch (error) {
            throw error;
        }
    }
    async findBattle(battleId) {
        try {
            const res = await this.battleCollection.findOne({ _id: new mongodb_1.ObjectId(battleId) });
            return res ? {
                id: res._id.toString(),
                createdAt: res.createdAt,
                updatedAt: res.updatedAt
            } : null;
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
    async getAllBattles() {
        try {
            return await this.battleCollection.find().toArray();
        }
        catch (error) {
            throw error;
        }
    }
}
exports.BattleCollection = BattleCollection;
