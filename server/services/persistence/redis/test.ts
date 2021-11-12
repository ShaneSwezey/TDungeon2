import { RedisGraph } from './redisGraph';
import { createNewHero } from '../../game/creation/hero';
import { HeroType } from '../../game/hero';
import { v4 as uuuid } from 'uuid';




const runRedisTests = async () => {
    try {
        const redisGraph = new RedisGraph();

        const battleId = uuuid();
        await redisGraph.createBattle(battleId);

        await redisGraph.createRoundAndAttach(battleId, 1);

        const hero = createNewHero("Shane", HeroType.Melee);
        const hero2 = createNewHero("Jordan", HeroType.Melee);

        await redisGraph.loadHero(hero);
        await redisGraph.loadHero(hero2);

        await redisGraph.attachHeroToBattle(hero, battleId)
        
        await redisGraph.setHeroToAttack(hero, 1);

    } catch(error) {
        console.error('[runRedisTests]', error);
        throw error;
    }
}

runRedisTests()
    .then(() => process.exit(0))
    .catch(error => {
        console.error('[runRedisTests]', error);
        process.exit(1);
    })