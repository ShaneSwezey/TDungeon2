import { Queue } from 'bullmq';
import { getRedisConnectionConfig } from '../redis';

const NewBattleQueue = new Queue(
    "newBattle", 
    { 
        defaultJobOptions: { removeOnComplete: true },
        connection: getRedisConnectionConfig(),
    }, 
);

export { NewBattleQueue };