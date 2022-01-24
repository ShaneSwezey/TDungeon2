import { Field, ID, Int, ObjectType, registerEnumType } from "type-graphql";
import { ItemRarity } from "../../game/enums/item";
import { WeaponType } from "../../game/enums/weapon";
import { ICleave, ICrit, IFlurry, IWeapon } from "../../game/interfaces/weapon";
import { WeaponCleaveGraphqlType } from "./weaponCleave";
import { WeaponCritGraphqlType } from "./weaponCrit";
import { WeaponDamageGraphqlType } from "./weaponDamage";
import { WeaponFlurryGraphqlType } from "./weaponFlurry";

registerEnumType(WeaponType, {
    name: "WeaponType"
})

@ObjectType("Weapon")
export class WeaponGraphqlType implements IWeapon {
    
    @Field(() => ID)
    id: string;

    @Field({ nullable: false })
    name: string;

    @Field(() => WeaponType, { nullable: false })
    type: WeaponType;

    @Field(() => WeaponDamageGraphqlType, { nullable: false })
    damage: WeaponDamageGraphqlType;
    
    @Field(() => ItemRarity,{ nullable: false })
    rarity: ItemRarity; 

    @Field(() => WeaponCritGraphqlType, { nullable: false })
    crit: ICrit;

    @Field({ nullable: false })
    imgSrc: string;

    @Field(() => Int, { nullable: true })
    attackPower?: number;

    @Field(() => WeaponCleaveGraphqlType, { nullable: true })
    cleave?: ICleave;

    @Field(() => WeaponFlurryGraphqlType, { nullable: true })
    flurry?: IFlurry;

    @Field({ nullable: true })
    description?: string;
}