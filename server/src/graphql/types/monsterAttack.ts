import { Field, Int, ObjectType } from "type-graphql";


@ObjectType("MonsterAttack")
export class MonsterAttackType {

    @Field(() => Int)
    low: number;

    @Field(() => Int)
    high: number;

    @Field(() => Int)
    attackPower: number;

    @Field()
    type: string;
}