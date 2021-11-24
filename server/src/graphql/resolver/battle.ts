import { Ctx, Mutation, Query, Resolver } from "type-graphql";
import { NewBattleQueue } from "../../../bullmq/queue";
import { Context } from "../../interface/context";
import { BattleType } from "../types/battle";

@Resolver()
export class BattleResolver {

    @Query(() => [BattleType])
    public async battles(@Ctx() { battleCol }: Context): Promise<BattleType[]> {
        try {
            const battleRecords = await battleCol.getAllBattles();
            const battleTypes = battleRecords.map(battleRecord => ({ 
                ...battleRecord,
                _id: battleRecord._id.toString(),
             }))
            return battleTypes;
        } catch(error) {
            console.error('[battles]', error);
            throw error;
        }
    }

    @Mutation(() => BattleType)
    public async createBattle(@Ctx() { battleCol, redis }: Context): Promise<BattleType> {
        try {
            const battleId = await redis.getBattleId();

            if (battleId) throw new Error('Match already in progress!');

            const newBattleRecord = await battleCol.createNewBattle();

            // drop in bullmq 
            await NewBattleQueue.add(`battle:${newBattleRecord.id}`, { newBattleRecord });

            return {
                ...newBattleRecord,
                _id: newBattleRecord.id,
            }
        } catch(error) {
            console.error('[createBattle]', error);
            throw error;
        }
    }
}