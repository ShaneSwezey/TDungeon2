import { BattleResolver } from "./battle";
import { BattleEventResolver } from "./battleEvent";
import { HeroResolver } from "./hero";


export default [
    BattleResolver,
    BattleEventResolver,
    HeroResolver
] as const;