import { Collection, Db, ObjectId } from "mongodb";
import { IArmorInventory, IWeaponInventory } from "../../interface/inventory";
import { IArmorRecord, IWeaponRecord } from "../../interface/item";

export interface IInventoryRecord {
    _id: ObjectId;
    heroId: string;
    gold: number;
    armorInventory: IArmorRecord[];
    weaponInventory: IWeaponRecord[];
}

export class InventoryCollection {
    private inventoryCollection: Collection<IInventoryRecord>;

    constructor(tdungeon: Db) {
        this.inventoryCollection = tdungeon.collection<IInventoryRecord>("Inventory");
    }

    public async createNewInventory(heroId: string) {
        try {
            const res = await this.inventoryCollection.insertOne({
                heroId,
                gold: 0,
                armorInventory: [],
                weaponInventory:[]
            });
            console.log('inventoryRes:', res);
            return res;
        } catch(error) {
            console.error('[createNewInventory]', error);
            throw error;
        }
    }

    public async getInventory(heroId: string) {
        try {
            const inventoryRecord = await this.inventoryCollection.findOne({ heroId });
            return {
                id: inventoryRecord._id.toString(),
                heroId: inventoryRecord.heroId,
                gold: inventoryRecord.gold,
                armorInventory: inventoryRecord.armorInventory,
                weaponInventory: inventoryRecord.weaponInventory
            }
        } catch(error) {
            console.error('[getInventory]', error);
            throw error;
        }
    }

    public async updateArmorInventory({ heroId, armorInventory }: IArmorInventory) {
        try {
            return await this.inventoryCollection.updateOne({ heroId }, {
                $set: {
                    armorInventory
                }
            });
        } catch(error) {
            console.error('[updateArmorInventory]', error);
            throw error;
        }
    }


    public async updateWeaponInventory({ heroId, weaponInventory }: IWeaponInventory) {
        try {
            return await this.inventoryCollection.updateOne({ heroId }, {
                $set: {
                    weaponInventory
                }
            });
        } catch(error) {
            console.error('[updateWeaponInventory]', error);
            throw error;
        }
    }

    public async updateGold(heroId: string, goldAmount: number) {
        try {
            return await this.inventoryCollection.updateOne({ heroId }, {
                $set: {
                    gold: goldAmount
                }
            })
        } catch(error) {
            console.log('[updateGold]', error);
            throw error;
        }
    }
}