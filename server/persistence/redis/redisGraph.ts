import Redis from 'redisgraph.js';
import { RedisConfig } from '.';
import { Hero, HeroType } from '../../services/game/hero';

export class RedisGraph {

    private battleGraph: Redis.Graph;

    constructor() {
        const Graph = Redis.Graph;
        this.battleGraph = new Graph("game", RedisConfig.host, RedisConfig.port);
    }

    public async createBattle(battleId: string) {
        try {   
            // const paraMap = new Map();
            // paraMap.set("battleId", battleId);
            const res = await this.battleGraph.query(
                `CREATE (:battle { id: '${battleId}' })`
            );
            while(res.hasNext()) {
                const record = res.next();
                console.dir(record, { depth: null });
            }
        } catch(error) {
            console.error('[createBattle]', error);
            throw error;
        }
    }

    public async getBattle(battleId: string) {
        try {
            const res = await this.battleGraph.query(`MATCH (b:battle { id: '${battleId}' }) return b`);
            while(res.hasNext()) {
                const record = res.next();
                console.dir(record, { depth: null });
            }
        } catch(error) {
            console.error('[getBattle]', error);
            throw error;
        }
    }

    public async createRoundAndAttach(battleId: string, roundNumber: number) {
        try {
            const res = await this.battleGraph.query(`
                MATCH (b:battle { id: '${battleId}' })
                CREATE (r:round { number: ${roundNumber}, createdAt: timestamp() })
                CREATE (b)-[rel:HAS]->(r)
            `);
            while(res.hasNext()) {
                const record = res.next();
                console.dir(record, { depth: null });
            }
        } catch(error) {
            console.error('[createRoundAndAttach]', error);
            throw error;
        }
    }

    public async getRound(battleId: string, roundNumber: number) {
        try {
            const res = await this.battleGraph.query(`
                MATCH (r:round { number: ${roundNumber} })<-[rel:HAS]-(b:battle { id: '${battleId}' })
                RETURN r
            `);
            while(res.hasNext()) {
                const record = res.next();
                console.dir(record, { depth: null });
            }
        } catch(error) {
            console.error('[getRound]', error);
            throw error;
        }
    }

    // Should improve for bulk query
    // Still learning cypher language
    public async loadHero(hero: Hero) {
        try {
            await this.battleGraph.query(`MERGE (h:hero { name: '${hero.name}', type:'${hero.type}' })`);
            const armorPromises = hero.armor.map(async armor => {
                return await this.battleGraph.query(`
                    MERGE (h:hero { name: '${hero.name}' })
                    MERGE (a:armor { name: '${armor.name}', type: '${armor.type}', slot: '${armor.slot}' })
                    MERGE (h)-[r:IS_WEARING_ARMOR]->(a)
                `);
            });
            const weaponPromises = hero.weapons.map(async weapon => {
                return await this.battleGraph.query(`
                    MERGE (h:hero { name: '${hero.name}' })
                    MERGE (w:weapon { name: '${weapon.name}', type: '${weapon.type}' })
                    MERGE (h)-[r:IS_WEARING_WEAPON]->(w)
                `);
            });
            await Promise.all([armorPromises, weaponPromises]);
        } catch(error) {
            console.error('[loadHero]', error);
            throw error;
        }
    }

    public async getHero(heroName: string, type: HeroType) {
        try {
            const res = await this.battleGraph.query(`
                MATCH (h:hero { name: '${heroName}', type: '${type}' }) 
                MATCH (h)-[:IS_WEARING_WEAPON|:IS_WEARING_ARMOR]->(g)
                RETURN h, g
            `);
            while(res.hasNext()) {
                const record = res.next();
                console.dir(record.values(), { depth: null });
            }
        } catch(error) {
            console.error('[getHero]', error);
            throw error;
        }
    }

    public async attachHeroToBattle(hero: Hero, battleId: string) {
        try {
            const res = await this.battleGraph.query(`
                MATCH (h:hero { name: '${hero.name}', type: '${hero.type}' })
                MATCH (b:battle { id: '${battleId}' })
                MERGE (h)-[r:PARTICIPATING_IN]->(b)
            `);
        } catch(error) {
            console.error('[attachHeroToBattle]', error);
            throw error;
        }
    }

    public async setHeroToAttack(hero: Hero, roundNumber: number) {
        try {
            const res = await this.battleGraph.query(`
                MATCH (h:hero { name: '${hero.name}', type: '${hero.type}' })
                MATCH (r:round { number: ${roundNumber} })
                MERGE (h)-[rel:IS_ATTACKING]->(r)
            `);
        } catch(error) {
            console.error('[setHeroToAttack]', error);
            throw error;
        }
    }

    public async clearEntireGraph() {
        try {
            await this.battleGraph.query("MATCH (n) DETACH DELETE n");
        } catch(error) {
            console.error('[clearEntireGraph]', error);
            throw error;
        }
    }

}