import { Db, Collection, ObjectId } from 'mongodb'; 

export interface IBattleRecord {
    _id: ObjectId;
    winner?: string;
}

export interface WinnerArgs {
    winner: string;
    alive: Object[];
}

export class BattleCollection {

    private battleCollection: Collection<IBattleRecord>;

    constructor(tdungeon: Db) {
        this.battleCollection = tdungeon.collection<IBattleRecord>("Battle");
    }

    public async createNewBattle() {
        try {
            const res = await this.battleCollection.insertOne({});
            return {
                id: res.insertedId.toString(),
                createdAt: res.insertedId.getTimestamp(),
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
                createdAt: res._id.getTimestamp()
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

    // key set pagination
    public async getBattles(limit: number, next?: string) {
        try {
            let battleRecords: IBattleRecord[];

            if (next) {
                battleRecords = await this.battleCollection.find({
                        _id: { $lt: new ObjectId(next) }
                    })
                    .sort({ _id: -1 })
                    .limit(limit)
                    .toArray();
            } else {
                battleRecords = await this.battleCollection.find()
                    .sort({ _id: -1 })
                    .limit(limit)
                    .toArray();
            }
            
            return {
                next: battleRecords.length ? battleRecords[battleRecords.length - 1]._id.toString() : null,
                list: battleRecords.map(battleRecord => ({
                    id: battleRecord._id.toString(),
                    winner: battleRecord.winner,
                    createdAt: battleRecord._id.getTimestamp(),
                }))
            }
        } catch(error) {
            throw error;
        }
    }
}