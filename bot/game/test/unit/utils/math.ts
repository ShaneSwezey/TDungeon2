import { expect } from "chai";
import { Hero } from "../../../hero";
import { Stamina } from "../../../stats/stamina";
import { getRandomInt, getStaminaPercentage, selectRandomHeroes } from "../../../utils/math";
import { generateHeroes } from "../../helper/generate";


describe("Utilities Tests", () => {
    describe("Function selectRandomHeroes", () => {
        let randomNumber: number;
        let heroes: Hero[];

        beforeEach(() => {
            randomNumber = getRandomInt(2, 50);
            heroes = generateHeroes(randomNumber);
        });

        it("Less than heroes list length", () => {
            const lessThanRandomNumber = getRandomInt(1, randomNumber - 1);
            const selectedHeroes = selectRandomHeroes(heroes, lessThanRandomNumber);
            expect(selectedHeroes.length).to.equal(lessThanRandomNumber);
        });

        it("Equal to heroes list length", () => {
            const selectedHeroes = selectRandomHeroes(heroes, heroes.length);
            expect(selectedHeroes.length).to.equal(heroes.length);
        });

        it("Greater than heroes list length", () => {
            const selectedHeroes = selectRandomHeroes(heroes, heroes.length + 1);
            expect(selectedHeroes.length).to.equal(heroes.length);
        });
    });

    describe("Function getRandomInt", () => {
        // run more that once
        it("Should be between", () => {
            const selectedInt = getRandomInt(1, 100);
            expect(selectedInt).to.be.within(1, 100);
        });
    });

    describe("Function getStaminaPercentage", () => {
        it("Percentage between 0-100", () => {
            const currentHitPoints = getRandomInt(0, 100);
            const stamina: Stamina = { maxHitPoints: 100, hitPoints: currentHitPoints };
            const calculatedPercentage = (currentHitPoints / 100) * 100;
            const percentage = getStaminaPercentage(stamina);
            expect(percentage).to.equal(calculatedPercentage);
        })
    });
    
});