import { Arg, Ctx, Query, Resolver } from "type-graphql";
import { heroFactory } from "../../../services/game/creation/hero";
import { armorFactory } from "../../../services/game/gear/armor/factory";
import { weaponsFactory } from "../../../services/game/gear/weapon/factory";
import { Context } from "../../interface/context";
import { HeroType } from "../types/hero";


@Resolver()
export class HeroResolver {

    // @Query(() => [HeroType])
    // public async heroes(@Ctx() { heroCol }: Context): Promise<HeroType[]> {
    //     try {
    //         const HeroRecords = await heroCol.getAllHeroes();
    //         const heroTypes = HeroRecords.map(heroRecord => heroFactory({
    //             id: heroRecord._id.toString(),
    //             type: heroRecord.type,
    //             name: heroRecord.name,
    //             armor: heroRecord.armor.map(armor => `${armor.name}:${armor.type}:${armor.slot}`).toString(),
    //             weapons: heroRecord.weapons.map(weapon => `${weapon.name}:${weapon.type}`).toString(),
    //         }));
    //         return heroTypes;
    //     } catch(error) {
    //         console.error('[heroes]', error);
    //         throw error;
    //     }
    // }

    @Query(() => HeroType)
    public async hero(@Arg("name") name: string, @Ctx() { heroCol }: Context): Promise<HeroType> {
        try {
            const heroRecord = await heroCol.findHeroByName(name);

            const hero = heroFactory({
                ...heroRecord,
                id: heroRecord._id.toString(),
                armor: heroRecord.armor.map(armor => `${armor.name}:${armor.type}:${armor.slot}`).toString(),
                weapons: heroRecord.weapons.map(weapon => `${weapon.name}:${weapon.type}`).toString(),
            });

            // @ts-ignore
            const inventoryWeapons = heroRecord.inventory.filter(item => item.slot === undefined).map(weapon => `${weapon.name}:${weapon.type}`);
            // @ts-ignore
            const inventoryArmor = heroRecord.inventory.filter(item => item.slot !== undefined).map(armor => `${armor.name}:${armor.type}:${armor.slot}`);

            console.log('inventoryWeapons:', inventoryWeapons);
            console.log('inventoryArmor:', inventoryArmor);

            const heroType = {
                ...hero,
                inventory: [ ...weaponsFactory(inventoryWeapons), ...armorFactory(inventoryArmor) ]
            };

            return heroType;
        } catch(error) {
            console.error('[hero]', error);
            throw error;
        }
    }

}