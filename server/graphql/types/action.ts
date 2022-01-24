import { Field, Int, ObjectType, registerEnumType } from "type-graphql";
import { Event } from "../../game/enums/event";
import { IAction } from "../../game/interfaces/action";
import { IWeapon } from "../../game/interfaces/weapon";
import { WeaponGraphqlType } from "./weapon";

registerEnumType(Event, {
    name: "Event"
});

@ObjectType("Action")
export class ActionGraphqlType implements IAction {
    @Field(() => [Event], { nullable: false })
    type: Event[];

    @Field(() => Int, { nullable: true })
    value?: number;

    @Field({ nullable: true })
    isCrit?: boolean;

    @Field(() => WeaponGraphqlType, { nullable: true })
    weapon?: IWeapon;
}