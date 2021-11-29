import { Queue } from 'bullmq';

const NewBattleQueue = new Queue("newBattle", { defaultJobOptions: { removeOnComplete: true }});

export { NewBattleQueue };