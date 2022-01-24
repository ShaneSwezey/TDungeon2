import { Field, Int, ObjectType } from "type-graphql";
import { IStamina } from "../../game/interfaces/stamina";

@ObjectType("Stamina")
export class StaminaGraphqlType implements IStamina {
    @Field(() => Int)
    hitPoints: number;

    @Field(() => Int)
    maxHitPoints: number;
}