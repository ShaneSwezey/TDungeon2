import { Field, ID, Int, ObjectType } from "type-graphql";



@ObjectType("Armor")
export class ArmorType {

    @Field(() => ID, { nullable: true })
    id?: string;

    @Field()
    name: string;

    @Field()
    type: string;

    @Field()
    slot: string;

    @Field(() => Int)
    hitPoints: number;

    @Field({ nullable: true })
    rarity?: string;
    
    @Field({ nullable: true })
    description?: string;
}