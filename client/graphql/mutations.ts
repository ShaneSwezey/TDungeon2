import { gql } from "@apollo/client";

export const EQUIP_ARMOR_MUTATION = gql`
    mutation UPDATEARMOR($heroId: String!, $armorToEquip: ArmorItem!, $armorToReplace: ArmorItem) {
        equipArmor(heroId: $heroId, armorToEquip: $armorToEquip, armorToReplace: $armorToReplace)
    }
`;

export const EQUIP_WEAPON_MUTATION = gql`
    mutation UPDATEWEAPON($heroId: String!, $weaponToEquip: WeaponItem!, $weaponsToReplace: [WeaponItem!]) {
        equipWeapon(heroId: $heroId, weaponToEquip: $weaponToEquip, weaponsToReplace: $weaponsToReplace)
    }
`;

export const SELL_ITEM_MUTATION = gql`
    mutation SELLITEM($heroId: String!, $itemType: String!, $itemName: String!) {
        sellItem(heroId: $heroId, itemType: $itemType, itemName: $itemName)
    }
`;