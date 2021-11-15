import { Ctx, Query, Resolver } from "type-graphql";
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
}