import { Db } from "mongodb";
import { BattleCollection } from "./battle";
import { BattleEventCollection } from "./battleEvent";
import { HeroCollection } from "./hero";
import { InventoryCollection } from "./inventory";

export class Mongo {

    // change to interfaces
    public heroCollection: HeroCollection;
    public battleCollection: BattleCollection;
    public battleEventCollection: BattleEventCollection;
    public inventoryCollection: InventoryCollection;

    constructor(db: Db) {
        this.heroCollection = new HeroCollection(db);
        this.battleCollection = new BattleCollection(db);
        this.battleEventCollection = new BattleEventCollection(db);
        this.inventoryCollection = new InventoryCollection(db);
    }
}
