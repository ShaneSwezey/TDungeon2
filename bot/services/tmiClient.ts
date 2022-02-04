import { client } from 'tmi.js';
import { joinBattle } from './battle';
import { ResponseType } from './enum/response';
import { createHero, getHeroTypes, setHeroAttackAction } from './hero';

const CHANNEL_NAME = process.env.CHANNEL_NAME;
const BOT_NAME = process.env.BOT_NAME;
const TOKEN = process.env.TOKEN;

enum Commands {
    HEROTYPES = "!heroTypes",
    HEROCREATE = "!heroCreate",
    BATTLEJOIN = "!battleJoin",
    ATTACK ="!Attack"
}

interface IResponse {
    type: ResponseType;
    text: string;
}

const twitchClient = new client({
    options: { debug: true },
    identity: {
        username: BOT_NAME,
        password: TOKEN
    },
    channels: [ CHANNEL_NAME! ]
});

const enactCommand = async (message: string, userName: string) => {
    try {
        const spaceIndex = message.indexOf(" ");
        const slicedMessage = spaceIndex === -1 ? message : message.slice(0, spaceIndex);
        switch(slicedMessage) {
            case Commands.HEROTYPES:
                return getHeroTypes();
            case Commands.HEROCREATE:
                return await createHero(message, userName);
            case Commands.BATTLEJOIN:
                return await joinBattle(userName);
            case Commands.ATTACK:
                return await setHeroAttackAction(userName);
            default:
                return { type: ResponseType.IGNORE, text: "Command not found!" };
        }
    } catch(error) {
        console.error('[enactCommand]', error);
        throw error;
    }
}

const responseFilter = async (channel: string, response: IResponse) => {
    console.log('response:', response);
    switch(response.type) {
        case ResponseType.MESSAGE:
            await twitchClient.say(channel, response.text);
            break;
        default:
            return;
    }
}

twitchClient.on("message", async (channel, tags, message, self) => {
    try {
        if (self || !message.startsWith("!")) return;
        const response = await enactCommand(message, tags.username!.toLowerCase());
        await responseFilter(channel, response);
    } catch(error) {
        console.error('message:', error);
        throw error;
    }
});

export { twitchClient };