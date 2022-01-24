import { IArmor } from "./armor";
import { IWeapon } from "./weapon";

export interface IDroppedItem {
    armor?: IArmor;
    weapon?: IWeapon;
}