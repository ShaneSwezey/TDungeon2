import "reflect-metadata";
import express from 'express';
import cors from "cors";
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'type-graphql';
import resolvers from './graphql/resolver/index';
import { MongoClient } from "mongodb";
import { RedisInstance } from "./redis/instance";
import { Mongo } from "./mongo/collections";
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import Redis from "ioredis";
import { pubSub } from "./redis/pubsub";
import { BattleResultsWorker } from "./bullmq/worker";
import { getRedisConnectionConfig } from "./redis";
import { getMongoConnectionString } from "./mongo";

const expressPlayground = require("graphql-playground-middleware-express").default;
const PORT = process.env.PORT || 8000;

const client = new MongoClient(getMongoConnectionString());
const db = client.db('tdungeon');

const mongo = new Mongo(db);
const redis = new Redis(getRedisConnectionConfig());

const bootstrap = async () => {
    try {
        BattleResultsWorker.on("failed", (job, err) => console.error(`Job #${job.id} - Error:`, err));
        
        const app = express();

        await client.connect();

        const redisInstance = new RedisInstance(redis);

        const schema = await buildSchema({
            resolvers,
            dateScalarMode: "isoDate",
            pubSub
        });

        app.use(cors({
            origin: "http://localhost:3000",
            credentials: true 
        }));

        app.use("/graphql", graphqlHTTP(async (request) => ({
            schema,
            graphiql: false,
            context: {
                redis: redisInstance,
                req: request,
                mongo
            }
        })));

        app.get("/playground", expressPlayground({ endpoint: "/graphql" }));

        const server = app.listen(PORT, () => {
            const wsServer = new WebSocketServer({
                server,
                path: "/graphql"
            });

            useServer({ schema }, wsServer);
            console.log(`[Server] is running on PORT: ${PORT}`)
        });
    } catch(error) {
        console.error('[server]', error);
        throw error;
    }
};

const startGraceFulShutdown = async () => {
    try {
        console.log('Starting graceful shutdown of server...');
        redis.disconnect();
        await client.close();
    } catch(error) {
        console.error('[startGraceFulShutdown]', error);
        throw error;
    }
}

process.on("SIGTERM", startGraceFulShutdown);
process.on("SIGINT", startGraceFulShutdown);

bootstrap()
    .catch(async error => {
        console.error('[server]', error);
    });