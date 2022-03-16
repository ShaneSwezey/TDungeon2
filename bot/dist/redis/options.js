"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRedisConnectionConfig = void 0;
const environment_1 = require("../enum/environment");
const getRedisConnectionConfig = () => {
    switch (process.env.NODE_ENV) {
        case environment_1.Environment.DEV:
            return {
                host: "127.0.0.1",
                port: 6379
            };
        case environment_1.Environment.DOCKERDEV:
            return {
                host: "redis",
                port: 6379
            };
        case environment_1.Environment.PRODUCTION:
            return {
                host: "redis",
                port: 6379
            };
        default:
            return {
                host: "redis",
                port: 6379
            };
    }
};
exports.getRedisConnectionConfig = getRedisConnectionConfig;
