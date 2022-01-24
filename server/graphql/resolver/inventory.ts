import { Arg, Args, ArgsType, Ctx, Field, InputType, Mutation, Query, registerEnumType, Resolver } from "type-graphql";
import { Context } from "../../interface/context";
import { InventoryGraphqlType } from "../types/inventory";
import { inventoryFactory } from '../../game/gear/inventory';
import { WeaponType } from "../../game/enums/weapon";
import { ArmorSlot } from "../../game/enums/armor";
import { weaponsFactory } from "../../game/gear/weapon/factory";
import { armorFactory } from "../../game/gear/armor/factory";
import { getItemGoldValue } from "../../game/utils/math";


@InputType("ArmorItem")
export class ArmorItemGraphqlInputType {
    @Field({ nullable: false })
    name: string;

    @Field(() => ArmorSlot, { nullable: false })
    slot: ArmorSlot;
}

@ArgsType()
class EquipArmorArgs {
    @Field({ nullable: false })
    heroId: string;

    @Field(() => ArmorItemGraphqlInputType, { nullable: false })
    armorToEquip: ArmorItemGraphqlInputType

    @Field(() => ArmorItemGraphqlInputType, { nullable: true })
    armorToReplace?: ArmorItemGraphqlInputType
}

@InputType("WeaponItem")
export class WeaponItemGraphqlInputType {
    @Field({ nullable: false })
    name: string;

    @Field(() => WeaponType, { nullable: false })
    type: WeaponType;
}

@ArgsType()
class EquipWeaponArgs {
    @Field({ nullable: false })
    heroId: string;

    @Field(() => WeaponItemGraphqlInputType, { nullable: false })
    weaponToEquip: ArmorItemGraphqlInputType

    @Field(() => [WeaponItemGraphqlInputType], { nullable: true })
    weaponsToReplace?: WeaponItemGraphqlInputType[]
}

@ArgsType()
class SellItemArgs {
    @Field({ nullable: false })
    heroId: string;

    @Field({ nullable: false })
    itemName: string;

    @Field({ nullable: false })
    itemType: string;
}


@Resolver()
export class InventoryResolver {

    @Mutation(() => InventoryGraphqlType)
    public async createInventory(@Arg("heroId") heroId: string, @Ctx() { mongo }: Context) {
        try {
            return await mongo.inventoryCollection.createNewInventory(heroId);
        } catch(error) {
            console.error('[createInventory]', error);
            throw error;
        }
    }
    
    @Query(() => InventoryGraphqlType)
    public async inventory(@Arg("heroId") heroId: string, @Ctx() { mongo }: Context): Promise<InventoryGraphqlType> {
        try {
            const inventoryRecord = await mongo.inventoryCollection.getInventory(heroId);
            const { weapons, armor } = inventoryFactory({ armorInventory: inventoryRecord.armorInventory, weaponInventory: inventoryRecord.weaponInventory });

            return {
                id: inventoryRecord.id,
                gold: inventoryRecord.gold,
                heroId: inventoryRecord.heroId,
                armorInventory: armor,
                weaponInventory: weapons
            }
        } catch(error) {
            console.error('[inventory]', error);
            throw error;
        }
    }

    @Mutation(() => Boolean)
    public async equipArmor(
        @Ctx() { mongo }: Context,
        @Args() { heroId, armorToEquip, armorToReplace }: EquipArmorArgs
    ) {
        try {
            const heroRecord = await mongo.heroCollection.findHeroById(heroId);

            if (!heroRecord) throw new Error(`Hero ${heroId} not found!`);

            const heroInventoryRecord = await mongo.inventoryCollection.getInventory(heroId);
                
            if (!heroInventoryRecord) throw new Error(`No inventory found for heroId: ${heroId}.`);

            const armorRecordToEquipIndex = heroInventoryRecord.armorInventory.findIndex(armorRecord => armorRecord.name === armorToEquip.name);
            if (armorRecordToEquipIndex === -1) throw new Error(`${armorToEquip.name} was not found in heroId's ${heroId} inventory.`);

            const armorRecordToEquip = heroInventoryRecord.armorInventory.splice(armorRecordToEquipIndex, 1)[0];

            if (armorToReplace) {
                const armorRecordToSwapIndex = heroRecord.armor.findIndex(armorRecord => armorRecord.name === armorToReplace.name);
                if (armorRecordToSwapIndex === -1) throw new Error(`${armorToReplace.name} was not found in heroId's ${heroId} armor.`);
                const armorRecordToSwap = heroRecord.armor.splice(armorRecordToSwapIndex, 1)[0];
                heroInventoryRecord.armorInventory.push(armorRecordToSwap);
            } 

            heroRecord.armor.push(armorRecordToEquip);
            await mongo.heroCollection.updateHeroArmor(heroId, heroRecord.armor);
            await mongo.inventoryCollection.updateArmorInventory({ 
                heroId,
                armorInventory: heroInventoryRecord.armorInventory  
            });

            return true;
        } catch(error) {
            console.error('[equipArmor]', error);
            throw error;
        }
    }

