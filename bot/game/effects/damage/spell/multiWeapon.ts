// import { BuffType, Effect, EffectAppliedTo, EffectType, MultiWeaponDamageBuffEffect, SubBuffType } from "../..";

// export enum MultiWeaponEffect {
//     FLURRY = "Flurry",
// }

// const flurry = (): MultiWeaponDamageBuffEffect => ({
//     name: MultiWeaponEffect.FLURRY,
//     type: EffectType.BUFF,
//     appliedTo: EffectAppliedTo.SELF,
//     buff: {
//         type: BuffType.DAMAGE,
//         subType: SubBuffType.MULTIWEAPONATTACK,
//         attack: {
//             chance: 15,
//             low: 2,
//             high: 3,
//         }
//     },
//     rounds: 1,
// });

// export const multiWeaponEffectFactory = (multiWeaponEffect: string): Effect => {
//     switch(multiWeaponEffect) {
//         case MultiWeaponEffect.FLURRY:
//             return flurry();
//         default:
//             throw new Error(`Multi Weapon Effect ${multiWeaponEffect} was not found!`);
//     }
// }