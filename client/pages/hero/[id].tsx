import { GetServerSidePropsContext, NextPage } from "next";
import { client } from "../../apollo-client";
import ItemToolTip from "../../components/itemToolTip";
import { ArmorSlot } from "../../enums/armor";
import { IArmor } from "../../interfaces/armor";
import { IHero } from "../../interfaces/hero";
import { IInventory } from "../../interfaces/inventory";
import Image from "next/image";
import { getDefaultArmorSlotImageSrc } from "../../utils/gear";
import { gql } from "@apollo/client";
import { Container, Flex, Heading, HStack, Icon, Stack, useColorModeValue, Text, Button } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { formatHeroType } from "../../utils/hero";
import ArmorInventory from "../../components/gear/armorInventory";
import WeaponInventory from "../../components/gear/weaponInventory";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import ErrorPage from "next/error";

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


interface Props {
    hero?: IHero;
    inventory?: IInventory;
    errorStatus?: number;
}


const Hero: NextPage<Props> = ({ hero, inventory, errorStatus }: Props) => {
    const [selectedGearType, setSelectedGearType] = useState<GearType>(GearType.ARMOR);
    const { data: session } = useSession();
    const router = useRouter();
    const formBackground = useColorModeValue("gray.100", "gray.700");

    if (hero === undefined || inventory === undefined) return <ErrorPage statusCode={errorStatus!} />

    const refreshData = () => router.replace(router.asPath);
    
    return (
        <Flex direction="row">
            <Container m={10} background={formBackground} p={12} rounded={5}>
                <Flex direction="row" spacing={5}>
                    <Icon 
                        as={ChevronLeftIcon} 
                        boxSize={10} 
                        _hover={{ cursor: "pointer" }}
                        onClick={() => router.back()} 
                    />
                    <Heading mb={6}>{formatHeroType(hero.type)}</Heading>
                </Flex>
                    <Stack direction="column" spacing={5}>
                        <HStack justifyContent="center">
                            <ArmorDisplay slot={ArmorSlot.HELM} armor={hero.armor.find(armor => armor.slot === ArmorSlot.HELM)} />
                            <ArmorDisplay slot={ArmorSlot.CHEST} armor={hero.armor.find(armor => armor.slot === ArmorSlot.CHEST)} />
                            <ArmorDisplay slot={ArmorSlot.GLOVES} armor={hero.armor.find(armor => armor.slot === ArmorSlot.GLOVES)} />
                            <ArmorDisplay slot={ArmorSlot.PANTS} armor={hero.armor.find(armor => armor.slot === ArmorSlot.PANTS)} />
                        </HStack>
                        <HStack justifyContent="center" spacing="24px">
                            {
                                hero.weapons.map((weapon, index: number) => (
                                    <ItemToolTip item={weapon} type={"Weapon"} direction="right" key={index}>
                                        <Image src={weapon.imgSrc} alt="Vercel Logo" width={60} height={60} />
                                    </ItemToolTip>
                                ))
                            }
                        </HStack>
                        <Stack direction="column" background={formBackground} borderRadius={5} p={2} >
                            <Text fontSize="lg">Hp: {hero.armor.reduce((sum: number, armor) => sum + armor.hitPoints, 0)}</Text>
                            <Text fontSize="lg">Dmg: {hero.weapons.map(weapon => ` ${weapon.damage.low} - ${weapon.damage.high}`).toString()}</Text>
                            <Text>Crit: +{hero.crit}%</Text>
                            <Text>Dodge: {hero.dodge}%</Text>
                            <Text>Block: {hero.block}%</Text>
                            <Text>Attack Power: {hero.attackPower}</Text>
                            {
                                session && session.user?.name?.toLowerCase() === hero.name && 
                                    <Text>Gold: {inventory.gold}</Text>
                            }
                        </Stack>
                    </Stack>    
            </Container>
            {
                session && session.user?.name?.toLowerCase() === hero.name && 
                    <Container m={10}>
                        <Flex direction="column" background={formBackground} p={12} rounded={5}>
                            <Heading mb={6}>Inventory</Heading>
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
                                            `${inventory.armorInventory.length}/20` 
                                        : 
                                            `${inventory.weaponInventory.length}/20`}
                                    </Text>
                                }
                            </HStack>
                            <Stack direction="column" spacing={5}>
                                {
                                    selectedGearType === GearType.ARMOR &&
                                        <ArmorInventory 
                                            heroId={hero.id!}
                                            heroType={hero.type} 
                                            heroesArmor={hero.armor}
                                            armorInventory={inventory.armorInventory}
                                            refreshData={refreshData} 
                                        />
                                }
                                {
                                    selectedGearType === GearType.WEAPON && 
                                        <WeaponInventory 
                                            heroId={hero.id!}
                                            heroType={hero.type} 
                                            heroWeapons={hero.weapons}
                                            weaponInventory={inventory.weaponInventory} 
                                            refreshData={refreshData}
                                        />
                                }
                            </Stack>
                        </Flex>
                    </Container>
            }
        </Flex>
    );
}

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
    try {
        const { id } = query;
        const { data } = await client.query<QueryData, QueryVariables>({
            query: HERO_GEAR_QUERY,
            variables: { heroId: id as string }
        });

        return {
            props: {
                hero: data.hero,
                inventory: data.inventory
            }
        }
    } catch(error) {
        return { 
            props: {
                errorStatus: 404 // hard coded for now, will fix later
            }
        };
    }
}

export default Hero;