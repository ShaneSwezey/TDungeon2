import * as dotenv from 'dotenv';
dotenv.config();
import { twitchClient } from './services/client';
import { TDungeonDB } from './mongo/collections/index';
import { HeroInputWorker, NewBattleWorker, RoundWorker } from './bull/worker';
import { QueueScheduler } from 'bullmq';
import { RedisConfig } from './redis/options';

const CHANNEL_NAME = "slipperytoads";

const bootstrap = async () => {
    try {
        const derp = await TDungeonDB.connect();
        if (derp) {
            await twitchClient.connect();
            await twitchClient.join(CHANNEL_NAME);
            await twitchClient.say(CHANNEL_NAME, "Tdungeon is online!");
            
            const roundQueueScheduler = new QueueScheduler("round", { connection: RedisConfig });
            const heroInputQueueScheduler = new QueueScheduler("heroInput", { connection: RedisConfig });
            console.log(`Started workers: ${roundQueueScheduler.name}`);
            console.log(`Started workers: ${heroInputQueueScheduler.name}`);

            NewBattleWorker.on("completed", (job) => console.log(`Job #${job.id} -`, job.data));
            NewBattleWorker.on("failed", (job, err) => console.error(`Job #${job.id} - Error:`, err));
            RoundWorker.on("completed", (job) => console.log(`Job #${job.id} -`, job.data));
            RoundWorker.on("failed", (job, err) => console.error(`Job #${job.id} - Error:`, err));
            HeroInputWorker.on("completed", (job) => console.log(`Job #${job.id} -`, job.data));
            HeroInputWorker.on("failed", (job, err) => console.error(`Job #${job.id} - Error:`, err));
        } else {
            throw Error('Problem connecting to Db');
        }
    } catch(error) {
        console.error('[bootstrap]', error);
        throw error;
    }
}

bootstrap();