    @Mutation(() => Boolean)
    public async equipWeapon(
        @Ctx() { mongo }: Context,
        @Args() { heroId, weaponToEquip, weaponsToReplace }: EquipWeaponArgs
    ) {
        try {
            const heroRecord = await mongo.heroCollection.findHeroById(heroId);

            if (!heroRecord) throw new Error(`Hero ${heroId} not found!`);

            const heroInventoryRecord = await mongo.inventoryCollection.getInventory(heroId);
                
            if (!heroInventoryRecord) throw new Error(`No inventory found for heroId: ${heroId}.`);

            const weaponRecordToEquipIndex = heroInventoryRecord.weaponInventory.findIndex(weapon => weapon.name === weaponToEquip.name);
            if (weaponRecordToEquipIndex === -1) throw new Error(`${weaponToEquip.name} was not found in heroId's ${heroId} inventory.`);
            // remove weapon from inventory
            const weaponRecordToEquip = heroInventoryRecord.weaponInventory.splice(weaponRecordToEquipIndex, 1)[0];

            let weaponToEquipValue;
            if (
                weaponRecordToEquip.type === WeaponType.TWOHANDEDSWORD || 
                weaponRecordToEquip.type === WeaponType.TWOHANDEDAXE || 
                weaponRecordToEquip.type === WeaponType.STAFF ||
                weaponRecordToEquip.type === WeaponType.TWOHANDEDCROSSBOW
            ) {
                weaponToEquipValue = 2
            } else weaponToEquipValue = 1;

            const currentWieldingWeaponValue = heroRecord.weapons.reduce((pv, weapon) => {
                if (
                    weapon.type === WeaponType.TWOHANDEDSWORD || 
                    weapon.type === WeaponType.TWOHANDEDAXE || 
                    weapon.type === WeaponType.STAFF ||
                    weapon.type === WeaponType.TWOHANDEDCROSSBOW
                ) return pv + 2
                else return pv + 1
            }, 0);
            
            const weaponListLength = heroRecord.weapons.length;

            if (currentWieldingWeaponValue === 1 && weaponToEquipValue === 1 && weaponListLength < 2) {
                // equip one handed weapon, no swap
                heroRecord.weapons.push(weaponRecordToEquip);
                
                const inventoryUpdate = mongo.inventoryCollection.updateWeaponInventory({ 
                    heroId,
                    weaponInventory: heroInventoryRecord.weaponInventory
                });

                const heroUpdate = mongo.heroCollection.updateHeroWeapons(heroId, heroRecord.weapons);

                await Promise.all([inventoryUpdate, heroUpdate]);
            } else {
                // Replace Weapon
                weaponsToReplace.forEach(weaponItem => {
                    const weaponRecordToReplaceIndex = heroRecord.weapons.findIndex(weapon => weapon.name === weaponItem.name);
                    const weaponRecordToReplace = heroRecord.weapons.splice(weaponRecordToReplaceIndex, 1)[0];
                    heroInventoryRecord.weaponInventory.push(weaponRecordToReplace);
                });

                heroRecord.weapons.push(weaponRecordToEquip);
                
                const heroUpdate = mongo.heroCollection.updateHeroWeapons(heroId, heroRecord.weapons);
                const inventoryUpdate = mongo.inventoryCollection.updateWeaponInventory({
                    heroId, 
                    weaponInventory: heroInventoryRecord.weaponInventory
                });

                await Promise.all([heroUpdate, inventoryUpdate]);
            }
            return true;
        } catch(error) {
            console.error('[equipWeapon]', error);
            throw error;
        }
    }

    @Mutation(() => Boolean)
    public async sellItem(
        @Args() { heroId, itemName, itemType }: SellItemArgs,
        @Ctx() { mongo }: Context
    ) {
        try {
            const inventoryRecord = await mongo.inventoryCollection.getInventory(heroId);

            if (!inventoryRecord) throw new Error(`Inventory for heroId:${heroId} was not found.`);

            let goldValue;
            if (itemType === "Weapon") {
                const weaponRecordIndex = inventoryRecord.weaponInventory.findIndex(weaponRecord => weaponRecord.name === itemName);

                if (weaponRecordIndex === -1) throw new Error(`Weapon with name ${itemName} was not found in heroId:${heroId} inventory.`);

                const weaponRecord = inventoryRecord.weaponInventory.splice(weaponRecordIndex, 1);

                const weapon = weaponsFactory(weaponRecord);

                goldValue = getItemGoldValue(weapon[0].rarity);

                await mongo.inventoryCollection.updateWeaponInventory({ heroId, weaponInventory: inventoryRecord.weaponInventory });
            } else {
                // armor
                const armorRecordIndex = inventoryRecord.armorInventory.findIndex(armorRecord => armorRecord.name === itemName);

                if (armorRecordIndex === -1) throw new Error(`Armor with name ${itemName} was not found in heroId:${heroId} inventory.`);

                const armorRecord = inventoryRecord.armorInventory.splice(armorRecordIndex, 1);

                const armor = armorFactory(armorRecord);

                goldValue = getItemGoldValue(armor[0].rarity);

                await mongo.inventoryCollection.updateArmorInventory({ heroId, armorInventory: inventoryRecord.armorInventory });
            }

            
            await mongo.inventoryCollection.updateGold(heroId, inventoryRecord.gold + goldValue);

            return true;
        } catch(error) {
            console.error('[sellItem]', error);
            throw error;
        }
    }
}