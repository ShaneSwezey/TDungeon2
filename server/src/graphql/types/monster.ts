import { Field, ID, ObjectType } from "type-graphql";
import { MonsterAttackType } from "./monsterAttack";
import { StaminaType } from "./stamina";


@ObjectType("Monster")
export class MonsterType {

    @Field(() => ID)
    id?: string;

    @Field(() => StaminaType, { nullable: false })
    stamina: StaminaType

    @Field({ nullable: false})
    type: string;

    @Field(() => MonsterAttackType, { nullable: false })
    attack: MonsterAttackType
}