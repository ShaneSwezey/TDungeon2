"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const index_1 = require("./mongo/collections/index");
const worker_1 = require("./bull/worker");
const bullmq_1 = require("bullmq");
const options_1 = require("./redis/options");
const tmiClient_1 = require("./services/tmiClient");
const CHANNEL_NAME = "slipperytoads";
const bootstrap = async () => {
    try {
        const isDBConnected = await index_1.TDungeonDB.connect();
        if (isDBConnected) {
            await tmiClient_1.twitchClient.connect();
            await tmiClient_1.twitchClient.say(CHANNEL_NAME, "Tdungeon is online!");
            const redisConfig = (0, options_1.getRedisConnectionConfig)();
            const roundQueueScheduler = new bullmq_1.QueueScheduler("round", { connection: redisConfig });
            const heroInputQueueScheduler = new bullmq_1.QueueScheduler("heroInput", { connection: redisConfig });
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
