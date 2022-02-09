import { Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { NewBattleQueue } from "../../bullmq/queue";
import { Context } from "../../interface/context";
import { BattleGraphqlType } from "../types/battle";

@ObjectType()
class BattlePayload {
    @Field({ nullable: true })
    next?: string;

    @Field(() => [BattleGraphqlType])
    list: BattleGraphqlType[];
}

@Resolver()
export class BattleResolver {

    @Query(() => BattlePayload)
    public async battles(
        @Ctx() { mongo }: Context, 
        @Arg("next", { description: "next battle id", nullable: true }) next?: string
    ): Promise<BattlePayload> {
        try {
            return await mongo.battleCollection.getBattles(5, next);
        } catch(error) {
            console.error('[battles]', error);
            throw error;
        }
    }

    @Query(() => Boolean)
    public async currentBattle(@Ctx() { redis }: Context) {
        try {
            const battleId = await redis.getBattleId();
            return battleId ? true : false;
        } catch(error) {
            console.error('[currentBattle]', error);
            throw error;
        }
    }

    @Mutation(() => BattleGraphqlType)
    public async createBattle(@Ctx() { mongo, redis }: Context): Promise<BattleGraphqlType> {
        try {
            const battleId = await redis.getBattleId();

            if (battleId) throw new Error('Match already in progress!');

            const newBattle = await mongo.battleCollection.createNewBattle();

            console.log('newBattle:', newBattle);

            // drop in bullmq 
            await NewBattleQueue.add(`battle:${newBattle.id}`, { newBattle });

            return newBattle;
        } catch(error) {
            console.error('[createBattle]', error);
            throw error;
        }
    }
}