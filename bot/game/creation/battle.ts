import { v4 as uuidv4 } from 'uuid';
import { Battle } from '../game/battle';

export const createNewBattle = (): Battle => {
    return {
        id: uuidv4(),
        roundList: [],
    }
}