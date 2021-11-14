import { Field, ID, ObjectType } from "type-graphql";
import { ArmorType } from "./armor";
import { StaminaType } from "./stamina";
import { WeaponType } from "./weapon";


@ObjectType()
export class HeroAttackType {
    @Field(() => ID)
    id: string;

    @Field()
    name: string;

    @Field()
    type: string;

    @Field(() => StaminaType)
    stamina: StaminaType;

    @Field(() => WeaponType)
    weapon: WeaponType;

    @Field(() => [ArmorType])
    armor: ArmorType[];
}