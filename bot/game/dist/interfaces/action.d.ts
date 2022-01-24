import { Event } from "../enums/event";
import { IWeapon } from "./weapon";
export interface IAction {
    type: Event[];
    value?: number;
    isCrit?: boolean;
    weapon?: IWeapon;
}
//# sourceMappingURL=action.d.ts.map