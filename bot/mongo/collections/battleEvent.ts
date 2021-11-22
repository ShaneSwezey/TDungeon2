import { Db, Collection, ObjectId } from 'mongodb'; 
import { Armor } from '../../game/gear/armor';
import { Weapon } from '../../game/gear/weapon';
import { IHero } from '../../game/hero';
import { Monster } from '../../game/monster';
import { Stamina } from '../../game/stats/stamina';

export interface ActionEvent {
    _id?: ObjectId;
    battleId: string;
    round: number;
    iteration: number;
    event: Event;
    createdAt: string;
    updatedAt: string;
}

interface BattleEvent {
    _id: ObjectId;
    battleId: string;
    round: number;
    iteration: number;
    event: Event;
    createdAt: string;
    updatedAt: string;
}

export interface Event {
    type: string;
    value: number;
    isCrit: boolean;
    deathBlow: boolean;
    to: Monster | IHero;
    from: Monster | HeroAttack;
}

export interface HeroAttack {
    id: string;
    name: string;
    type: string;
    stamina: Stamina;
    weapon: Weapon;
    armor: Armor[];
}

export class BattleEventCollection {

    private battleEventCollection: Collection<BattleEvent>;

    constructor(tdungeon: Db) {
        this.battleEventCollection = tdungeon.collection<BattleEvent>("BattleEvent");
    }

    public async createNewBattleEvents(battleEvents: ActionEvent[]) {
        try {
            return await this.battleEventCollection.insertMany(battleEvents)
        } catch(error) {
            throw error;
        }
    }

    public async findBattleEvents(battleId: string) {
        try {
            const records = await this.battleEventCollection.find({ battleId }).toArray();
            return records.map(record => ({ ...record, _id: record._id.toString() }));
        } catch(error) {
            throw error;
        }
    }


}