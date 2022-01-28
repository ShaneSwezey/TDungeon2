import { 
    HStack, 
    Text,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    useDisclosure
} from "@chakra-ui/react";
import { IWeapon } from "../../interfaces/weapon";
import ItemToolTip from "../itemToolTip";
import Image from 'next/image';
import { useState } from "react";
import {  ChevronDownIcon } from "@chakra-ui/icons";
import { WeaponType } from "../../enums/weapon";
import EquipWeapon from "./equipWeapon";
import { HeroType } from "../../enums/hero";
import { isWeaponEquipable } from "../../utils/gear";
import SellItem from "./sellItem";

enum ModalType {
    EQUIP = "Equip",
    SELL = "Sell",
    DELETE = "Delete"
}

interface IEquipWeaponSelection {
    selectedWeapon: IWeapon;
    weaponsToReplace?: IWeapon[];
}

interface Props {
    heroId: string;
    heroType: HeroType;
    heroWeapons: IWeapon[];
    weaponInventory: IWeapon[];
    refreshData: () => Promise<boolean>;
}

const WeaponInventory = ({ heroId, heroType, heroWeapons, weaponInventory, refreshData }: Props) => {
    const [modalType, setModalType] = useState<ModalType | undefined>(undefined);
    const [weaponSelection, setWeaponSelection] = useState<IEquipWeaponSelection | undefined>(undefined);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const getWeaponsToReplace = (heroWeapons: IWeapon[], weaponToEquip: IWeapon) => {
        let weaponToEquipValue;
        if (
            weaponToEquip.type === WeaponType.TWOHANDEDSWORD || 
            weaponToEquip.type === WeaponType.TWOHANDEDAXE || 
            weaponToEquip.type === WeaponType.STAFF ||
            weaponToEquip.type === WeaponType.TWOHANDEDCROSSBOW
        ) {
            weaponToEquipValue = 2
        } else weaponToEquipValue = 1;
        
        const currentlyEquippedWeaponValue = heroWeapons.reduce((pv, weapon) => {
            if (
                weapon.type === WeaponType.TWOHANDEDSWORD || 
                weapon.type === WeaponType.TWOHANDEDAXE || 
                weapon.type === WeaponType.STAFF ||
                weapon.type === WeaponType.TWOHANDEDCROSSBOW
            ) {
                return pv + 2
            } else return pv + 1
        }, 0);
    
        const heroWeaponsLength = heroWeapons.length;
    
        if (currentlyEquippedWeaponValue === 1 && weaponToEquipValue === 1 && heroWeaponsLength < 2) return undefined;
        else return heroWeapons;
    }

    const onCloseAlias = () => {
        setModalType(undefined);
        onClose();
    }

    return (
        <>
            {
                weaponInventory.map((weapon, index) => (
                    <HStack justifyContent="space-between" key={`${weapon.name}:${index}`}>
                        <ItemToolTip item={weapon} type={"Weapon"} direction="right">
                            <Image src={weapon.imgSrc} alt="Vercel Logo" width={60} height={60} />
                        </ItemToolTip>
                        <Text>{weapon.name}</Text>
                        <Menu>
                            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                                Actions
                            </MenuButton>
                            <MenuList>
                                {
                                    isWeaponEquipable(heroType, weapon) &&
                                        <MenuItem 
                                            onClick={() => {
                                                setWeaponSelection({
                                                    selectedWeapon: weapon,
                                                    weaponsToReplace: getWeaponsToReplace(heroWeapons, weapon)
                                                })
                                                setModalType(ModalType.EQUIP);
                                                onOpen()
                                            }}
                                        >
                                            Equip
                                        </MenuItem>
                                }
                                <MenuItem
                                    onClick={() => {
                                        setWeaponSelection({ selectedWeapon: weapon })
                                        setModalType(ModalType.SELL);
                                        onOpen()
                                    }}
                                >
                                    Sell
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </HStack>
                ))
            }
            {
                modalType === ModalType.EQUIP &&
                    <EquipWeapon 
                        heroId={heroId} 
                        weaponToEquip={weaponSelection!.selectedWeapon} 
                        weaponsToReplace={weaponSelection!.weaponsToReplace}
                        isOpen={isOpen}
                        onClose={onCloseAlias}
                        refreshData={refreshData}
                    />
            }
            {
                modalType === ModalType.SELL &&
                    <SellItem 
                        heroId={heroId}
                        weapon={weaponSelection!.selectedWeapon}
                        itemType="Weapon"
                        isOpen={isOpen}
                        onClose={onCloseAlias}
                    />
            }
        </>
    );
};

export default WeaponInventory;