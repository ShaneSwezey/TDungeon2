"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.twitchClient = void 0;
const dank_twitch_irc_1 = require("dank-twitch-irc");
const hero_1 = require("./hero");
const battle_1 = require("./battle");
const response_1 = require("./enum/response");
const channel_1 = require("../bull/enums/channel");
const CHANNEL_NAME = process.env.CHANNEL_NAME;
const BOT_NAME = process.env.BOT_NAME;
const token = process.env.TOKEN;
var Commands;
(function (Commands) {
    Commands["HEROTYPES"] = "!heroTypes";
    Commands["HEROCREATE"] = "!heroCreate";
    Commands["BATTLEJOIN"] = "!battleJoin";
    Commands["ATTACK"] = "!Attack";
})(Commands || (Commands = {}));
const parseMessage = (msg) => {
    if (msg.indexOf(' ') === -1)
        return msg;
    else
        return msg.slice(0, msg.indexOf(' '));
};
const enactCommand = async (privmsgMessage) => {
    var _a;
    if (((_a = privmsgMessage.ircPrefix) === null || _a === void 0 ? void 0 : _a.username) === BOT_NAME)
        return { type: response_1.ResponseType.IGNORE, text: "Messages from bot!" };
    switch (parseMessage(privmsgMessage.messageText)) {
        case Commands.HEROTYPES:
            return (0, hero_1.getHeroTypes)();
        case Commands.HEROCREATE:
            return await (0, hero_1.createHero)(privmsgMessage.messageText, privmsgMessage.senderUsername);
        case Commands.BATTLEJOIN:
            return await (0, battle_1.joinBattle)(privmsgMessage.senderUsername);
        case Commands.ATTACK:
            return await (0, hero_1.setHeroAttackAction)(privmsgMessage.senderUsername);
        default:
            return { type: response_1.ResponseType.IGNORE, text: "Command not found!" };
    }
};
const responseFilter = async (response, client, user) => {
    switch (response.type) {
        case response_1.ResponseType.MESSAGE:
            await client.say(channel_1.ChannelName.SLIPPERYTOADS, response.text);
            break;
        case response_1.ResponseType.WHISPER:
            await client.whisper(user, response.text);
            break;
        default:
            return;
    }
};
console.log('CHANNEL_NAME:', CHANNEL_NAME);
console.log('BOT_NAME:', BOT_NAME);
const twitchClient = new dank_twitch_irc_1.ChatClient({
    username: BOT_NAME,
    password: token,
});
exports.twitchClient = twitchClient;
twitchClient.on("PRIVMSG", async (privMessage) => {
    const response = await enactCommand(privMessage);
    await responseFilter(response, twitchClient, "slipperytoads");
});
twitchClient.on("connecting", () => console.log(`Connecting to ${CHANNEL_NAME}...`));
