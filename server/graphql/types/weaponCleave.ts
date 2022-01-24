import { Field, Int, ObjectType } from "type-graphql";
import { ICleave } from "../../game/interfaces/weapon";
import { WeaponDamageGraphqlType } from "./weaponDamage";

@ObjectType("Cleave")
export class WeaponCleaveGraphqlType implements ICleave {
    @Field(() => Int, { nullable: false })
    chance: number;
    
    @Field(() => WeaponDamageGraphqlType, { nullable: false })
    num: { low: number; high: number; };
}