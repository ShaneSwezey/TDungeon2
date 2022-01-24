import { Arg, Ctx, Query, Resolver, ArgsType, Field } from "type-graphql";
import { Context } from "../../interface/context";
import { BattleEventGraphqlType } from "../types/battleEvent";

@Resolver()
export class BattleEventResolver {

    @Query(() => [BattleEventGraphqlType])
    public async battleEvents(@Arg("battleId") battleId: string, @Ctx() { mongo }: Context): Promise<BattleEventGraphqlType[]> {
        try {
            return await mongo.battleEventCollection.findBattleEvents(battleId);
        } catch(error) {
            console.error('[battleEvents]', error);
            throw error;
        }
    }
}