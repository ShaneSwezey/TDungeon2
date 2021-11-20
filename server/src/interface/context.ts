import { Request} from 'express';
import { BattleCollection } from '../../services/persistence/mongo/collections/battle';
import { BattleEventCollection } from '../../services/persistence/mongo/collections/battleEvent';
import { HeroCollection } from '../../services/persistence/mongo/collections/hero';

export interface Context {
    req: Request;
    battleCol: BattleCollection;
    heroCol: HeroCollection;
    battleEventCol: BattleEventCollection;
}