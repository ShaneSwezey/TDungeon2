import { Field, Int, ObjectType } from "type-graphql";

@ObjectType("WeaponDamage")
export class WeaponDamageGraphqlType {
    @Field(() => Int, { nullable: false })
    low: number;

    @Field(() => Int, { nullable: false })
    high: number;
}