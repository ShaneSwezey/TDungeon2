import { Db, Collection, ObjectId } from 'mongodb'; 

interface Battle {
    _id: ObjectId;
    winner?: string;
    createdAt: string;
    updatedAt: string;
}

interface WinnerArgs {
    winner: string;
    alive: Object[];
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

    public async updateBattle(battleId: string, { winner, alive }: WinnerArgs) {
        try {
            return await this.battleCollection.updateOne(
                {
                    _id: new ObjectId(battleId)
                },
                {
                    $set: {
                        winner: winner,
                        alive: alive,
                    }
                }
            );
        } catch(error) {
            throw error;
        }
    }

    public async getAllBattles() {
        try {
            return await this.battleCollection.find().toArray();
        } catch(error) {
            throw error;
        }
    }
}