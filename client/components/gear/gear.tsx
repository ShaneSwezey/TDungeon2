import { 
    Flex, 
    Container, 
    Heading, 
    useColorModeValue, 
    Stack, 
    HStack, 
    Text, 
    Icon, 
    Spinner,
    Button
} from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons'
import ItemToolTip from '../itemToolTip';
import { useQuery, gql } from '@apollo/client';
import Image from 'next/image';
import { IHero } from '../../interfaces/hero';
import { IInventory } from '../../interfaces/inventory';
import { upperFirst } from 'lodash';
import { ArmorSlot } from '../../enums/armor';
import ArmorInventory from './armorInventory';
import WeaponInventory from './weaponInventory';
import { getDefaultArmorSlotImageSrc } from '../../utils/gear';
import { IArmor } from '../../interfaces/armor';
import { HeroType } from '../../enums/hero';
import { formatHeroType } from '../../utils/hero';
import { useState } from 'react';

const HERO_GEAR_QUERY = gql`
    query HEROANDGEAR($heroId: String!) {
        hero(heroId: $heroId) {
            id
            name
            type
            crit
            dodge
            block
            attackPower
            stamina {
                maxHitPoints
                hitPoints
            }
            armor {
                name
                type
                slot
                hitPoints
                rarity
                imgSrc
                attackPower
                description
            }
            weapons {
                name
                type
                rarity
                damage {
                    high
                    low
                }
                crit {
                    chance
                }
                flurry {
                    chance
                    num {
                        low
                        high
                    }
                }
                cleave {
                    chance
                    num {
                        low
                        high
                    }
                }
                imgSrc
                description
            }
        }

        inventory(heroId: $heroId) {
            heroId
            gold
            armorInventory {
                name
                type
                slot
                rarity
                hitPoints
                imgSrc
            }
            weaponInventory {
                name
                type
                rarity
                damage {
                    low
                    high
                }
                crit {
                    chance
                }
                flurry {
                    chance
                    num {
                        low
                        high
                    }
                }
                cleave {
                    chance
                    num {
                        low
                        high
                    }
                }
                imgSrc
            }
        }
    }
`;

interface GrearProps {
    heroId: string;
    heroType: HeroType;
    closeInventory: () => void
}

interface QueryData {
    hero: IHero;
    inventory: IInventory;
}

interface QueryVariables {
    heroId: string;
}

interface ArmorDisplayProps {
    slot: ArmorSlot;
    armor?: IArmor;
}

enum GearType {
    ARMOR = "ARMOR",
    WEAPON = "WEAPON"
}

const ArmorDisplay = ({ slot, armor } : ArmorDisplayProps) => (
    <ItemToolTip item={armor ? armor : undefined} type={"Armor"} direction="right">
        <Image src={armor ? armor.imgSrc : getDefaultArmorSlotImageSrc(slot)} alt="Vercel Logo" width={60} height={60} />
    </ItemToolTip>
);

const Gear = ({ heroId, heroType, closeInventory }: GrearProps) => {
    const [selectedGearType, setSelectedGearType] = useState<GearType>(GearType.ARMOR);
    const { loading, data } = useQuery<QueryData, QueryVariables>(HERO_GEAR_QUERY, { variables: { heroId } });

    const formBackground = useColorModeValue("gray.100", "gray.700");

    return (
        <Flex direction="row">
            <Container m={10} background={formBackground} p={12} rounded={5}>
                <Flex direction="row" spacing={5}>
                    <Icon 
                        as={ChevronLeftIcon} 
                        boxSize={10} 
                        _hover={{ cursor: "pointer" }}
                        onClick={() => closeInventory()} 
                    />
                    <Heading mb={6}>{formatHeroType(heroType)}</Heading>
                </Flex>
                {
                    loading ? 
                        <Spinner />
                    :
                    <Stack direction="column" spacing={5}>
                        <HStack justifyContent="center">
                           <ArmorDisplay slot={ArmorSlot.HELM} armor={data?.hero.armor.find(armor => armor.slot === ArmorSlot.HELM)} />
                           <ArmorDisplay slot={ArmorSlot.CHEST} armor={data?.hero.armor.find(armor => armor.slot === ArmorSlot.CHEST)} />
                           <ArmorDisplay slot={ArmorSlot.GLOVES} armor={data?.hero.armor.find(armor => armor.slot === ArmorSlot.GLOVES)} />
                           <ArmorDisplay slot={ArmorSlot.PANTS} armor={data?.hero.armor.find(armor => armor.slot === ArmorSlot.PANTS)} />
                        </HStack>
                        <HStack justifyContent="center" spacing="24px">
                            {
                                data?.hero.weapons.map((weapon, index: number) => (
                                    <ItemToolTip item={weapon} type={"Weapon"} direction="right" key={index}>
                                        <Image src={weapon.imgSrc} alt="Vercel Logo" width={60} height={60} />
                                    </ItemToolTip>
                                ))
                            }
                        </HStack>
                        <Stack direction="column" background={formBackground} borderRadius={5} p={2} >
                            <Text fontSize="lg">Hp: {data?.hero.armor.reduce((sum: number, armor) => sum + armor.hitPoints, 0)}</Text>
                            <Text fontSize="lg">Dmg: {data?.hero.weapons.map(weapon => ` ${weapon.damage.low} - ${weapon.damage.high}`).toString()}</Text>
                            <Text>Crit: +{data?.hero.crit}%</Text>
                            <Text>Dodge: {data?.hero.dodge}%</Text>
                            <Text>Block: {data?.hero.block}%</Text>
                            <Text>Attack Power: {data?.hero.attackPower}</Text>
                            <Text>Gold: {data?.inventory.gold}</Text>
                        </Stack>
                    </Stack>    
                }
            </Container>
            <Container m={10}>
                <Flex direction="column" background={formBackground} p={12} rounded={5}>
                    <Heading mb={6}>Inventory</Heading>
                    {
                        loading ? 
                            <Spinner />
                        :
                        <>
                            <HStack marginBottom={5}>
                                <Button
                                    onClick={() => setSelectedGearType(GearType.ARMOR)}
                                    backgroundColor={selectedGearType === GearType.ARMOR ? "blue.300" : "gray.600"}
                                >
                                    Armor
                                </Button>
                                <Button
                                    onClick={() => setSelectedGearType(GearType.WEAPON)}
                                    backgroundColor={selectedGearType === GearType.WEAPON ? "blue.300" : "gray.600"}
                                >
                                    Weapons
                                </Button>
                                {
                                    <Text>{
                                        selectedGearType === GearType.ARMOR ? 
                                            `${data!.inventory.armorInventory.length}/20` 
                                        : 
                                            `${data!.inventory.weaponInventory.length}/20`}
                                    </Text>
                                }
                            </HStack>
                            <Stack direction="column" spacing={5}>
                                {
                                    selectedGearType === GearType.ARMOR &&
                                        <ArmorInventory 
                                            heroId={heroId}
                                            heroType={heroType} 
                                            heroesArmor={data!.hero.armor}
                                            armorInventory={data!.inventory.armorInventory} 
                                        />
                                }
                                {
                                    selectedGearType === GearType.WEAPON && 
                                        <WeaponInventory 
                                            heroId={heroId}
                                            heroType={heroType} 
                                            heroWeapons={data!.hero.weapons}
                                            weaponInventory={data!.inventory.weaponInventory} 
                                        />
                                }
                            </Stack>
                        </>
                    }
                </Flex>
            </Container>
        </Flex>
    );
};

export default Gear;