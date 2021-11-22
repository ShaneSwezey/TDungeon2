"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./services/client");
const index_1 = require("./mongo/collections/index");
const CHANNEL_NAME = "slipperytoads";
const bootstrap = async () => {
    try {
        const derp = await index_1.TDungeonDB.connect();
        if (derp) {
            await client_1.twitchClient.connect();
            await client_1.twitchClient.join(CHANNEL_NAME);
            await client_1.twitchClient.say(CHANNEL_NAME, "Tdungeon is online!");
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
bootstrap();
