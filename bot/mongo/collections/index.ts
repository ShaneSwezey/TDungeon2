import { MongoClient } from 'mongodb';
import { getMongoConnectionString } from '../connection';
import { BattleCollection } from './battle';
import { BattleEventCollection } from './battleEvent';
import { HeroCollection } from './hero';
import { InventoryCollection } from './inventory';

export class TDungeonDB {

    private static mongoClient: MongoClient;
    public static BattleCollection: BattleCollection;
    public static BattleEventCollection: BattleEventCollection;
    public static HeroCollection: HeroCollection;
    public static InventoryCollection: InventoryCollection;

    public static async connect() {
        try {
            if (!this.mongoClient) {
                const mC = new MongoClient(getMongoConnectionString());
                const db = mC.db("tdungeon");
                this.BattleCollection = new BattleCollection(db);
                this.HeroCollection = new HeroCollection(db);
                this.BattleEventCollection = new BattleEventCollection(db);
                this.InventoryCollection = new InventoryCollection(db);
                this.mongoClient = await mC.connect();
            }
            return true;
        } catch(error) {
            console.error('[connnect]', error);
            throw error;
        }
    }

    public static async disconnect() {
        try {
            return await this.mongoClient.close();
        } catch(error) {
            console.error('[disconnect]', error);
            throw error;
        }
    }

}