import { ObjectId, Collection, Db } from 'mongodb';
import { ArmorSlot, ArmorType } from '../../../game/gear/armor';
import { WeaponType } from '../../../game/gear/weapon';
import { Hero, HeroType } from '../../../game/hero';

interface Armor {
    name: string;
    type: ArmorType;
    slot: ArmorSlot;
}

interface Weapon {
    name: string;
    type: WeaponType;
}

interface HeroModel {
    _id: ObjectId;
    name: string;
    type: HeroType;
    armor: Armor[];
    weapons: Weapon[];
    createdAt: string;
    updatedAt: string;
}

export class HeroCollection {
    
    private heroCollection: Collection<HeroModel>;

    constructor(tdungeon: Db) {
        this.heroCollection = tdungeon.collection<HeroModel>("Hero");
    }

    public async createNewHero(hero: Hero) {
        try {
            const date = new Date().toUTCString();
            const res = await this.heroCollection.insertOne({
                name: hero.name,
                type: hero.type,
                armor: hero.armor.map(({ name, type, slot }) => ({ name, type, slot })),
                weapons: hero.weapons.map(({ name, type }) => ({ name, type })),
                createdAt: date,
                updatedAt: new Date().toUTCString(),
            });
            return true;
        } catch(error) {
            throw error;
        }
    }

    public async createNewHeroes(heroes: Hero[]) {
        try {
            const date = new Date().toUTCString();
            const res = await this.heroCollection.insertMany(heroes.map(hero => ({
                name: hero.name,
                type: hero.type,
                armor: hero.armor.map(({ name, type, slot }) => ({ name, type, slot })),
                weapons: hero.weapons.map(({ name, type }) => ({ name, type })),
                createdAt: date,
                updatedAt: date,
            })));
            return true;
        } catch(error) {
            throw error;
        }
    }

    public async findHeroById(id: string) {
        try {
            const res = await this.heroCollection.findOne({ _id: new ObjectId(id) });
            return res;
        } catch(error) {
            throw error;
        }
    }

    public async findHeroByAttr(name: string, type: HeroType) {
        try {
            const res = await this.heroCollection.findOne({ name, type });
            return res;
        } catch(error) {
            throw error;
        }
    }

}