import "reflect-metadata";
import express from 'express';
import Redis from 'ioredis';
import cors from "cors";
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'type-graphql';
import resolvers from './src/graphql/resolver/index';
import { MongoClient } from "mongodb";
import { BattleCollection } from "./services/persistence/mongo/collections/battle";
import { HeroCollection } from "./services/persistence/mongo/collections/hero";
import { BattleEventCollection } from "./services/persistence/mongo/collections/battleEvent";
import { RedisInstance } from "./services/persistence/redis/instance";

const expressPlayground = require("graphql-playground-middleware-express").default;
const PORT = process.env.PORT || 8000;

const client = new MongoClient("mongodb://127.0.0.1:27017");
const db = client.db('tdungeon');

// create new Battle
const BattleCol = new BattleCollection(db);
const HeroCol = new HeroCollection(db);
const BattleEventCol = new BattleEventCollection(db);

const bootstrap = async () => {
    try {
        const app = express();

        await client.connect();

        const redisInstance = new RedisInstance()

        const schema = await buildSchema({
            resolvers,
            dateScalarMode: "isoDate",
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
                battleCol: BattleCol,
                heroCol: HeroCol,
                battleEventCol: BattleEventCol,
            }
        })));

        app.get("/playground", expressPlayground({ endpoint: "/graphql" }));

        app.listen(PORT, () => console.log(`Server is running on PORT:${PORT}`));
    } catch(error) {
        console.error('[server]', error);
        throw error;
    }
};

bootstrap()
    .catch(async error => {
        console.error('[server]', error);
    }).finally(() => {

    });