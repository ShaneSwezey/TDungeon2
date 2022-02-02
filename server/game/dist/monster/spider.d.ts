import { Event } from "../enums/event";
import { IForestSpider, IMonsterStats } from "../interfaces/monster";
export declare const forestSpider: ({ id, currentHitPoints }: IMonsterStats) => IForestSpider;
export declare const executeForestSpiderAttack: (forestSpider: IForestSpider) => {
    events: Event[];
    value: number;
    isCrit: boolean;
    weapon: import("../interfaces/weapon").IWeapon;
}[][];
//# sourceMappingURL=spider.d.ts.map