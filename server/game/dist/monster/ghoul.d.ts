import { IGhoul, IMonsterStats } from "../interfaces/monster";
import { IAction } from "../interfaces/action";
export declare const ghoul: ({ id, currentHitPoints }: IMonsterStats) => IGhoul;
export declare const executeGhoulAttack: (ghoul: IGhoul) => IAction[][];
//# sourceMappingURL=ghoul.d.ts.map