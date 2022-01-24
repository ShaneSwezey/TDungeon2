import { Job, Worker } from "bullmq";
import { getRedisConnectionConfig } from "../redis";
import { pubSub } from "../redis/pubsub";

export const BattleResultsWorker = new Worker("battleResults", async (job: Job) => {
    const { results } = job.data;
    await pubSub.publish("BATTLERESULTS", results);
    return results; 
}, { connection: getRedisConnectionConfig() });