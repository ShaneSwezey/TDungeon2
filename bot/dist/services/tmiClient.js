"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.twitchClient = void 0;
const tmi_js_1 = require("tmi.js");
const battle_1 = require("./battle");
const response_1 = require("./enum/response");
const hero_1 = require("./hero");
const CHANNEL_NAME = process.env.CHANNEL_NAME;
const BOT_NAME = process.env.BOT_NAME;
const TOKEN = process.env.TOKEN;
var Commands;
(function (Commands) {
    Commands["HEROTYPES"] = "!heroTypes";
    Commands["HEROCREATE"] = "!heroCreate";
    Commands["BATTLEJOIN"] = "!battleJoin";
    Commands["ATTACK"] = "!Attack";
})(Commands || (Commands = {}));
const twitchClient = new tmi_js_1.client({
    options: { debug: true },
    identity: {
        username: BOT_NAME,
        password: TOKEN
    },
    channels: [CHANNEL_NAME]
});
exports.twitchClient = twitchClient;
twitchClient.on("message", async (channel, tags, message, self) => {
    try {
        if (self || !message.startsWith("!"))
            return;
        const response = await enactCommand(message, tags.username);
        await responseFilter(channel, response);
    }
    catch (error) {
        console.error('message:', error);
        throw error;
    }
});
const enactCommand = async (message, userName) => {
    switch (message) {
        case Commands.HEROTYPES:
            return (0, hero_1.getHeroTypes)();
        case Commands.HEROCREATE:
            return await (0, hero_1.createHero)(message, userName);
        case Commands.BATTLEJOIN:
            return await (0, battle_1.joinBattle)(userName);
        case Commands.ATTACK:
            return await (0, hero_1.setHeroAttackAction)(userName);
        default:
            return { type: response_1.ResponseType.IGNORE, text: "Command not found!" };
    }
};
const responseFilter = async (channel, response) => {
    switch (response.type) {
        case response_1.ResponseType.MESSAGE:
            await twitchClient.say(channel, response.text);
            break;
        default:
            return;
    }
};
