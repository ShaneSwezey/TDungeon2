import { upperFirst } from "lodash";
import { ArmorSlot, ArmorType } from "../enums/armor";
import { HeroType } from "../enums/hero";
import { ItemRarity } from "../enums/item";
import { WeaponType } from "../enums/weapon";
import { IArmor } from "../interfaces/armor";
import { IWeapon } from "../interfaces/weapon";


export const getDefaultArmorSlotImageSrc = (armorSlot: ArmorSlot) => {
    switch(armorSlot) {
        case ArmorSlot.HELM:
            return "https://tdungeon.s3.us-west-2.amazonaws.com/armor/default/helm.svg";
        case ArmorSlot.CHEST:
            return "https://tdungeon.s3.us-west-2.amazonaws.com/armor/default/chest.svg";
        case ArmorSlot.GLOVES:
            return "https://tdungeon.s3.us-west-2.amazonaws.com/armor/default/gloves.svg";
        case ArmorSlot.PANTS:
            return "https://tdungeon.s3.us-west-2.amazonaws.com/armor/default/pants.svg";
        default:
            return "";
    }
}

const armorPriority = {
    "HELM": 1,
    "CHEST": 2,
    "GLOVES": 3,
    "PANTS": 4
}

export const prioritizeGear = (armor: IArmor[]): IArmor[] => {
    const prioritizedArmor: IArmor[] = [];
    Object.keys(armorPriority).forEach(key => {
        const armorPrio = armor.find(armor => armor.type === key);
        if (armorPrio) prioritizedArmor.push(armorPrio);
    })
    return prioritizedArmor;
}

export const isWeaponOneHandedType = (weapon: IWeapon) => {
    const weaponType = weapon.type;
    const derp = (weaponType === WeaponType.KNIFE || weaponType === WeaponType.ONEHANDEDAXE || weaponType === WeaponType.ONEHANDEDSWORD);
    return derp;
};

export const isWeaponEquipable = (heroType: HeroType, weapon: IWeapon) => {
    switch(heroType) {
        case HeroType.ROGUE:
            return !![WeaponType.KNIFE, WeaponType.ONEHANDEDSWORD].find(type => type == weapon.type);
        case HeroType.WARRIOR:
            return !![WeaponType.KNIFE, WeaponType.ONEHANDEDAXE, WeaponType.ONEHANDEDSWORD, WeaponType.TWOHANDEDAXE, WeaponType.TWOHANDEDSWORD].find(type => type === weapon.type);
        case HeroType.ROGUE:
            return !![WeaponType.BOW].find(type => type == weapon.type);
        default:
            return false;
    }
}

export const isArmorEquipable = (heroType: HeroType, armor: IArmor) => {
    switch(heroType) {
        case HeroType.ROGUE:
            return !![ArmorType.CLOTH, ArmorType.LEATHER].find(type => type == armor.type);
        case HeroType.WARRIOR:
            return !![ArmorType.LEATHER, ArmorType.MAIL, ArmorType.PLATE].find(type => type === armor.type);
        case HeroType.RANGER:
            return !![ArmorType.CLOTH, ArmorType.LEATHER].find(type => type == armor.type);
        default:
            return false;
    }
}

export const getItemGoldValue = (rarity: ItemRarity) =>  {
    switch(rarity) {
        case ItemRarity.COMMON:
            return 1;
        case ItemRarity.UNCOMMON:
            return 5;
        case ItemRarity.RARE:
            return 10;
        case ItemRarity.EPIC:
            return 20;
        case ItemRarity.LEGENDARY:
            return 50;
        default:
            return 1;
    }
}

export const formatArmorType = (armorType: ArmorType) => {
    switch(armorType) {
        case ArmorType.CLOTH:
            return upperFirst(armorType.toLowerCase());
        case ArmorType.LEATHER:
            return upperFirst(armorType.toLowerCase());
        case ArmorType.MAIL:
            return upperFirst(armorType.toLowerCase());
        case ArmorType.PLATE:
            return upperFirst(armorType.toLowerCase());
        default:
            return "Unkown";
    }
}

export const formatArmorSlot = (armorSlot: ArmorSlot) => {
    switch(armorSlot) {
        case ArmorSlot.HELM:
            return upperFirst(armorSlot.toLowerCase());
        case ArmorSlot.CHEST:
            return upperFirst(armorSlot.toLowerCase());
        case ArmorSlot.GLOVES:
            return upperFirst(armorSlot.toLowerCase());
        case ArmorSlot.PANTS:
            return upperFirst(armorSlot.toLowerCase());
        default:
            return "Unkown";
    }
}