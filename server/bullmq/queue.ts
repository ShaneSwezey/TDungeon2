import { Queue } from 'bullmq';

const NewBattleQueue = new Queue("newBattle");

export { NewBattleQueue };