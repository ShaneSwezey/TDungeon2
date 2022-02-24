import { MonsterType } from "../enums/monster";
import { monsterFactory } from "../monster";
import { assert } from "chai";


describe("Monster", () => {
    describe("Create New Monster", () => {
        it("Create new Goblin", () => {
            const goblin = monsterFactory({
                type: MonsterType.GOBLIN
            });

            assert.typeOf(goblin, "object");
            assert.equal(goblin.type, MonsterType.GOBLIN);
        });
        
        it("Create new Orc", () => {
            const orc = monsterFactory({ type: MonsterType.ORC });
            
            assert.typeOf(orc, "object");
            assert.equal(orc.type, MonsterType.ORC);
        });

        it("Create new Ghoul", () => {
            const ghoul = monsterFactory({ type: MonsterType.GHOUL });
            
            assert.typeOf(ghoul, "object");
            assert.equal(ghoul.type, MonsterType.GHOUL);
        });

        it("Create new Thief", () => {
            const thief = monsterFactory({ type: MonsterType.THIEF });
            
            assert.typeOf(thief, "object");
            assert.equal(thief.type, MonsterType.THIEF);
        });

        it("Create new Forest Spider", () => {
            const forestSpider = monsterFactory({ type: MonsterType.FORESTSPIDER });
            
            assert.typeOf(forestSpider, "object");
            assert.equal(forestSpider.type, MonsterType.FORESTSPIDER);
        });

        it("Create new Centaur", () => {
            const centaur = monsterFactory({ type: MonsterType.CENTAUR });
            
            assert.typeOf(centaur, "object");
            assert.equal(centaur.type, MonsterType.CENTAUR);
        });

        it("Create new Bear Cub", () => {
            const bearCub = monsterFactory({ type: MonsterType.BEARCUB });
            
            assert.typeOf(bearCub, "object");
            assert.equal(bearCub.type, MonsterType.BEARCUB);
        });

        it("Create new Ogre", () => {
            const ogre = monsterFactory({ type: MonsterType.OGRE });
            
            assert.typeOf(ogre, "object");
            assert.equal(ogre.type, MonsterType.OGRE);
        });
    });
})