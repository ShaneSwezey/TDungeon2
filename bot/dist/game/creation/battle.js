"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewBattle = void 0;
const uuid_1 = require("uuid");
const createNewBattle = () => {
    return {
        id: uuid_1.v4(),
        roundList: [],
    };
};
exports.createNewBattle = createNewBattle;
