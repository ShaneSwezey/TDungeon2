import { IHero } from "../interfaces/hero";
import { IMonster, IMonsterStats } from "../interfaces/monster";
export declare const monsterExecutionSwitch: (monster: IMonster) => import("../interfaces/battleEvent").IAction[][];
export declare const monsterFactory: (monsterStats: IMonsterStats) => IMonster;
export declare const createMonsters: (hero: IHero) => IMonster;
//# sourceMappingURL=index.d.ts.map