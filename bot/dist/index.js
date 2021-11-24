"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./services/client");
const index_1 = require("./mongo/collections/index");
const worker_1 = require("./bull/worker");
const bullmq_1 = require("bullmq");
const CHANNEL_NAME = "slipperytoads";
const bootstrap = async () => {
    try {
        const derp = await index_1.TDungeonDB.connect();
        if (derp) {
            await client_1.twitchClient.connect();
            await client_1.twitchClient.join(CHANNEL_NAME);
            await client_1.twitchClient.say(CHANNEL_NAME, "Tdungeon is online!");
            const roundQueueScheduler = new bullmq_1.QueueScheduler("round");
            const heroInputQueueScheduler = new bullmq_1.QueueScheduler("heroInput");
            console.log(`Started workers: ${roundQueueScheduler.name}`);
            console.log(`Started workers: ${heroInputQueueScheduler.name}`);
            worker_1.NewBattleWorker.on("completed", (job) => console.log(`Job #${job.id} -`, job.data));
            worker_1.NewBattleWorker.on("failed", (job, err) => console.error(`Job #${job.id} - Error:`, err));
            worker_1.RoundWorker.on("completed", (job) => console.log(`Job #${job.id} -`, job.data));
            worker_1.RoundWorker.on("failed", (job, err) => console.error(`Job #${job.id} - Error:`, err));
            worker_1.HeroInputWorker.on("completed", (job) => console.log(`Job #${job.id} -`, job.data));
            worker_1.HeroInputWorker.on("failed", (job, err) => console.error(`Job #${job.id} - Error:`, err));
        }
        else {
            throw Error('Problem connecting to Db');
        }
    }
    catch (error) {
        console.error('[bootstrap]', error);
        throw error;
    }
};
bootstrap();
