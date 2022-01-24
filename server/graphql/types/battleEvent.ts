import { createUnionType, Field, ID, Int, ObjectType, registerEnumType } from "type-graphql";
import { EventCharacter } from "../../game/enums/character";
import { HeroType } from "../../game/enums/hero";
import { IAction } from "../../game/interfaces/action";
import { IBattleEvent } from "../../game/interfaces/battleEvent";
import { Character } from "../../game/types/character";
import { ActionGraphqlType } from "./action";
import { HeroGraphqlType } from "./hero";
import { MonsterGraphqlType } from "./monster";

registerEnumType(EventCharacter, {
    name: "EventCharacter"
});

const CharacterUnion = createUnionType({
    name: "Character",
    types: () => [HeroGraphqlType, MonsterGraphqlType] as const,
    resolveType: value => {
        if (
            value.type === HeroType.WARRIOR ||
            value.type === HeroType.RANGER ||
            value.type === HeroType.ROGUE || 
            value.type === HeroType.MAGE ||
            value.type === HeroType.SORCERER||
            value.type === HeroType.PRIEST
        ) return HeroGraphqlType;
        else return MonsterGraphqlType;
    }
});

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

    @Field(() => EventCharacter, { nullable: false })
    initiatorType: EventCharacter;
    
    @Field(() => CharacterUnion, { nullable: false })
    initiator: Character;

    @Field(() => ActionGraphqlType, { nullable: false })
    initiatorAction: IAction;

    @Field(() => EventCharacter, { nullable: false })
    receiverType: EventCharacter;

    @Field(() => CharacterUnion, { nullable: false })
    receiver: Character;

    @Field(() => ActionGraphqlType, { nullable: false })
    receiverAction: IAction;
}