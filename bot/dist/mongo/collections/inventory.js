"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryCollection = void 0;
class InventoryCollection {
    constructor(tdungeon) {
        this.inventoryCollection = tdungeon.collection("Inventory");
    }
    async createNewInventory(heroId) {
        try {
            const res = await this.inventoryCollection.insertOne({
                heroId,
                gold: 0,
                armorInventory: [],
                weaponInventory: []
            });
            console.log('inventoryRes:', res);
            return res;
        }
        catch (error) {
            console.error('[createNewInventory]', error);
            throw error;
        }
    }
    async getInventory(heroId) {
        try {
            const inventoryRecord = await this.inventoryCollection.findOne({ heroId });
            return inventoryRecord ? {
                id: inventoryRecord._id.toString(),
                heroId: inventoryRecord.heroId,
                gold: inventoryRecord.gold,
                armorInventory: inventoryRecord.armorInventory,
                weaponInventory: inventoryRecord.weaponInventory
            } : null;
        }
        catch (error) {
            console.error('[getInventory]', error);
            throw error;
        }
    }
    async updateArmorInventory({ heroId, armorInventory }) {
        try {
            return await this.inventoryCollection.updateOne({ heroId }, {
                $set: {
                    armorInventory
                }
            });
        }
        catch (error) {
            console.error('[updateArmorInventory]', error);
            throw error;
        }
    }
    async updateWeaponInventory({ heroId, weaponInventory }) {
        try {
            return await this.inventoryCollection.updateOne({ heroId }, {
                $set: {
                    weaponInventory
                }
            });
        }
        catch (error) {
            console.error('[updateWeaponInventory]', error);
            throw error;
        }
    }
}
exports.InventoryCollection = InventoryCollection;
