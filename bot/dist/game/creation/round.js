"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewRound = void 0;
const createNewRound = (previousRoundNumber) => {
    let number;
    if (previousRoundNumber)
        number = ++previousRoundNumber;
    else
        number = 0;
    return { number, eventList: [] };
};
exports.createNewRound = createNewRound;
