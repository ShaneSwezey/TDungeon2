import { 
    Button, 
    HStack, 
    Modal, 
    ModalBody, 
    ModalCloseButton, 
    ModalContent, 
    ModalFooter, 
    ModalHeader, 
    ModalOverlay, 
    VStack,
    Text
} from "@chakra-ui/react";
import ItemToolTip from "../itemToolTip";
import Image from 'next/image';
import { IWeapon } from "../../interfaces/weapon";
import { IArmor } from "../../interfaces/armor";
import { getItemGoldValue } from "../../utils/gear";
import { useMutation } from "@apollo/client";
import { SELL_ITEM_MUTATION } from "../../graphql/mutations";

interface Props {
    heroId: string;
    weapon?: IWeapon;
    armor?: IArmor;
    itemType: string;
    isOpen: boolean;
    onClose: () => void;
    refreshData: () => Promise<boolean>;
}

interface SellMutationData {
    sellItem: boolean;
}

interface SellMutationParameters {
    heroId: string;
    itemType: string;
    itemName: string;
}

const SellItem = ({ heroId, isOpen, onClose, itemType, weapon, armor, refreshData }: Props) => {
    const [ sellItem ] = useMutation<SellMutationData, SellMutationParameters>(SELL_ITEM_MUTATION);

    async function sell() {
        const { data } = await sellItem({ 
            variables: {
            heroId,
            itemType: weapon ? "Weapon" : "Armor",
            itemName: weapon ? weapon.name : armor!.name
        }});

        if (data && data.sellItem === true) {
            refreshData();
            onClose();
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Sell {itemType}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <HStack justifyContent="center">
                        <VStack>
                            {
                                itemType === "Weapon" &&
                                <>
                                    <Text>{weapon?.name}</Text>
                                    <ItemToolTip item={weapon} type={"Weapon"} direction="right">
                                        <Image src={weapon!.imgSrc} alt="Vercel Logo" width={60} height={60} />
                                    </ItemToolTip>
                                </>
                            }
                            {
                                itemType === "Armor" &&
                                    <>
                                        <Text>{armor?.name}</Text>
                                        <ItemToolTip item={armor} type={"Armor"} direction="right">
                                            <Image src={armor!.imgSrc} alt="Vercel Logo" width={60} height={60} />
                                        </ItemToolTip>
                                    </>
                            }
                            <Text>You want to sell for {getItemGoldValue(weapon ? weapon.rarity : armor!.rarity)} gold?</Text>
                        </VStack>
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
                        colorScheme="green"
                        onClick={() => sell()}
                    >
                        Sell
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    ); 
}

export default SellItem;