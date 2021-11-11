"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewRound = void 0;
var createNewRound = function (previousRoundNumber) {
    var number;
    if (previousRoundNumber)
        number = ++previousRoundNumber;
    else
        number = 0;
    return { number: number, eventList: [] };
};
exports.createNewRound = createNewRound;
