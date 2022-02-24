import { HeroType } from "../enums/hero";
import { newHeroFactory } from "../hero";
import faker from "@faker-js/faker";
import { assert } from "chai";

describe("Hero", () => {
    describe("Create New Hero", () => {
        it("Create new Warrior", () => {
            const warrior = newHeroFactory({
                type: HeroType.WARRIOR,
                name: faker.name.firstName()
            });

            assert.typeOf(warrior, "object");
            assert.equal(warrior.type, HeroType.WARRIOR);
        });

        it("Create new Rogue", () => {
            const warrior = newHeroFactory({
                type: HeroType.ROGUE,
                name: faker.name.firstName()
            });

            assert.typeOf(warrior, "object");
            assert.equal(warrior.type, HeroType.ROGUE);
        });

        it("Create new Ranger", () => {
            const warrior = newHeroFactory({
                type: HeroType.RANGER,
                name: faker.name.firstName()
            });

            assert.typeOf(warrior, "object");
            assert.equal(warrior.type, HeroType.RANGER);
        });
    })
});