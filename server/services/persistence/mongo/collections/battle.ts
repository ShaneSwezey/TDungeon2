import { Db, Collection, ObjectId } from 'mongodb'; 

interface Battle {
    _id: ObjectId;
    createdAt: String;
    updatedAt: String;
}

export class BattleCollection {

    private battleCollection: Collection<Battle>;

    constructor(tdungeon: Db) {
        this.battleCollection = tdungeon.collection<Battle>("Battle");
    }

    public async createNewBattle() {
        try {
            const date = new Date().toUTCString();
            const res = await this.battleCollection.insertOne({ 
                createdAt: date, 
                updatedAt: date 
            });
            return {
                id: res.insertedId.toString(),
                createdAt: date,
                updatedAt: date
            };
        } catch(error) {
            throw error;
        }
    }

    public async findBattle(battleId: string) {
        try {
            const res = await this.battleCollection.findOne({ _id: new ObjectId(battleId) });
            return res ? { 
                id: res._id.toString(), 
                createdAt: res.createdAt, 
                updatedAt: res.updatedAt
            } : null;
        } catch(error) {
            throw error;
        }
    }
}