"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startClient = void 0;
const mongodb_1 = require("mongodb");
const connection_1 = require("./connection");
const mongoClient = new mongodb_1.MongoClient((0, connection_1.getMongoConnectionString)()); // use env
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
