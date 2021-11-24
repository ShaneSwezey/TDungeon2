import { Queue } from 'bullmq';

export const RoundQueue = new Queue("round");
export const HeroInputQueue = new Queue("heroInput");