import { createUnionType, Field, ID, Int, ObjectType } from "type-graphql";
import { HeroType } from "./hero";
import { HeroAttackType } from "./heroAttack";
import { MonsterType } from "./monster";

// For quick testing only
// will improve
const fromHeroMonsterUnion = createUnionType({
    name: "from",
    types: () => [HeroAttackType, MonsterType],
    resolveType: value => {
        if (value.type === "Melee" || value.type === "Ranged" || value.type === "Caster") return HeroAttackType;
        else return MonsterType;
    }
});

// For quick testing only
// will improve
const toHeroMonsterUnion = createUnionType({
    name: "to",
    types: () => [HeroType, MonsterType],
    resolveType: value => {
        if (value.type === "Melee" || value.type === "Ranged" || value.type === "Caster") return HeroType;
        else return MonsterType;
    }
});

@ObjectType()
class Event {

    @Field()
    type: string;

    @Field(() => Int)
    value: number;

    @Field()
    isCrit: boolean;

    @Field()
    deathBlow: boolean;

    @Field(() => toHeroMonsterUnion)
    to: HeroType | MonsterType;

    @Field(() => fromHeroMonsterUnion)
    from: HeroAttackType | MonsterType;
}

@ObjectType("BattleEvent")
export class BattleEventType {

    @Field(() => ID)
    _id: string;

    @Field()
    battleId: string;

    @Field(() => Int)
    round: number;

    @Field(() => Int)
    iteration: number;

    @Field(() => Event)
    event: Event;
}