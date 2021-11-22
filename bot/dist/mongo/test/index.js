"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { createNewHero } from "../../../game/creation/hero";
// import faker from 'faker';
const mongodb_1 = require("mongodb");
const battle_1 = require("../collections/battle");
const runTest = async () => {
    try {
        const client = new mongodb_1.MongoClient("mongodb://127.0.0.1:27017");
        await client.connect();
        const db = client.db('tdungeon');
        const BattleCollectionDerp = new battle_1.BattleCollection(db);
        const res = await BattleCollectionDerp.createNewBattle();
        const doc = await BattleCollectionDerp.findBattle(res.id);
        console.log('doc', doc);
    }
    catch (e) {
        throw e;
    }
};
runTest()
    .then()
    .catch(e => {
    console.error(e);
    throw e;
})
    .finally(() => {
    process.exit(1);
});
