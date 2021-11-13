// import { expect } from 'chai';
// import { createNewHero } from '../../../creation/hero';
// import { HeroType } from '../../../hero';
// import { monsterFactory } from "../../../creation/monster";
// import { MonsterType } from '../../../monster';


// describe("Creation Functions", () => {
//     describe("Hero creations", () => {
//         it("Should return Melee hero", () => {
//             const meleeHero = createNewHero("Shane", HeroType.Melee);
//             expect(meleeHero).to.be.an("object"); // improve
//             expect(meleeHero.type).to.equal(HeroType.Melee);
//         });

//         it("Should return Ranged hero", () => {
//             const meleeHero = createNewHero("Shane", HeroType.Ranged);
//             expect(meleeHero).to.be.an("object");
//             expect(meleeHero.type).to.equal(HeroType.Ranged);
//         });

//         it("Should return Caster hero", () => {
//             const meleeHero = createNewHero("Shane", HeroType.Caster);
//             expect(meleeHero).to.be.an("object");
//             expect(meleeHero.type).to.equal(HeroType.Caster);
//         });
//     });

//     describe("Monster creations", () => {
//         it("Should return Goblin monster", () => {
//             const goblin = monsterFactory(MonsterType.Goblin)
//             expect(goblin).to.be.an("object");
//             expect(goblin.type).to.equal(MonsterType.Goblin);
//         });

//         it("Should return Orc monster", () => {
//             const orc = monsterFactory(MonsterType.Orc)
//             expect(orc).to.be.an("object");
//             expect(orc.type).to.equal(MonsterType.Orc);
//         });

//         // it("Should return Ogre monster", () => {
//         //     const ogre = monsterFactory(MonsterType.Ogre)
//         //     expect(ogre).to.be.an("object");
//         //     expect(ogre.type).to.equal(MonsterType.Ogre);
//         // });
//     });
// });