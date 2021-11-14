"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const math_1 = require("../../../utils/math");
const generate_1 = require("../../helper/generate");
describe("Utilities Tests", () => {
    describe("Function selectRandomHeroes", () => {
        let randomNumber;
        let heroes;
        beforeEach(() => {
            randomNumber = math_1.getRandomInt(2, 50);
            heroes = generate_1.generateHeroes(randomNumber);
        });
        it("Less than heroes list length", () => {
            const lessThanRandomNumber = math_1.getRandomInt(1, randomNumber - 1);
            const selectedHeroes = math_1.selectRandomHeroes(heroes, lessThanRandomNumber);
            chai_1.expect(selectedHeroes.length).to.equal(lessThanRandomNumber);
        });
        it("Equal to heroes list length", () => {
            const selectedHeroes = math_1.selectRandomHeroes(heroes, heroes.length);
            chai_1.expect(selectedHeroes.length).to.equal(heroes.length);
        });
        it("Greater than heroes list length", () => {
            const selectedHeroes = math_1.selectRandomHeroes(heroes, heroes.length + 1);
            chai_1.expect(selectedHeroes.length).to.equal(heroes.length);
        });
    });
    describe("Function getRandomInt", () => {
        // run more that once
        it("Should be between", () => {
            const selectedInt = math_1.getRandomInt(1, 100);
            chai_1.expect(selectedInt).to.be.within(1, 100);
        });
    });
    describe("Function getStaminaPercentage", () => {
        it("Percentage between 0-100", () => {
            const currentHitPoints = math_1.getRandomInt(0, 100);
            const stamina = { maxHitPoints: 100, hitPoints: currentHitPoints };
            const calculatedPercentage = (currentHitPoints / 100) * 100;
            const percentage = math_1.getStaminaPercentage(stamina);
            chai_1.expect(percentage).to.equal(calculatedPercentage);
        });
    });
});
