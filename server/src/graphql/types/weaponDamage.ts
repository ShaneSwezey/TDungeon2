import { Field, Int, ObjectType } from "type-graphql";


@ObjectType("WeaponDamage")
export class WeaponDamageType {

    @Field(() => Int)
    low: number;

    @Field(() => Int)
    high: number;
}