import { Field, ID, Int, ObjectType, registerEnumType } from "type-graphql";
import { MonsterType } from "../../game/enums/monster";
import { IBattleEventMonster, IMonster } from "../../game/interfaces/monster";
import { IStamina } from "../../game/interfaces/stamina";
import { IWeapon } from "../../game/interfaces/weapon";
import { StaminaGraphqlType } from "./stamina";
import { WeaponGraphqlType } from "./weapon";

registerEnumType(MonsterType, {
    name: "MonsterType"
})

@ObjectType("Monster")
export class MonsterGraphqlType implements IMonster {
    @Field(() => ID)
    id: string;

    @Field(() => StaminaGraphqlType, { nullable: false })
    stamina: IStamina;

    @Field(() => Int, { nullable: false })
    crit: number;

    @Field(() => Int, { nullable: false })
    dodge: number;

    @Field(() => Int, { nullable: false })
    attackPower: number;

    @Field(() => Int, { nullable: false })
    block: number;

    @Field(() => MonsterType, { nullable: false })
    type: MonsterType;

    @Field(() => [WeaponGraphqlType], { nullable: false })
    weapons: IWeapon[];
    
    @Field({ nullable: false })
    monsterImgSrc: string;
    
    monsterHitImgSrc: string;
}

@ObjectType("BattleEventMonster")
export class BattleEventMonster implements IBattleEventMonster {
    @Field(() => ID)
    id: string;

    @Field(() => StaminaGraphqlType, { nullable: false })
    stamina: IStamina;

    @Field(() => Int, { nullable: false })
    crit: number;

    @Field(() => Int, { nullable: false })
    dodge: number;

    @Field(() => Int, { nullable: false })
    attackPower: number;

    @Field(() => Int, { nullable: false })
    block: number;

    @Field(() => MonsterType, { nullable: false })
    type: MonsterType;

    @Field(() => [WeaponGraphqlType], { nullable: false })
    weapons: IWeapon[];
    
    @Field({ nullable: false })
    imgSrc: string;
}