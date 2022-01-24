import { Request} from 'express';
import { Mongo } from '../mongo/collections';
import { RedisInstance } from '../redis/instance';

export interface Context {
    req: Request;
    mongo: Mongo;
    redis: RedisInstance;
}