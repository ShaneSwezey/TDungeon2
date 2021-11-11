"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewBattle = void 0;
var uuid_1 = require("uuid");
var createNewBattle = function () {
    return {
        id: uuid_1.v4(),
        roundList: [],
    };
};
exports.createNewBattle = createNewBattle;
