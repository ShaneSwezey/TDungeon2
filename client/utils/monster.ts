import { MonsterType } from "../enums/monster";

export const getMonsterImageSrc = (monsterType: MonsterType) => {
    switch(monsterType) {
        case MonsterType.GHOUL:
            return "https://tdungeon.s3.us-west-2.amazonaws.com/monsters/ghoul.svg";
        case MonsterType.GOBLIN:
            return "https://tdungeon.s3.us-west-2.amazonaws.com/monsters/goblin.svg";
        case MonsterType.ORC:
            return "https://tdungeon.s3.us-west-2.amazonaws.com/monsters/orc.svg";
        case MonsterType.OGRE:
            return "https://tdungeon.s3.us-west-2.amazonaws.com/monsters/ogre.svg";
        case MonsterType.THIEF:
            return "https://tdungeon.s3.us-west-2.amazonaws.com/monsters/robber.svg";
        case MonsterType.FORESTSPIDER:
            return "https://tdungeon.s3.us-west-2.amazonaws.com/monsters/spider-alt.svg";
        case MonsterType.BEARCUB:
            return "https://tdungeon.s3.us-west-2.amazonaws.com/monsters/bear-head.svg";
        case MonsterType.CENTAUR:
            return "https://tdungeon.s3.us-west-2.amazonaws.com/monsters/centaur.svg";
        default:
            return ""; // need to add placeholder image
    }
}

export const getMonsterHitImageSrc = (monsterType: MonsterType) => {
    switch(monsterType) {
        case MonsterType.GHOUL:
            return "https://tdungeon.s3.us-west-2.amazonaws.com/monsters/ghoul-red.svg";
        case MonsterType.GOBLIN:
            return "https://tdungeon.s3.us-west-2.amazonaws.com/monsters/goblin-red.svg";
        case MonsterType.ORC:
            return "https://tdungeon.s3.us-west-2.amazonaws.com/monsters/orc-red.svg";
        case MonsterType.OGRE:
            return "https://tdungeon.s3.us-west-2.amazonaws.com/monsters/ogre-red.svg";
        case MonsterType.THIEF:
            return "https://tdungeon.s3.us-west-2.amazonaws.com/monsters/robber-red.svg";
        case MonsterType.FORESTSPIDER:
            return "https://tdungeon.s3.us-west-2.amazonaws.com/monsters/spider-red.svg";
        case MonsterType.BEARCUB:
            return "https://tdungeon.s3.us-west-2.amazonaws.com/monsters/bear-head-red.svg";
        case MonsterType.CENTAUR:
            return "https://tdungeon.s3.us-west-2.amazonaws.com/monsters/centaur-red.svg";
        default:
            return ""; // need to add placeholder image
    }
}