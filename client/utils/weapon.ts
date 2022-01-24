import { WeaponType } from "../enums/weapon";

// Graphql enums upper cases and turns words into one word
// Example: Long Bow enum turns into LONGBOW
export const formatWeaponType = (weaponType: WeaponType) => {
    switch(weaponType) {
        case WeaponType.KNIFE:
            return "Knife";
        case WeaponType.BOW:
            return "Bow";
        case WeaponType.ONEHANDEDAXE:
            return "One Handed Axe";
        case WeaponType.ONEHANDEDCROSSBOW:
            return "One Handed Crossbow";
        case WeaponType.ONEHANDEDSWORD:
            return "One Handed Sword";
        case WeaponType.STAFF:
            return "Staff";
        case WeaponType.TWOHANDEDAXE:
            return "Two Handed Axe";
        case WeaponType.TWOHANDEDCROSSBOW:
            return "Two Handed Crossbow";
        case WeaponType.TWOHANDEDSWORD:
            return "Two Handed Sword";
        case WeaponType.UNARMED:
            return "Unarmed";
        default:
            return "Unkown";
    }
}