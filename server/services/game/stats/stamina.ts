import { Armor } from "../gear/armor";

export interface Stamina {
    maxHitPoints: number;
    hitPoints: number;  // current hit points;
}

const getHitPointsMax = (armor: Armor[]) => armor.map(armor => armor.hitPoints).reduce((a, b) => a + b);

export const getStamina = (armor: Armor[], currentHitPoints?: string): Stamina => {
    const maxStamina = getHitPointsMax(armor);
    return {
        maxHitPoints: maxStamina,
        hitPoints: currentHitPoints ? parseInt(currentHitPoints) : maxStamina
    }
}