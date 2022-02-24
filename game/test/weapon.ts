import { knifeFactory } from "../../game/gear/weapon/knives";
import { BowName, KnifeName, OneHandedAxeName, OneHandedSwordName, StaffName, TwoHandedAxeName, TwoHandedSwordName, WeaponType } from "../enums/weapon";
import { assert } from "chai";
import { bowFactory } from "../gear/weapon/bow";
import { oneHandedAxeFactory } from "../gear/weapon/oneHandedAxes";
import { oneHandedSwordFactory } from "../gear/weapon/oneHandedSwords";
import { staffFactory } from "../gear/weapon/staffs";
import { twoHandedAxeFactory } from "../gear/weapon/twoHandedAxes";
import { twoHandedSwordFactory } from "../gear/weapon/twoHandedSword";

describe("Weapon", () => {
    describe("Create New Knife", () => {
        it("Create Butter Knife", () => {
            const butterKnife = knifeFactory(KnifeName.BUTTERKNIFE);

            assert.typeOf(butterKnife, "object");
            assert.equal(butterKnife.name, KnifeName.BUTTERKNIFE);
            assert.equal(butterKnife.type, WeaponType.KNIFE);
        });

        it("Create Kris Knife", () => {
            const krisKnife = knifeFactory(KnifeName.KRISBLADE);

            assert.typeOf(krisKnife, "object");
            assert.equal(krisKnife.name, KnifeName.KRISBLADE);
            assert.equal(krisKnife.type, WeaponType.KNIFE);
        });

        it("Create Letter Knife", () => {
            const letterOpener = knifeFactory(KnifeName.LETTEROPENER);

            assert.typeOf(letterOpener, "object");
            assert.equal(letterOpener.name, KnifeName.LETTEROPENER);
            assert.equal(letterOpener.type, WeaponType.KNIFE);
        });

        it("Create Thief Knife", () => {
            const thiefBlade = knifeFactory(KnifeName.THIEFBLADE);

            assert.typeOf(thiefBlade, "object");
            assert.equal(thiefBlade.name, KnifeName.THIEFBLADE);
            assert.equal(thiefBlade.type, WeaponType.KNIFE);
        });

        it("Create Shank", () => {
            const shank = knifeFactory(KnifeName.SHANK);

            assert.typeOf(shank, "object");
            assert.equal(shank.name, KnifeName.SHANK);
            assert.equal(shank.type, WeaponType.KNIFE);
        });
    });

    describe("Create New Bow", () => {
        it("Create Twig Bow", () => {
            const twigBow = bowFactory(BowName.TWIGBOW);

            assert.typeOf(twigBow, "object");
            assert.equal(twigBow.name, BowName.TWIGBOW);
            assert.equal(twigBow.type, WeaponType.BOW);
        });

        it("Create Cracked Oak Bow", () => {
            const crakedOakBow = bowFactory(BowName.CRACKEDOAKBOW);

            assert.typeOf(crakedOakBow, "object");
            assert.equal(crakedOakBow.name, BowName.CRACKEDOAKBOW);
            assert.equal(crakedOakBow.type, WeaponType.BOW);
        });

        it("Create Woodsman Bow", () => {
            const woodsmanBow = bowFactory(BowName.WOODSMANBOW);

            assert.typeOf(woodsmanBow, "object");
            assert.equal(woodsmanBow.name, BowName.WOODSMANBOW);
            assert.equal(woodsmanBow.type, WeaponType.BOW);
        });

        it("Create Eleven's Solider Bow", () => {
            const elevenSoliderBow = bowFactory(BowName.ELEVENSOLIDERBOW);

            assert.typeOf(elevenSoliderBow, "object");
            assert.equal(elevenSoliderBow.name, BowName.ELEVENSOLIDERBOW);
            assert.equal(elevenSoliderBow.type, WeaponType.BOW);
        });

        it("Create Plain's Troll Bow", () => {
            const plainsTrollBow = bowFactory(BowName.PLAINSTROLLBOW);

            assert.typeOf(plainsTrollBow, "object");
            assert.equal(plainsTrollBow.name, BowName.PLAINSTROLLBOW);
            assert.equal(plainsTrollBow.type, WeaponType.BOW);
        });
    });

    describe("Create New One Handed Axe", () => {
        it("Create Rusty Axe", () => {
            const rustyAxe = oneHandedAxeFactory(OneHandedAxeName.RUSTYAXE);

            assert.typeOf(rustyAxe, "object");
            assert.equal(rustyAxe.name, OneHandedAxeName.RUSTYAXE);
            assert.equal(rustyAxe.type, WeaponType.ONEHANDEDAXE);
        });

        it("Create Hatchet", () => {
            const hatchet = oneHandedAxeFactory(OneHandedAxeName.HATCHET);

            assert.typeOf(hatchet, "object");
            assert.equal(hatchet.name, OneHandedAxeName.HATCHET);
            assert.equal(hatchet.type, WeaponType.ONEHANDEDAXE);
        });

        it("Create Lumber Wicker", () => {
            const lumberWicker = oneHandedAxeFactory(OneHandedAxeName.LUMBERWICKER);

            assert.typeOf(lumberWicker, "object");
            assert.equal(lumberWicker.name, OneHandedAxeName.LUMBERWICKER);
            assert.equal(lumberWicker.type, WeaponType.ONEHANDEDAXE);
        });
    });

    describe("Create New One Handed Sword", () => {
        it("Create Rusty Sword", () => {
            const rustySword = oneHandedSwordFactory(OneHandedSwordName.RUSTYSWORD);

            assert.typeOf(rustySword, "object");
            assert.equal(rustySword.name, OneHandedSwordName.RUSTYSWORD);
            assert.equal(rustySword.type, WeaponType.ONEHANDEDSWORD);
        });

        it("Create Cracled Sabre Sword", () => {
            const crackedSabre = oneHandedSwordFactory(OneHandedSwordName.CRACKEDSABRE);

            assert.typeOf(crackedSabre, "object");
            assert.equal(crackedSabre.name, OneHandedSwordName.CRACKEDSABRE);
            assert.equal(crackedSabre.type, WeaponType.ONEHANDEDSWORD);
        });

        it("Create Copper Blade Sword", () => {
            const copperBlade = oneHandedSwordFactory(OneHandedSwordName.COPPERBLADE);

            assert.typeOf(copperBlade, "object");
            assert.equal(copperBlade.name, OneHandedSwordName.COPPERBLADE);
            assert.equal(copperBlade.type, WeaponType.ONEHANDEDSWORD);
        });

        it("Create Rusty Sword", () => {
            const knightsSide = oneHandedSwordFactory(OneHandedSwordName.KNIGHTSSIDE);

            assert.typeOf(knightsSide, "object");
            assert.equal(knightsSide.name, OneHandedSwordName.KNIGHTSSIDE);
            assert.equal(knightsSide.type, WeaponType.ONEHANDEDSWORD);
        });
    });

    describe("Create New Staff", () => {
        it("Create Walking Stick", () => {
            const walkingStick = staffFactory(StaffName.WALKINGSTICK);

            assert.typeOf(walkingStick, "object");
            assert.equal(walkingStick.name, StaffName.WALKINGSTICK);
            assert.equal(walkingStick.type, WeaponType.STAFF);
        });
    });

    describe("Create New Two Handed Axe", () => {
        it("Create Lumber Axe", () => {
            const lumberAxe = twoHandedAxeFactory(TwoHandedAxeName.LUMBERAXE);

            assert.typeOf(lumberAxe, "object");
            assert.equal(lumberAxe.name, TwoHandedAxeName.LUMBERAXE);
            assert.equal(lumberAxe.type, WeaponType.TWOHANDEDAXE);
        });

        it("Create Barrack Axe", () => {
            const barrackAxe = twoHandedAxeFactory(TwoHandedAxeName.BARRACKAXE);

            assert.typeOf(barrackAxe, "object");
            assert.equal(barrackAxe.name, TwoHandedAxeName.BARRACKAXE);
            assert.equal(barrackAxe.type, WeaponType.TWOHANDEDAXE);
        });

        it("Create Lumber Axe", () => {
            const mogroksLostAxe = twoHandedAxeFactory(TwoHandedAxeName.MOGROKSLOSTAXE);

            assert.typeOf(mogroksLostAxe, "object");
            assert.equal(mogroksLostAxe.name, TwoHandedAxeName.MOGROKSLOSTAXE);
            assert.equal(mogroksLostAxe.type, WeaponType.TWOHANDEDAXE);
        });
    });

    describe("Create New Two Handed Sword", () => {
        it("Create Trainging Sword", () => {
            const trainingSword = twoHandedSwordFactory(TwoHandedSwordName.TRAININGSWORD);

            assert.typeOf(trainingSword, "object");
            assert.equal(trainingSword.name, TwoHandedSwordName.TRAININGSWORD);
            assert.equal(trainingSword.type, WeaponType.TWOHANDEDSWORD);
        });

        it("Create Scuffed Blade", () => {
            const scuffedBlade = twoHandedSwordFactory(TwoHandedSwordName.SCUFFEDBLADE);

            assert.typeOf(scuffedBlade, "object");
            assert.equal(scuffedBlade.name, TwoHandedSwordName.SCUFFEDBLADE);
            assert.equal(scuffedBlade.type, WeaponType.TWOHANDEDSWORD);
        });

        it("Create Old Claymore", () => {
            const oldClaymore = twoHandedSwordFactory(TwoHandedSwordName.OLDCLAYMORE);

            assert.typeOf(oldClaymore, "object");
            assert.equal(oldClaymore.name, TwoHandedSwordName.OLDCLAYMORE);
            assert.equal(oldClaymore.type, WeaponType.TWOHANDEDSWORD);
        });

        it("Create LionHeart", () => {
            const lionHeart = twoHandedSwordFactory(TwoHandedSwordName.LIONHEART);

            assert.typeOf(lionHeart, "object");
            assert.equal(lionHeart.name, TwoHandedSwordName.LIONHEART);
            assert.equal(lionHeart.type, WeaponType.TWOHANDEDSWORD);
        });
    });
});