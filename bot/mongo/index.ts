import { MongoClient } from 'mongodb';
import { getMongoConnectionString } from './connection';

const mongoClient = new MongoClient(getMongoConnectionString()); // use env

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