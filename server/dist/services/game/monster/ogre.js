"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeOgreAttack = exports.orge = void 0;
// import { AbilityTitle } from "../abilities/ability";
// import { getFrenzy, setFrenzy } from "../buffs/frenzy";
var attack_1 = require("../actions/attack");
var math_1 = require("../utils/math");
var _1 = require(".");
var orge = function () { return ({
    type: _1.MonsterType.Ogre,
    stamina: {
        maxHitPoints: 20,
        hitPoints: 20,
    },
    attack: {
        low: 5,
        high: 10,
        attackPower: 0,
    }
}); };
exports.orge = orge;
// const ogreRage = (ogre: Ogre) => {
//     if  (getStaminaPercentage(ogre.stamina) <= 50 && !ogre.buffs.find(buff => buff.title === AbilityTitle.Frenzy)) {
//         const frenzy = getFrenzy(10);
//         setFrenzy(ogre, frenzy);
//         return 'Ogre begins to rage - gachiHYPER'
//     };
//     return;
// }
var executeOgreAttack = function (ogre, heroes) {
    // check if orge health is 50% or less
    //const message = ogreRage(ogre);
    // select up to 5 heroes for the orge to attack
    var selectedHeroes = math_1.selectRandomHeroes(heroes, 5);
    // attack
    attack_1.attackHeroes(selectedHeroes, [ogre]);
    //const heroesWithBackhand = chanceToApplyBackhand({ heroes, duration: 1, chance: 5 });
    return { monster: ogre, heroes: heroes, message: undefined };
};
exports.executeOgreAttack = executeOgreAttack;
