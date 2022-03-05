import { Queue } from 'bullmq';
import { getRedisConnectionConfig } from '../redis/options';

const redisConfig = getRedisConnectionConfig();

export const RoundQueue = new Queue("round", { defaultJobOptions: { removeOnComplete: true }, connection: redisConfig });
export const HeroInputQueue = new Queue("heroInput", { defaultJobOptions: { removeOnComplete: true }, connection: redisConfig });
export const BattleResultsQueue = new Queue("battleResults", { defaultJobOptions: { removeOnComplete: true }, connection: redisConfig });