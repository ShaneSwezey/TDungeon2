import { Ctx, Query, Resolver } from "type-graphql";
import { heroFactory } from "../../../services/game/creation/hero";
import { Context } from "../../interface/context";
import { HeroType } from "../types/hero";


@Resolver()
export class HeroResolver {

    @Query(() => [HeroType])
    public async heroes(@Ctx() { heroCol }: Context): Promise<HeroType[]> {
        try {
            const HeroRecords = await heroCol.getAllHeroes();
            const heroTypes = HeroRecords.map(heroRecord => heroFactory({
                id: heroRecord._id.toString(),
                type: heroRecord.type,
                name: heroRecord.name,
                armor: heroRecord.armor.map(armor => `${armor.name}:${armor.type}:${armor.slot}`).toString(),
                weapons: heroRecord.weapons.map(weapon => `${weapon.name}:${weapon.type}`).toString(),
            }));
            return heroTypes;
        } catch(error) {
            console.error('[heroes]', error);
            throw error;
        }
    }
}