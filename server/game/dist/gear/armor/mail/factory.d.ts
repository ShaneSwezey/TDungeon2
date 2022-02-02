import { CurrentAvailiableItemRarity } from "../../../enums/item";
import { IArmor, IArmorRecord } from "../../../interfaces/armor";
export declare const mailFactory: (armorRecord: IArmorRecord) => IArmor;
export declare const getRandomMailArmor: (rarity: CurrentAvailiableItemRarity) => import("../../../interfaces/armor").IMailChest | import("../../../interfaces/armor").IMailGloves | import("../../../interfaces/armor").IMailPants | import("../../../interfaces/armor").IMailHelm;
//# sourceMappingURL=factory.d.ts.map