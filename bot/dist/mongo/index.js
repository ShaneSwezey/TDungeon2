"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startClient = void 0;
const mongodb_1 = require("mongodb");
const mongoClient = new mongodb_1.MongoClient("mongodb://127.0.0.1:27017"); // use env
const startClient = async () => {
    try {
        await mongoClient.connect();
        const tdungeondb = mongoClient.db('tdungeon');
        return tdungeondb;
    }
    catch (error) {
        throw error;
    }
};
exports.startClient = startClient;
