import { IAction } from "../interfaces/action";
import { IMonsterStats, IOgre } from "../interfaces/monster";
export declare const ogre: ({ id, currentHitPoints }: IMonsterStats) => IOgre;
export declare const executeOgreAttack: (ogre: IOgre) => IAction[][];
//# sourceMappingURL=ogre.d.ts.map