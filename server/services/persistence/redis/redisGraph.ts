import Redis from 'redisgraph.js';
import { RedisConfig } from '.';
import { Hero, HeroType } from '../../game/hero';
import { Monster } from '../../game/monster';

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
            await this.battleGraph.query(`MERGE (h:hero { name: '${hero.name}', type:'${hero.type}', currentHitPoints: ${hero.stamina.hitPoints} })`);
            const armorPromises = hero.armor.map(async armor => {
                return await this.battleGraph.query(`
                    MERGE (h:hero { name: '${hero.name}' })
                    MERGE (g:gear { name: '${armor.name}', type: '${armor.type}', slot: '${armor.slot}', gearType: 'armor' })
                    MERGE (h)-[r:IS_WEARING_GEAR]->(g)
                `);
            });
            const weaponPromises = hero.weapons.map(async weapon => {
                return await this.battleGraph.query(`
                    MERGE (h:hero { name: '${hero.name}' })
                    MERGE (g:gear { name: '${weapon.name}', type: '${weapon.type}', gearType: 'weapon' })
                    MERGE (h)-[r:IS_WEARING_GEAR]->(g)
                `);
            });
            await Promise.all([armorPromises, weaponPromises]);
            return true;
        } catch(error) {
            console.error('[loadHero]', error);
            throw error;
        }
    }

    public async getHero(heroName: string, type: HeroType) {
        try {
            const res = await this.battleGraph.query(`
                MATCH (h:hero { name: '${heroName}', type: '${type}' }) 
                MATCH (h)-[:IS_WEARING_GEAR]->(g)
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

    public async updateHeroHitPoints(hero: Hero) {
        try {
            const res = await this.battleGraph.query(`
                MATCH (h:hero { name: '${hero.name}', type: '${hero.type}'})
                SET h.currentHitPoints = ${hero.stamina.hitPoints}
                RETURN h
            `);
            while(res.hasNext()) {
                const record = res.next();
                console.dir(record.values(), { depth: null });
            }
        } catch(error) {
            console.log('[updateHeroHitPoints]', error);
            throw error;
        }
    }

    public async getAliveHeroes() {
        try {
            const res = await this.battleGraph.query("MATCH (h:hero)-[:IS_WEARING_GEAR]->(g) WHERE h.currentHitPoints > 0 RETURN h, g");
            console.log('getAliveHeroes.hasNext:', res.hasNext());
            while(res.hasNext()) {
                const record = res.next();
                console.dir(record.values(), { depth: null });
                // const valuesArray = record.values();
                // const weapons = [];
                // const armor = [];
                // let hero: Object;
                // valuesArray.forEach(node => {
                //     // @ts-ignore
                //     if (node.label === "hero") hero = node.properties;
                //     if (node.label === "") 
                // });
            }
        } catch(error) {
            console.error('[getAliveHeroes]', error);
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

    public async loadMonster(monster: Monster) {
        try {
            const res = await this.battleGraph.query(`
                MERGE (m:monster { id: '${monster.id}', type: '${monster.type}', currentHitPoints: ${monster.stamina.hitPoints} })
                RETURN m
            `);
        } catch(error) {
            console.error('[loadMonster]', error);
            throw error;
        }
    }

    public async updateMonsterHitPoints(monster: Monster) {
        try {
            const res = await this.battleGraph.query(`
                MATCH (m:monster { id: '${monster.id}' })
                SET m.currentHitPoints = ${monster.stamina.hitPoints}
                RETURN m
            `);
        } catch(error) {
            console.log('[updateMonsterHitPoints]', error);
            throw error;
        }
    }

    public async getAliveMonsters() {
        try {
            const monsterNodes: any[] = [];
            const res = await this.battleGraph.query(`
                MATCH (m:monster)
                WHERE m.currentHitPoints > 0
                RETURN m
            `);
            while(res.hasNext()) {
                const record = res.next();
                console.dir(record.values(), { depth: null });
                const valueArry = record.values();
                // @ts-ignore
                monsterNodes.push(valueArry[0].properties);
            }
            return monsterNodes;
        } catch(error) {
            console.log('[getAliveMonsters]', error);
            throw error;
        }
    }

    public async clearEntireGraph() {
        try {
            await this.battleGraph.query("MATCH (n) DETACH DELETE (n)");
        } catch(error) {
            console.error('[clearEntireGraph]', error);
            throw error;
        }
    }

}