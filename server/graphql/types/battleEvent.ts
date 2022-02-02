import { Field, ID, Int, ObjectType } from "type-graphql";
import { IBattleEvent, ICharacterAction } from "../../game/interfaces/battleEvent";
import { CharacterActionGraphqlType } from "./characterAction";

@ObjectType("BattleEvent")
export class BattleEventGraphqlType implements IBattleEvent {
    @Field(() => ID)
    id: string;

    @Field({ nullable: false })
    battleId: string;

    @Field(() => Int, { nullable: false })
    round: number;

    @Field(() => Int, { nullable: false })
    iteration: number;

    @Field({ nullable: false })
    turn: string;
    
    @Field(() => CharacterActionGraphqlType, { nullable: false })
    initiator: ICharacterAction;

    @Field(() => CharacterActionGraphqlType, { nullable: false })
    receiver: ICharacterAction;
}