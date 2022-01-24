import { Field, ID, Int, ObjectType, registerEnumType } from "type-graphql";
import { IArmor } from '../../game/interfaces/armor';
import { ArmorSlot, ArmorType } from '../../game/enums/armor';
import { ItemRarity } from '../../game/enums/item';

registerEnumType(ArmorType, {
    name: "ArmorType",
});

registerEnumType(ArmorSlot, {
    name: "ArmorSlot"
});

registerEnumType(ItemRarity, {
    name: "ItemRarity"
});

@ObjectType("Armor")
export class ArmorGraphqlType implements IArmor {
   

    @Field(() => ID, { nullable: true })
    id?: string;

    @Field()
    name: string;

    @Field(() => ArmorType)
    type: ArmorType;

    @Field(() => ArmorSlot)
    slot: ArmorSlot;

    @Field(() => Int)
    hitPoints: number;

    @Field(() => ItemRarity)
    rarity: ItemRarity;

    @Field({ nullable: false })
    imgSrc: string;

    @Field({ nullable: true })
    crit?: number;

    @Field({ nullable: true })
    dodge?: number;

    @Field({ nullable: true })
    attackPower?: number;

    @Field({ nullable: true })
    block?: number;
    
    @Field({ nullable: true })
    description?: string;
}