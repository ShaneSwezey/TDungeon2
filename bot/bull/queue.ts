import { Queue } from 'bullmq';

export const RoundQueue = new Queue("round", { defaultJobOptions: { removeOnComplete: true }});
export const HeroInputQueue = new Queue("heroInput", { defaultJobOptions: { removeOnComplete: true }});