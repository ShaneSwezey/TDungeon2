import { twitchClient } from './services/client';
import { TDungeonDB } from './mongo/collections/index';

const CHANNEL_NAME = "slipperytoads";

const bootstrap = async () => {
    try {
        const derp = await TDungeonDB.connect();
        if (derp) {
            await twitchClient.connect();
            await twitchClient.join(CHANNEL_NAME);
            await twitchClient.say(CHANNEL_NAME, "Tdungeon is online!");
        } else {
            throw Error('Problem connecting to Db');
        }
    } catch(error) {
        console.error('[bootstrap]', error);
        throw error;
    }
}

bootstrap();