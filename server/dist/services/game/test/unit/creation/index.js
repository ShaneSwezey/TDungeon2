"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var hero_1 = require("../../../creation/hero");
var hero_2 = require("../../../hero");
var monster_1 = require("../../../creation/monster");
var monster_2 = require("../../../monster");
describe("Creation Functions", function () {
    describe("Hero creations", function () {
        it("Should return Melee hero", function () {
            var meleeHero = hero_1.createNewHero("Shane", hero_2.HeroType.Melee);
            chai_1.expect(meleeHero).to.be.an("object"); // improve
            chai_1.expect(meleeHero.type).to.equal(hero_2.HeroType.Melee);
        });
        it("Should return Ranged hero", function () {
            var meleeHero = hero_1.createNewHero("Shane", hero_2.HeroType.Ranged);
            chai_1.expect(meleeHero).to.be.an("object");
            chai_1.expect(meleeHero.type).to.equal(hero_2.HeroType.Ranged);
        });
        it("Should return Caster hero", function () {
            var meleeHero = hero_1.createNewHero("Shane", hero_2.HeroType.Caster);
            chai_1.expect(meleeHero).to.be.an("object");
            chai_1.expect(meleeHero.type).to.equal(hero_2.HeroType.Caster);
        });
    });
    describe("Monster creations", function () {
        it("Should return Goblin monster", function () {
            var goblin = monster_1.monsterFactory(monster_2.MonsterType.Goblin);
            chai_1.expect(goblin).to.be.an("object");
            chai_1.expect(goblin.type).to.equal(monster_2.MonsterType.Goblin);
        });
        it("Should return Orc monster", function () {
            var orc = monster_1.monsterFactory(monster_2.MonsterType.Orc);
            chai_1.expect(orc).to.be.an("object");
            chai_1.expect(orc.type).to.equal(monster_2.MonsterType.Orc);
        });
        it("Should return Ogre monster", function () {
            var ogre = monster_1.monsterFactory(monster_2.MonsterType.Ogre);
            chai_1.expect(ogre).to.be.an("object");
            chai_1.expect(ogre.type).to.equal(monster_2.MonsterType.Ogre);
        });
    });
});
