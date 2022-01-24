import { 
    HStack, 
    ModalBody, 
    ModalCloseButton, 
    ModalContent, 
    ModalHeader, 
    VStack, 
    Text,
    ModalFooter, 
    Button,
    Modal, 
    ModalOverlay, 
    RadioGroup, 
    Stack, 
    Radio, 
    useDisclosure
} from "@chakra-ui/react";
import { IWeapon } from "../../interfaces/weapon";
import ItemToolTip from "../itemToolTip";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useMutation } from "@apollo/client";
import { EQUIP_WEAPON_MUTATION } from "../../graphql/mutations";
import { HERO_GEAR_QUERY } from "../../graphql/queries";
import { isWeaponOneHandedType } from '../../utils/gear'
import Image from 'next/image';
import { useEffect, useState } from "react";

interface Props {
    heroId: string;
    weaponToEquip: IWeapon;
    weaponsToReplace?: IWeapon[];
    isOpen: boolean;
    onClose: () => void;
}

const EquipWeapon = ({ heroId, weaponToEquip, weaponsToReplace, isOpen, onClose }: Props) => {
    const [isEquipDisabled, setIsEquipDisabled] = useState(isWeaponOneHandedType(weaponToEquip) && weaponsToReplace?.every(weapon => isWeaponOneHandedType(weapon)));
    const [weaponsSelectedToReplace, setWeaponsSelectedToReplace] = useState<IWeapon[] | undefined>(weaponsToReplace ? [...weaponsToReplace] : undefined);
    const [ equipWeapon ] = useMutation(
        EQUIP_WEAPON_MUTATION,
        { refetchQueries: [ { query: HERO_GEAR_QUERY, variables: { heroId } }, "HEROANDGEAR"] }
    );

    useEffect(() => {}, [isEquipDisabled]);

    const setOneHandedWeaponToReplace = (weapon: IWeapon) => setWeaponsSelectedToReplace([weapon]);

    return(
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Equip</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <HStack justifyContent="center">
                        <VStack>
                            <Text>{weaponToEquip.name}</Text>
                            <ItemToolTip item={weaponToEquip} type={"Weapon"} direction="right">
                                <Image src={weaponToEquip.imgSrc} alt="Vercel Logo" width={60} height={60} />
                            </ItemToolTip>
                        </VStack>
                        {
                            weaponsToReplace && 
                                <>
                                    <VStack>
                                        <Text>Replace</Text>
                                        <ArrowForwardIcon w={100}/>
                                    </VStack>                 
                                    {
                                        isWeaponOneHandedType(weaponToEquip) && weaponsToReplace.every(weapon => isWeaponOneHandedType(weapon)) ?
                                            <RadioGroup>
                                                <Stack>
                                                    {
                                                        weaponsToReplace.map((weapon, index) => (
                                                            <Radio 
                                                                value={index}
                                                                key={`${weapon.type}:${index}`}
                                                                onChange={() => {
                                                                    setIsEquipDisabled(false);
                                                                    setOneHandedWeaponToReplace(weapon);
                                                                }}
                                                            >
                                                                <VStack >
                                                                    <Text>{weapon.name}</Text>
                                                                    <ItemToolTip item={weapon} type={"Weapon"} direction="right">
                                                                        <Image src={weapon.imgSrc} alt="Vercel Logo" width={60} height={60} />
                                                                    </ItemToolTip>
                                                                </VStack>
                                                            </Radio>
                                                        ))
                                                    }
                                                </Stack>
                                            </RadioGroup>
                                        :
                                            weaponsToReplace.map((weapon, index) => (
                                                <VStack key={`${weapon.type}:${index}`}>
                                                    <Text>{weapon.name}</Text>
                                                    <ItemToolTip item={weapon} type={"Weapon"} direction="right">
                                                        <Image src={weapon.imgSrc} alt="Vercel Logo" width={60} height={60} />
                                                    </ItemToolTip>
                                                </VStack>
                                            ))
                                    }
                                </>
                        }
                    </HStack>
                </ModalBody>
                <ModalFooter>
                    <Button 
                        colorScheme='red' mr={3} 
                        onClick={onClose}
                    >
                        Close
                    </Button>
                    <Button 
                        colorScheme='green'
                        disabled={isEquipDisabled}
                        onClick={() => {
                            equipWeapon({
                                variables: {
                                    heroId,
                                    weaponToEquip: {
                                        name: weaponToEquip.name,
                                        type: weaponToEquip.type
                                    },
                                    weaponsToReplace: weaponsSelectedToReplace ?
                                        weaponsSelectedToReplace.map(weapon => ({
                                            name: weapon.name,
                                            type: weapon.type
                                        })) : undefined
                                    }
                            })
                            onClose()
                        }}
                    >
                        Equip
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default EquipWeapon;