import { Field, Float, Int, ObjectType } from "type-graphql";
import { ICrit } from "../../game/interfaces/weapon";

@ObjectType("WeaponCrit")
export class WeaponCritGraphqlType implements ICrit {
    
    @Field(() => Int, { nullable: false })
    chance: number;
    
    @Field(() => Float, { nullable: false })
    multiplier: number;
}