import { IAction } from "../interfaces/battleEvent";
import { IMonsterStats, IThief } from "../interfaces/monster";
export declare const thief: ({ id, currentHitPoints }: IMonsterStats) => IThief;
export declare const executeThiefAttack: (thief: IThief) => IAction[][];
//# sourceMappingURL=thief.d.ts.map