import { BattleResolver } from "./battle";
import { BattleEventResolver } from "./battleEvent";
import { HeroResolver } from "./hero";
import { InventoryResolver } from './inventory';


export default [
    BattleResolver,
    BattleEventResolver,
    HeroResolver,
    InventoryResolver
] as const;