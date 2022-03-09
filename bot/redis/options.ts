import { RedisOptions } from 'ioredis';
import { Environment } from '../enum/environment';

export const getRedisConnectionConfig = (): RedisOptions => {
    switch(process.env.NODE_ENV) {
        case Environment.DEV:
            return {
                host: "127.0.0.1",
                port: 6379
            };
        case Environment.DOCKERDEV:
            return {
                host: "host.docker.internal",
                port: 6379
            };
        case Environment.PRODUCTION:
            return {
                host: "redis",
                port: 6379
            };
        default:
            return {
                host: "host.docker.internal",
                port: 6379
            };
    }
}