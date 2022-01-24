import { upperFirst } from "lodash";
import { HeroType } from "../enums/hero";

export const getHeroClassImageSrc = (heroType: HeroType) => {
    switch(heroType) {
        case HeroType.RANGER:
            return "https://tdungeon.s3.us-west-2.amazonaws.com/heroes/ranger.svg";
        case HeroType.ROGUE:
            return "https://tdungeon.s3.us-west-2.amazonaws.com/heroes/rogue.svg";
        case HeroType.MAGE:
            return "https://tdungeon.s3.us-west-2.amazonaws.com/heroes/mage.svg";
        case HeroType.SORCERER:
            return "https://tdungeon.s3.us-west-2.amazonaws.com/heroes/sorcerer.svg";
        case HeroType.PRIEST:
            return "https://tdungeon.s3.us-west-2.amazonaws.com/heroes/priest.svg";
        case HeroType.WARRIOR:
            return "https://tdungeon.s3.us-west-2.amazonaws.com/heroes/warrior.svg";
        default:
            return "";
    }
}

export const getHeroHitClassImageSrc = (heroType: HeroType) => {
    switch(heroType) {
        case HeroType.RANGER:
            return "https://tdungeon.s3.us-west-2.amazonaws.com/heroes/ranger-red.svg";
        case HeroType.ROGUE:
            return "https://tdungeon.s3.us-west-2.amazonaws.com/heroes/rogue-red.svg";
        case HeroType.MAGE:
            return "https://tdungeon.s3.us-west-2.amazonaws.com/heroes/mage-red.svg";
        case HeroType.SORCERER:
            return "https://tdungeon.s3.us-west-2.amazonaws.com/heroes/sorcerer-red.svg";
        case HeroType.PRIEST:
            return "https://tdungeon.s3.us-west-2.amazonaws.com/heroes/priest-red.svg";
        case HeroType.WARRIOR:
            return "https://tdungeon.s3.us-west-2.amazonaws.com/heroes/warrior-red.svg";
        default:
            return "";
    }
}

export const formatHeroType = (heroType: HeroType) => {
    switch(heroType) {
        case HeroType.WARRIOR:
            return upperFirst(heroType.toLowerCase());
        case HeroType.ROGUE:
            return upperFirst(heroType.toLowerCase());
        case HeroType.RANGER:
            return upperFirst(heroType.toLowerCase());
        case HeroType.MAGE:
            return upperFirst(heroType.toLowerCase());
        case HeroType.SORCERER:
            return upperFirst(heroType.toLowerCase());
        case HeroType.PRIEST:
            return upperFirst(heroType.toLowerCase());
        default:
            return "Unkown";
    }
}

