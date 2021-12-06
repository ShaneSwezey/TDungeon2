import { createUnionType, Field, ID, Int, ObjectType } from "type-graphql";
import { WeaponType } from "./weapon";
import { ArmorType } from "./armor";
import { StaminaType } from "./stamina";

const ArmorWeaponTypeUnion = createUnionType({
    name: "Item",
    types: () => [ArmorType, WeaponType],
    resolveType: value => {
        // @ts-ignore
        if (value.slot) return ArmorType;
        else return WeaponType;
    }
});


@ObjectType("Hero")
export class HeroType {

    @Field(() => ID)
    id?: string;

    @Field(() => Int)
    gold: number;
    
    @Field()
    name: string;

    @Field(() => StaminaType, { nullable: false })
    stamina: StaminaType;

    // fix to enum
    @Field({ nullable: false })
    type: string;

    @Field(() => [ArmorType])
    armor: ArmorType[];

    @Field(() => [WeaponType])
    weapons: WeaponType[];

    @Field(() => [ArmorWeaponTypeUnion], { nullable: true })
    inventory?: (ArmorType | WeaponType)[]
}