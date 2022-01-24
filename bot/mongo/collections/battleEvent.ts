import { Db, Collection, ObjectId } from 'mongodb'; 
import { IBattleEvent } from '../../game/interfaces/battleEvent';

interface IBattleEventRecord extends IBattleEvent {
    _id?: ObjectId;
}

export class BattleEventCollection {

    private battleEventCollection: Collection<IBattleEventRecord>;

    constructor(tdungeon: Db) {
        this.battleEventCollection = tdungeon.collection<IBattleEventRecord>("BattleEvent");
    }

    public async createNewBattleEvents(battleEvents: IBattleEvent[]) {
        try {
            return await this.battleEventCollection.insertMany(battleEvents)
        } catch(error) {
            throw error;
        }
    }
}