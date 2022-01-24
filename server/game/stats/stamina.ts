import { IArmor } from "../interfaces/armor";
import { IStamina } from "../interfaces/stamina";

const getHitPointsMax = (armor: IArmor[]) => armor.map(armor => armor.hitPoints).reduce((a, b) => a + b);

export const getStamina = (armor: IArmor[], currentHitPoints?: string): IStamina => {
    const maxStamina = getHitPointsMax(armor);
    return {
        maxHitPoints: maxStamina,
        hitPoints: currentHitPoints ? parseInt(currentHitPoints) : maxStamina
    }
}

export const isDeathBlow = (stamina: IStamina): boolean => stamina.hitPoints <= 0;