import { IAction } from "../interfaces/action";
import { ICentaur, IMonsterStats } from "../interfaces/monster";
export declare const centaur: ({ id, currentHitPoints }: IMonsterStats) => ICentaur;
export declare const executeCentaurAttack: (centaur: ICentaur) => IAction[][];
//# sourceMappingURL=centaur.d.ts.map