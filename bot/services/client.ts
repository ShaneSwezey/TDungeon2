import { ChatClient, PrivmsgMessage } from 'dank-twitch-irc'; 
import { ResponseType } from '../enums/responseType';
import { Response } from '../interfaces/response';
import { getHeroTypes, createHero, setHeroAttackAction } from './hero';
import { joinBattle } from './battle';

const CHANNEL_NAME = "slipperytoads";
const BOTNAME = "tdungeonbot";
const token = 'oauth:pmdo7cc4znd1qgtjoo55e7fpta3pqi';

enum Commands {
    HEROTYPES = "!heroTypes",
    HEROCREATE = "!heroCreate",
    BATTLEJOIN = "!battleJoin",
    ATTACK ="!Attack"
}

const parseMessage = (msg: string) => {
    if (msg.indexOf(' ') === -1) return msg;
    else return msg.slice(0, msg.indexOf(' '));
}

const enactCommand = async (privmsgMessage: PrivmsgMessage): Promise<Response> => {
    if (privmsgMessage.ircPrefix?.username === BOTNAME) return { type: ResponseType.IGNORE, text: "Messages from bot!" };
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

const responseFilter = async (response: Response, client: ChatClient, user: string) => {
    switch(response.type) {
        case ResponseType.MESSAGE:
            await client.say(CHANNEL_NAME, response.text);
            break;
        case ResponseType.WHISPER:
            await client.whisper(user, response.text);
            break;
        default:
            return;
    }
}

const twitchClient = new ChatClient({
    username: BOTNAME,
    password: token,
});

twitchClient.on("PRIVMSG", async (privMessage) => {
    const response = await enactCommand(privMessage);
    await responseFilter(response, twitchClient, "slipperytoads");
});

twitchClient.on("connecting", () => console.log(`Connecting to ${CHANNEL_NAME}...`));

export { twitchClient };