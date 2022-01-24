import { Arg, Ctx, Mutation, Query, Resolver, registerEnumType, ObjectType, Field } from "type-graphql";
import { Context } from "../../interface/context";
import { HeroGraphqlType } from '../types/hero';
import { heroFactory, newHeroFactory } from '../../game/hero/index';
import { HeroType } from '../../game/enums/hero';

registerEnumType(HeroType, {
    name: "HeroType",
    description: "Type of Hero",
});

@ObjectType()
class SetHeroActivePayload {
    @Field()
    heroId: string;
    @Field()
    active: boolean;
}

@Resolver()
export class HeroResolver {

    @Query(() => HeroGraphqlType)
    public async hero(@Arg("heroId") heroId: string, @Ctx() { mongo }: Context): Promise<HeroGraphqlType> {
        try {
            const heroRecord = await mongo.heroCollection.findHeroById(heroId);

            const hero = heroFactory(heroRecord);

            return {
                id: heroRecord.id,
                active: heroRecord.active,
                ...hero
            };
        } catch(error) {
            console.error('[hero]', error);
            throw error;
        }
    }

    @Query(() => [HeroGraphqlType])
    public async heroes(@Arg("name") name: string, @Ctx() { mongo }: Context): Promise<HeroGraphqlType[]> {
        try {
            const heroRecords = await mongo.heroCollection.findHeroesByName(name);

            const heroes = heroRecords.map(heroRecord => {
                const hero = heroFactory(heroRecord);
                return {
                    ...hero,
                    active: heroRecord.active,
                    id: heroRecord.id
                }
            });
            
            return heroes;
        } catch(error) {
            console.error('[heroes]', error);
            throw error;
        }
    }

    @Mutation(() => HeroGraphqlType)
    public async createHero(
        @Arg("name", { nullable: false }) name: string, 
        @Arg("type", { nullable: false }) type: HeroType, 
        @Ctx() { mongo }: Context): Promise<HeroGraphqlType> {
        try {
            const heroRecord = await mongo.heroCollection.findHeroByType(name, type);

            if (heroRecord) throw new Error(`${name} already has a hero of type ${type}`);

            const activeHero = await mongo.heroCollection.findActiveHero(name);

            if (activeHero) await mongo.heroCollection.deactiveHero(activeHero.id);

            const newHero = newHeroFactory({ name, type });

            const newHeroRecordResponse = await mongo.heroCollection.createNewHero(newHero);

            await mongo.inventoryCollection.createNewInventory(newHeroRecordResponse.insertedId.toString());
            
            return {
                ...newHero,
                active: true,
                id: newHeroRecordResponse.insertedId.toString()
            }
        } catch(error) {
            console.error('[createHero]', error);
            throw error;
        }
    }

    @Mutation(() => SetHeroActivePayload)
    public async setHeroActive(
        @Arg("name") name: string,
        @Arg("heroId") heroId: string, 
        @Ctx() { mongo }: Context
    ): Promise<SetHeroActivePayload> {
        try {
            const result = await mongo.heroCollection.setHeroActive(name, heroId);
            return {
                heroId,
                active: result.acknowledged
            };
        } catch(error) {
            console.error('[setHeroActive]', error);
            throw error;
        }
    }
}