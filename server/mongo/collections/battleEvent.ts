import { Db, Collection, ObjectId } from 'mongodb'; 
import { IBattleEvent } from '../../game/interfaces/battleEvent';

interface IBattleRecord extends IBattleEvent {
    _id: ObjectId;
}

export class BattleEventCollection {

    private battleEventCollection: Collection<IBattleRecord>;

    constructor(tdungeon: Db) {
        this.battleEventCollection = tdungeon.collection<IBattleRecord>("BattleEvent");
    }

    public async createNewBattleEvents(battleEvents: IBattleEvent[]) {
        try {
            return await this.battleEventCollection.insertMany(battleEvents)
        } catch(error) {
            throw error;
        }
    }

    public async findBattleEvents(battleId: string) {
        try {
            const battleEventRecords = await this.battleEventCollection.find({ battleId }).toArray();
            return battleEventRecords.map(battleEventRecord => ({
                id: battleEventRecord._id.toString(),
                battleId: battleEventRecord.battleId,
                turn: battleEventRecord.turn,
                round: battleEventRecord.round,
                iteration: battleEventRecord.iteration,
                initiatorType: battleEventRecord.initiatorType,
                initiator: battleEventRecord.initiator,
                initiatorAction: battleEventRecord.initiatorAction,
                receiverType: battleEventRecord.receiverType,
                receiver: battleEventRecord.receiver,
                receiverAction: battleEventRecord.receiverAction
            }));
        } catch(error) {
            throw error;
        }
    }


}