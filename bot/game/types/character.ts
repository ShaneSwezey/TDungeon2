import { IBattleEventHero } from "../interfaces/hero";
import { IBattleEventMonster } from "../interfaces/monster";

export type BattleEventCharacter = IBattleEventHero | IBattleEventMonster;