import { Queue } from 'bullmq';
import { RedisConfig } from '../redis/options';

export const RoundQueue = new Queue("round", { defaultJobOptions: { removeOnComplete: true }, connection: RedisConfig });
export const HeroInputQueue = new Queue("heroInput", { defaultJobOptions: { removeOnComplete: true }, connection: RedisConfig });
export const BattleResultsQueue = new Queue("battleResults", { defaultJobOptions: { removeOnComplete: true }, connection: RedisConfig });