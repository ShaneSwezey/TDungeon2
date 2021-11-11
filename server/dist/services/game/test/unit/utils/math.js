"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var math_1 = require("../../../utils/math");
var generate_1 = require("../../helper/generate");
describe("Utilities Tests", function () {
    describe("Function selectRandomHeroes", function () {
        var randomNumber;
        var heroes;
        beforeEach(function () {
            randomNumber = math_1.getRandomInt(2, 50);
            heroes = generate_1.generateHeroes(randomNumber);
        });
        it("Less than heroes list length", function () {
            var lessThanRandomNumber = math_1.getRandomInt(1, randomNumber - 1);
            var selectedHeroes = math_1.selectRandomHeroes(heroes, lessThanRandomNumber);
            chai_1.expect(selectedHeroes.length).to.equal(lessThanRandomNumber);
        });
        it("Equal to heroes list length", function () {
            var selectedHeroes = math_1.selectRandomHeroes(heroes, heroes.length);
            chai_1.expect(selectedHeroes.length).to.equal(heroes.length);
        });
        it("Greater than heroes list length", function () {
            var selectedHeroes = math_1.selectRandomHeroes(heroes, heroes.length + 1);
            chai_1.expect(selectedHeroes.length).to.equal(heroes.length);
        });
    });
    describe("Function getRandomInt", function () {
        // run more that once
        it("Should be between", function () {
            var selectedInt = math_1.getRandomInt(1, 100);
            chai_1.expect(selectedInt).to.be.within(1, 100);
        });
    });
    describe("Function getStaminaPercentage", function () {
        it("Percentage between 0-100", function () {
            var currentHitPoints = math_1.getRandomInt(0, 100);
            var stamina = { maxHitPoints: 100, hitPoints: currentHitPoints };
            var calculatedPercentage = (currentHitPoints / 100) * 100;
            var percentage = math_1.getStaminaPercentage(stamina);
            chai_1.expect(percentage).to.equal(calculatedPercentage);
        });
    });
});
