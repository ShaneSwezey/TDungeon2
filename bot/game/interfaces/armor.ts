import { 
    ArmorSlot, 
    ArmorType, 
    ClothChestName, 
    LeatherChestName, 
    LeatherGlovesName, 
    LeatherHelmName, 
    LeatherPantsName, 
    MailChestName, 
    MailGlovesName,
    MailHelmName,
    MailPantsName
} from "../enums/armor";
import { ItemRarity } from "../enums/item";

export interface IArmor {
    readonly name: string;
    readonly hitPoints: number;
    readonly type: ArmorType;
    readonly slot: ArmorSlot;
    readonly rarity: ItemRarity,
    readonly imgSrc: string;
    readonly crit?: number;
    readonly dodge?: number;
    readonly attackPower?: number;
    readonly block?: number;
    readonly description?: string;
}

// name:type:slot
export interface IArmorRecord {
    name: string;
    type: string;
    slot: string;
}

export interface ICloth extends IArmor {
    type: ArmorType.CLOTH;
}

export interface IClothChest extends ICloth {
    name: ClothChestName,
    slot: ArmorSlot.CHEST;
}

export interface ILeather extends IArmor {
    type: ArmorType.LEATHER
}

export interface ILeatherChest extends ILeather {
    name: LeatherChestName;
    slot: ArmorSlot.CHEST;
}

export interface ILeatherGloves extends ILeather {
    name: LeatherGlovesName;
    slot: ArmorSlot.GLOVES;
}

export interface ILeatherHelm extends ILeather {
    name: LeatherHelmName;
    slot: ArmorSlot.HELM;
}

export interface ILeatherPants extends ILeather {
    name: LeatherPantsName;
    slot: ArmorSlot.PANTS;
}

export interface IMail extends IArmor {
    type: ArmorType.MAIL;
}

export interface IMailChest extends IMail {
    name: MailChestName;
    slot: ArmorSlot.CHEST;
}

export interface IMailGloves extends IMail {
    name: MailGlovesName;
    slot: ArmorSlot.GLOVES;
}

export interface IMailHelm extends IMail {
    name: MailHelmName,
    slot: ArmorSlot.HELM,
}

export interface IMailPants extends IMail {
    name: MailPantsName;
    slot: ArmorSlot.PANTS;
}
