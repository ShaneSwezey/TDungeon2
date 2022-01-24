import { 
    HStack, 
    Modal, 
    ModalBody, 
    ModalCloseButton, 
    ModalContent, 
    ModalHeader, 
    ModalOverlay, 
    VStack,
    Text, 
    ModalFooter,
    Button
} from "@chakra-ui/react";
import ItemToolTip from "../itemToolTip";
import Image from "next/image";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { IArmor } from "../../interfaces/armor";
import { useMutation } from "@apollo/client";
import { EQUIP_ARMOR_MUTATION } from "../../graphql/mutations";
import { HERO_GEAR_QUERY } from "../../graphql/queries";

interface Props {
    heroId: string;
    selectedArmor: IArmor;
    armorToReplace?: IArmor;
    isOpen: boolean;
    onClose: () => void;
}

const EquipArmor = ({ heroId, selectedArmor, armorToReplace, isOpen, onClose }: Props) => {
    const [ equipArmor ] = useMutation(
        EQUIP_ARMOR_MUTATION,
        { refetchQueries: [ { query: HERO_GEAR_QUERY, variables: { heroId } }, "HEROANDGEAR"] }
    )

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Equip Armor</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <HStack justifyContent="center">
                            <VStack>
                                <Text>{selectedArmor.name}</Text>
                                <ItemToolTip item={selectedArmor} type={"Armor"} direction="right">
                                    <Image src={selectedArmor.imgSrc} alt="Vercel Logo" width={60} height={60} />
                                </ItemToolTip>
                            </VStack>
                        {
                            armorToReplace &&
                                <>
                                    <VStack>
                                        <Text>Replace</Text>
                                        <ArrowForwardIcon w={100}/>
                                    </VStack>
                                    <VStack>
                                        <Text>{armorToReplace.name}</Text>
                                        <ItemToolTip item={armorToReplace} type={"Armor"} direction="right">
                                            <Image src={armorToReplace.imgSrc} alt="Vercel Logo" width={60} height={60} />
                                        </ItemToolTip>
                                    </VStack>
                                </>
                        }
                        </HStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="red" mr={3} onClick={onClose}>
                        Close
                        </Button>
                        <Button 
                            colorScheme="green" 
                            onClick={() => {
                                equipArmor({ 
                                    variables: { 
                                        heroId,
                                        armorToEquip: {
                                            name: selectedArmor.name,
                                            slot: selectedArmor.slot
                                        },
                                        armorToReplace: armorToReplace ? {
                                            name: armorToReplace.name,
                                            slot: armorToReplace.slot
                                        } : undefined
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

export default EquipArmor;