import { Round } from "../game/round";

export const createNewRound = (previousRoundNumber?: number): Round => {
    let number;
    if (previousRoundNumber) number = ++previousRoundNumber;
    else number = 0;
    return { number, eventList: [] };
}