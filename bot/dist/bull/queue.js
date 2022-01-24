"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BattleResultsQueue = exports.HeroInputQueue = exports.RoundQueue = void 0;
const bullmq_1 = require("bullmq");
const options_1 = require("../redis/options");
exports.RoundQueue = new bullmq_1.Queue("round", { defaultJobOptions: { removeOnComplete: true }, connection: options_1.RedisConfig });
exports.HeroInputQueue = new bullmq_1.Queue("heroInput", { defaultJobOptions: { removeOnComplete: true }, connection: options_1.RedisConfig });
exports.BattleResultsQueue = new bullmq_1.Queue("battleResults", { defaultJobOptions: { removeOnComplete: true }, connection: options_1.RedisConfig });
