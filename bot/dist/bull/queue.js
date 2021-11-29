"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroInputQueue = exports.RoundQueue = void 0;
const bullmq_1 = require("bullmq");
exports.RoundQueue = new bullmq_1.Queue("round", { defaultJobOptions: { removeOnComplete: true } });
exports.HeroInputQueue = new bullmq_1.Queue("heroInput", { defaultJobOptions: { removeOnComplete: true } });
