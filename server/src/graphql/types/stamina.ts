import { Field, Int, ObjectType } from "type-graphql";

@ObjectType("Stamina")
export class StaminaType {
    @Field(() => Int)
    hitPoints: number;

    @Field(() => Int)
    maxHitPoints: number;
}