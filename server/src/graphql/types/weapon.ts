import { Field, ID, ObjectType } from "type-graphql";
import { WeaponDamageType } from "./weaponDamage";

@ObjectType("Weapon")
export class WeaponType {

    @Field(() => ID, { nullable: true })
    id?: string;

    @Field()
    name: string;

    @Field()
    type: string;

    @Field(() => WeaponDamageType, { nullable: false })
    damage: WeaponDamageType;

    @Field({ nullable: true })
    description?: string;
}