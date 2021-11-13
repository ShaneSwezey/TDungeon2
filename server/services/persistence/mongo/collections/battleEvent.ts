import { Db, Collection, ObjectId } from 'mongodb'; 

interface BattleEvent {
    _id: ObjectId;
    battleId: string;
    round: number;
    iteration: number;
    event: Object;
    createdAt: string;
    updatedAt: string;
}

interface actionEvent {
    battleId: string;
    round: number;
    iteration: number;
    event: Object;
    createdAt: string;
    updatedAt: string;
}

export class BattleEventCollection {

    private battleEventCollection: Collection<BattleEvent>;

    constructor(tdungeon: Db) {
        this.battleEventCollection = tdungeon.collection<BattleEvent>("BattleEvent");
    }

    public async createNewBattleEvents(battleEvents: actionEvent[]) {
        try {
            return await this.battleEventCollection.insertMany(battleEvents)
        } catch(error) {
            throw error;
        }
    }

    public async findBattle(battleId: string) {
        try {
            
        } catch(error) {
            throw error;
        }
    }
}