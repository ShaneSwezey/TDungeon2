import { Field, ID, Int, ObjectType } from "type-graphql";
import { IArmor } from "../../game/interfaces/armor";
import { IWeapon } from "../../game/interfaces/weapon";
import { IInventory } from "../../interface/inventory";
import { ArmorGraphqlType } from "./armor";
import { WeaponGraphqlType } from "./weapon";

@ObjectType("Inventory")
export class InventoryGraphqlType implements IInventory {
    @Field(() => ID)
    id: string;

    @Field({ nullable: false })
    heroId: string;

    @Field(() => Int, { nullable: false })
    gold: number;

    @Field(() => [ArmorGraphqlType], { nullable: false })
    armorInventory: IArmor[];
   
    @Field(() => [WeaponGraphqlType], { nullable: false })
    weaponInventory: IWeapon[];
}