import { ObjectId, Collection, Db } from 'mongodb';
import { IHero } from '../../game/interfaces/hero';
import { HeroType } from '../../game/enums/hero';
import { IWeapon } from '../../game/interfaces/weapon';
import { IArmor } from '../../game/interfaces/armor';
import { IArmorRecord, IWeaponRecord } from '../../interface/item';

interface IHeroRecord {
    _id: ObjectId;
    name: string;
    type: HeroType;
    armor: IArmorRecord[];
    weapons: IWeaponRecord[];
    active: boolean;
}

export class HeroCollection {
    
    private heroCollection: Collection<IHeroRecord>;

    constructor(tdungeon: Db) {
        this.heroCollection = tdungeon.collection<IHeroRecord>("Hero");
    }

    public async createNewHero(hero: IHero) {
        try {
            const res = await this.heroCollection.insertOne({
                name: hero.name,
                type: hero.type,
                armor: this.createArmorRecords(hero.armor),
                weapons: this.createWeaponRecords(hero.weapons),
                active: true
            });
            return res;
        } catch(error) {
            throw error;
        }
    }

    public async createNewHeroes(heroes: IHero[]) {
        try {
            const res = await this.heroCollection.insertMany(heroes.map(hero => ({
                name: hero.name,
                type: hero.type,
                armor: this.createArmorRecords(hero.armor),
                weapons: this.createWeaponRecords(hero.weapons),
                active: true
            })));
            return res;
        } catch(error) {
            throw error;
        }
    }

    public async findHeroById(id: string) {
        try {
            const heroRecord = await this.heroCollection.findOne({ _id: new ObjectId(id) });
            return heroRecord ? this.unwrapHeroRecord(heroRecord) : null;
        } catch(error) {
            throw error;
        }
    }


    public async findHeroesByName(name: string) {
        try {
            const heroRecords = await this.heroCollection.find({ name }).toArray();
            return heroRecords.map(heroRecord => this.unwrapHeroRecord(heroRecord));
        } catch(error) {
            throw error;
        }
    }

    public async findHeroByType(name: string, type: HeroType) {
        try {
            const heroRecord = await this.heroCollection.findOne({ name, type });
            return heroRecord ? this.unwrapHeroRecord(heroRecord) : null;
        } catch(error) {
            throw error;
        }
    }

    public async findActiveHero(name: string) {
        try {
            const heroRecord = await this.heroCollection.findOne({ name, active: true });
            return heroRecord ? this.unwrapHeroRecord(heroRecord) : null;
        } catch(error) {
            throw error;
        }
    }

    public async deactiveHero(heroId: string) {
        try {
            return await this.heroCollection.updateOne({ _id: new ObjectId(heroId) }, {
                $set: {
                    active: false
                }
            });
        } catch(error) {
            throw error;
        }
    }

    public async setHeroActive(name: string, heroId: string) {
        try {
            await this.heroCollection.updateOne({ name, active: true }, { 
                $set: {
                    active: false
                }
            });

            const heroResult = await this.heroCollection.updateOne({ _id: new ObjectId(heroId) }, {
                $set: {
                    active: true
                }
            });

            return heroResult;
        } catch(error) {
            throw error;
        }
    }

    public async updateHeroWeapons(heroId: string, weapons: IWeaponRecord[]) {
        try {
            return await this.heroCollection.updateOne({ _id: new ObjectId(heroId) }, {
                $set: {
                    weapons
                }
            });
        } catch(error) {
            throw error;
        }
    }

    public async updateHeroArmor(heroId: string, armor: IArmorRecord[]) {
        try {
            return await this.heroCollection.updateOne({ _id: new ObjectId(heroId) }, {
                $set: {
                    armor
                }
            });
        } catch(error) {
            throw error;
        }
    }

    private unwrapHeroRecord(heroRecord: IHeroRecord) {
        return {
            id: heroRecord._id.toString(),
            name: heroRecord.name,
            type: heroRecord.type,
            active: heroRecord.active,
            armor: heroRecord.armor,
            weapons: heroRecord.weapons
        }
    }

    private createWeaponRecords(weapons: IWeapon[]) {
        return weapons.map(({ name, type }) => ({ name, type }));
    }

    private createArmorRecords(weapons: IArmor[]) {
        return weapons.map(({ name, type, slot }) => ({ name, type, slot }));
    }
}