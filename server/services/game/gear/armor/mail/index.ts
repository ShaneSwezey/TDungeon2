import { Armor, ArmorType } from '..';

export interface Mail extends Armor {
    type: ArmorType.MAIL;
}