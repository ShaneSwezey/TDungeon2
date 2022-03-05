import * as dotenv from 'dotenv';
dotenv.config();
import { TDungeonDB } from './mongo/collections/index';
import { HeroInputWorker, NewBattleWorker, RoundWorker } from './bull/worker';
import { QueueScheduler } from 'bullmq';
import { getRedisConnectionConfig } from './redis/options';
import { twitchClient } from './services/tmiClient';

const CHANNEL_NAME = "slipperytoads";

const bootstrap = async () => {
    try {
        const isDBConnected = await TDungeonDB.connect();
        if (isDBConnected) {
            await twitchClient.connect();
            await twitchClient.say(CHANNEL_NAME, "Tdungeon is online!");

            const redisConfig = getRedisConnectionConfig();
            
            const roundQueueScheduler = new QueueScheduler("round", { connection: redisConfig });
            const heroInputQueueScheduler = new QueueScheduler("heroInput", { connection: redisConfig });
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

// const startGraceFulShutdown = async () => {
//     try {
//         console.log('Starting shutdown of bot...');
//         return await Promise.all([
//             TDungeonDB.disconnect(),
//             twitchClient.disconnect(),
//             HeroInputWorker.disconnect(),
//             NewBattleWorker.disconnect(),
//             RoundWorker.disconnect()
//         ]);
//     } catch(error) {
//         console.error('[startGraceFulShutdown]:', error);
//         throw error;
//     }
// }

// process.on('SIGTERM', startGraceFulShutdown);
// process.on('SIGINT', startGraceFulShutdown)

bootstrap();