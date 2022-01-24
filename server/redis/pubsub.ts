import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis from "ioredis";
import { getRedisConnectionConfig } from '.';

const redisConfig = getRedisConnectionConfig()

export const pubSub = new RedisPubSub({
    publisher: new Redis(redisConfig),
    subscriber: new Redis(redisConfig)
});