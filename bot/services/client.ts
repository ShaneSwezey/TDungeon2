import { ChatClient, PrivmsgMessage } from 'dank-twitch-irc'; 
import { getHeroTypes, createHero, setHeroAttackAction } from './hero';
import { joinBattle } from './battle';
import { ResponseType } from './enum/response';
import { ChannelName } from '../bull/enums/channel';

const CHANNEL_NAME = process.env.CHANNEL_NAME;
const BOT_NAME = process.env.BOT_NAME;
const token = process.env.TOKEN;

enum Commands {
    HEROTYPES = "!heroTypes",
    HEROCREATE = "!heroCreate",
    BATTLEJOIN = "!battleJoin",
    ATTACK ="!Attack"
}

interface IResponse {
    type: ResponseType
    text: string;
}

const parseMessage = (msg: string) => {
    if (msg.indexOf(' ') === -1) return msg;
    else return msg.slice(0, msg.indexOf(' '));
}

const enactCommand = async (privmsgMessage: PrivmsgMessage): Promise<IResponse> => {
    if (privmsgMessage.ircPrefix?.username === BOT_NAME) return { type: ResponseType.IGNORE, text: "Messages from bot!" };
    switch(parseMessage(privmsgMessage.messageText)) {
        case Commands.HEROTYPES:
            return getHeroTypes();
        case Commands.HEROCREATE:
            return await createHero(privmsgMessage.messageText, privmsgMessage.senderUsername);
        case Commands.BATTLEJOIN:
            return await joinBattle(privmsgMessage.senderUsername);
        case Commands.ATTACK:
            return await setHeroAttackAction(privmsgMessage.senderUsername);
        default:
            return { type: ResponseType.IGNORE, text: "Command not found!" };
    }
}

const responseFilter = async (response: IResponse, client: ChatClient, user: string) => {
    switch(response.type) {
        case ResponseType.MESSAGE:
            await client.say(ChannelName.SLIPPERYTOADS, response.text);
            break;
        case ResponseType.WHISPER:
            await client.whisper(user, response.text);
            break;
        default:
            return;
    }
}

console.log('CHANNEL_NAME:', CHANNEL_NAME);
console.log('BOT_NAME:', BOT_NAME);

const twitchClient = new ChatClient({
    username: BOT_NAME,
    password: token,
});

twitchClient.on("PRIVMSG", async (privMessage) => {
    const response = await enactCommand(privMessage);
    await responseFilter(response, twitchClient, "slipperytoads");
});

twitchClient.on("connecting", () => console.log(`Connecting to ${CHANNEL_NAME}...`));

export { twitchClient };