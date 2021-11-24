"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.twitchClient = void 0;
const dank_twitch_irc_1 = require("dank-twitch-irc");
const responseType_1 = require("../enums/responseType");
const hero_1 = require("./hero");
const battle_1 = require("./battle");
const CHANNEL_NAME = "slipperytoads";
const BOTNAME = "tdungeonbot";
const token = 'oauth:pmdo7cc4znd1qgtjoo55e7fpta3pqi';
var Commands;
(function (Commands) {
    Commands["HEROTYPES"] = "!heroTypes";
    Commands["HEROCREATE"] = "!heroCreate";
    Commands["BATTLEJOIN"] = "!battleJoin";
    Commands["ATTACK"] = "Attack";
})(Commands || (Commands = {}));
const parseMessage = (msg) => {
    if (msg.indexOf(' ') === -1)
        return msg;
    else
        return msg.slice(0, msg.indexOf(' '));
};
const enactCommand = async (privmsgMessage) => {
    var _a;
    if (((_a = privmsgMessage.ircPrefix) === null || _a === void 0 ? void 0 : _a.username) === BOTNAME)
        return { type: responseType_1.ResponseType.IGNORE, text: "Messages from bot!" };
    switch (parseMessage(privmsgMessage.messageText)) {
        case Commands.HEROTYPES:
            return hero_1.getHeroTypes();
        case Commands.HEROCREATE:
            return await hero_1.createHero(privmsgMessage.messageText, privmsgMessage.senderUsername);
        case Commands.BATTLEJOIN:
            return await battle_1.joinBattle(privmsgMessage.senderUsername);
        case Commands.ATTACK:
            return await hero_1.setHeroAttackAction(privmsgMessage.senderUsername);
        default:
            return { type: responseType_1.ResponseType.IGNORE, text: "Command not found!" };
    }
};
const responseFilter = async (response, client, user) => {
    switch (response.type) {
        case responseType_1.ResponseType.MESSAGE:
            await client.say(CHANNEL_NAME, response.text);
            break;
        case responseType_1.ResponseType.WHISPER:
            await client.whisper(user, response.text);
            break;
        default:
            return;
    }
};
const twitchClient = new dank_twitch_irc_1.ChatClient({
    username: BOTNAME,
    password: token,
});
exports.twitchClient = twitchClient;
twitchClient.on("PRIVMSG", async (privMessage) => {
    const response = await enactCommand(privMessage);
    await responseFilter(response, twitchClient, "slipperytoads");
});
twitchClient.on("connecting", () => console.log(`Connecting to ${CHANNEL_NAME}...`));
