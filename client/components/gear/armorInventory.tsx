import { 
    HStack, 
    Text,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    useDisclosure,
} from '@chakra-ui/react';
import { IArmor } from "../../interfaces/armor";
import ItemToolTip from '../itemToolTip';
import Image from 'next/image';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import EquipArmor from './equipArmor';
import SellItem from './sellItem';
import { isArmorEquipable } from '../../utils/gear';
import { HeroType } from '../../enums/hero';

enum ModalType {
    EQUIP = "EQUIP",
    SELL = "SELL",
    DELETE = "DELETE"
}

interface IEquipArmorSelection {
    selectedArmor: IArmor;
    armorToReplace?: IArmor;
}

interface Props {
    heroId: string;
    heroType: HeroType;
    heroesArmor: IArmor[];
    armorInventory: IArmor[];
    refreshData: () => Promise<boolean>;
}

const ArmorInventory = ({ heroId, heroType, heroesArmor, armorInventory, refreshData }: Props) => {
    const [modalType, setModalType] = useState<ModalType | undefined>(undefined);
    const [armorSelection, setArmorSelection] = useState<IEquipArmorSelection | undefined>(undefined);
   
    const { isOpen, onOpen, onClose } = useDisclosure();

    const onCloseAlias = () => {
        setModalType(undefined);
        onClose();
    }

    return (
        <>
            {
                armorInventory.map((armor, index) => (
                    <HStack justifyContent="space-between" key={`${armor.name}:${index}`}>
                        <ItemToolTip item={armor} type={"Armor"} direction="right">
                            <Image src={armor.imgSrc} alt="Vercel Logo" width={60} height={60} />
                        </ItemToolTip>
                        <Text>{armor.name}</Text>
                        <Menu>
                            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                                Actions
                            </MenuButton>
                            <MenuList>
                                {
                                    isArmorEquipable(heroType, armor) &&
                                        <MenuItem 
                                            onClick={() => {
                                                setModalType(ModalType.EQUIP);
                                                setArmorSelection({
                                                    selectedArmor: armor,
                                                    armorToReplace: heroesArmor.find(armorPiece => armorPiece.slot === armor.slot)
                                                })
                                                onOpen()
                                            }}
                                        >
                                            Equip
                                        </MenuItem>
                                }
                                <MenuItem
                                    onClick={() => {
                                        setModalType(ModalType.SELL);
                                        setArmorSelection({
                                            selectedArmor: armor
                                        })
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
                    <EquipArmor 
                        heroId={heroId}
                        selectedArmor={armorSelection!.selectedArmor}
                        armorToReplace={armorSelection!.armorToReplace}
                        isOpen={isOpen}
                        onClose={onCloseAlias}
                        refreshData={refreshData}
                    />
            }
            {
                modalType === ModalType.SELL &&
                    <SellItem
                        heroId={heroId}
                        armor={armorSelection!.selectedArmor}
                        itemType="Armor"
                        isOpen={isOpen}
                        onClose={onCloseAlias}
                        refreshData={refreshData}
                    />
            }
        </>
    );
}

export default ArmorInventory;