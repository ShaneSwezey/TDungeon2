// import { createNewHero } from "../../../game/creation/hero";
// import faker from 'faker';
import { HeroType } from "../../../game/hero";
import { MongoClient } from 'mongodb';
import { BattleCollection } from "../collections/battle";


const runTest = async () => {
    try {
        const client = new MongoClient("mongodb://127.0.0.1:27017");
        await client.connect();
        const db = client.db('tdungeon');
        
        const BattleCollectionDerp = new BattleCollection(db);
        const res = await BattleCollectionDerp.createNewBattle();
        const doc = await BattleCollectionDerp.findBattle(res.id);
        console.log('doc', doc);
    } catch(e) {
        throw e;
    }
}

runTest()
    .then()
    .catch(e => {
        console.error(e);
        throw e;
    })
    .finally(() => {
        process.exit(1)
    })

