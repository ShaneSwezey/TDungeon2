import { Field, ID, ObjectType } from "type-graphql";

@ObjectType("Battle")
export class BattleType {
    @Field(() => ID)
    _id: string; 
}   