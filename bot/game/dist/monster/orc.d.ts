import { IAction } from '../interfaces/action';
import { IMonsterStats, IOrc } from '../interfaces/monster';
export declare const orc: ({ id, currentHitPoints }: IMonsterStats) => IOrc;
export declare const executeOrcAttack: (orc: IOrc) => IAction[][];
//# sourceMappingURL=orc.d.ts.map