import { MongoClient } from 'mongodb';

const mongoClient = new MongoClient("mongodb://127.0.0.1:27017"); // use env

const startClient = async () => {
    try {
        await mongoClient.connect();
        const tdungeondb = mongoClient.db('tdungeon');
        return tdungeondb;
    } catch(error) {
        throw error;
    }
}

export { startClient };