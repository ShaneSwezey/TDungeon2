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


twitchClient.on("message", async (channel, tags, message, self) => {
    try {
        if (self || !message.startsWith("!")) return;
        const response = await enactCommand(message, tags.username!);
        await responseFilter(channel, response);
    } catch(error) {
        console.error('message:', error);
        throw error;
    }
});

const enactCommand = async (message: string, userName: string) => {
    switch(message.slice(0, message.indexOf(' '))) {
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
}

const responseFilter = async (channel: string, response: IResponse) => {
    switch(response.type) {
        case ResponseType.MESSAGE:
            await twitchClient.say(channel, response.text);
            break;
        default:
            return;
    }
}

export { twitchClient };