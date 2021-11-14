import { Arg, Ctx, Query, Resolver } from "type-graphql";
import { Context } from "../../interface/context";
import { BattleEventType } from "../types/battleEvent";

@Resolver()
export class BattleEventResolver {

    @Query(() => [BattleEventType])
    public async battleEvents(@Arg("battleId") battleId: string, @Ctx() { battleEventCol }: Context): Promise<BattleEventType[]> {
        try {
            const battleEventRecords = await battleEventCol.findBattleEvents(battleId);
            return battleEventRecords;
        } catch(error) {
            console.error('[battleEvents]', error);
            throw error;
        }
    }
}