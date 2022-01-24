import { ObjectId, Collection, Db } from 'mongodb';
import { HeroType } from '../../game/enums/hero';
import { IArmor, IArmorRecord } from '../../game/interfaces/armor';
import { IHero } from '../../game/interfaces/hero';
import { IWeapon, IWeaponRecord } from '../../game/interfaces/weapon';

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

    public async findHeroById(id: string) {
        try {
            const heroRecord = await this.heroCollection.findOne({ _id: new ObjectId(id) });
            return heroRecord ? this.unWrapHeroRecord(heroRecord) : null;
        } catch(error) {
            throw error;
        }
    }

    public async findHeroByType(name: string, type: HeroType) {
        try {
            const heroRecord = await this.heroCollection.findOne({ name, type });
            return heroRecord ? this.unWrapHeroRecord(heroRecord) : null;
        } catch(error) {
            throw error;
        }
    }

    public async findActiveHeroByName(name: string) {
        try {
            const heroRecord = await this.heroCollection.findOne({ name, active: true });
            return heroRecord ? this.unWrapHeroRecord(heroRecord) : null;
        } catch(error) {
            throw error;
        }
    }


    private unWrapHeroRecord(heroRecord: IHeroRecord) {
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