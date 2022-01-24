import { Field, ID, Int, ObjectType, registerEnumType } from "type-graphql";
import { HeroType } from "../../game/enums/hero";
import { IArmor } from "../../game/interfaces/armor";
import { IHero } from "../../game/interfaces/hero";
import { IStamina } from "../../game/interfaces/stamina";
import { IWeapon } from "../../game/interfaces/weapon";
import { ArmorGraphqlType } from "./armor";
import { StaminaGraphqlType } from "./stamina";
import { WeaponGraphqlType } from "./weapon";

registerEnumType(HeroType, {
    name: "HeroType"
});

@ObjectType("Hero")
export class HeroGraphqlType implements IHero {
    @Field(() => ID)
    id: string;
    
    @Field({ nullable: false })
    name: string;

    @Field(() => StaminaGraphqlType, { nullable: false })
    stamina: IStamina;

    @Field(() => HeroType, { nullable: false })
    type: HeroType;

    @Field(() => Int,{ nullable: false })
    crit: number;

    @Field(() => Int, { nullable: false })
    dodge: number;

    @Field(() => Int, { nullable: false })
    block: number;

    @Field(() => Int, { nullable: false })
    attackPower: number;

    @Field(() => [ArmorGraphqlType], { nullable: false })
    armor: IArmor[];

    @Field(() => [WeaponGraphqlType], { nullable: false })
    weapons: IWeapon[];

    @Field({ nullable: false })
    active: boolean;
}