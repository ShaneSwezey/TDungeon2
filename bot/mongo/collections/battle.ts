import { Db, Collection, ObjectId } from 'mongodb'; 

interface Battle {
    _id: ObjectId;
    winner?: string;
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
            const res = await this.battleCollection.insertOne({});
            return {
                id: res.insertedId.toString(),
            };
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
}