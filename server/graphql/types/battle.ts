import { Field, ID, ObjectType } from "type-graphql";

@ObjectType("Battle")
export class BattleGraphqlType {
    @Field(() => ID)
    id: string; 

    @Field({ nullable: true })
    winner?: string;

    @Field({ nullable: false })
    createdAt: Date;
}   