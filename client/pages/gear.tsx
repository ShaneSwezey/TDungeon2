import { Flex, Container, Heading, useColorModeValue, Stack, HStack, Text, Button } from '@chakra-ui/react';
import ItemToolTip from './itemToolTip';
import { useQuery, gql } from '@apollo/client';
import Image from 'next/image';
import { Armor, Weapon } from '../interfaces';

const WEAPON_FRAGMENT = gql`
    fragment WeaponFragment on Weapon {
        name
        type
        rarity
        damage {
            high
            low
        }
    }
`;

const Armor_FRAGMENT = gql`
    fragment ArmorFragment on Armor {
        name
        type
        slot
        rarity
    }
`


const HERO_QUERY = gql`
    ${WEAPON_FRAGMENT}
    ${Armor_FRAGMENT}
    query Hero($name: String!) {
        hero(name: $name) {
            id
            name
            type
            gold
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
                description
            }
            inventory {
                ...WeaponFragment
                ...ArmorFragment
            }
        }
    }
`;

interface Props {
    name: string;
}

const Gear = ({ name } : Props) => {
    const {loading, error, data } = useQuery(HERO_QUERY, { variables: { name } });
    const formBackground = useColorModeValue("gray.100", "gray.700");
    
    if (loading) return <div>Loading...</div>;

    console.log("data:", data);

    return (
        <Flex direction="row">
            <Container m={10} background={formBackground} p={12} rounded={5}>
                <Stack direction="column" spacing={5}>
                    <Heading mb={6}>Character</Heading>
                    <HStack justifyContent="center" spacing="24px">
                        <ItemToolTip item={data.hero.armor.find((armor: Armor) => armor.slot === "Gloves")} direction="right">
                            <Image src={`/${data.hero.type}-blue.svg`} alt="Vercel Logo" width={60} height={60} />
                        </ItemToolTip>
                    </HStack>
                    <HStack justifyContent="center" spacing="24px">
                        <ItemToolTip item={data.hero.armor.find((armor: Armor) => armor.slot === "Gloves")} direction="right">
                            <Image src="/gloves-blue.svg" alt="Vercel Logo" width={60} height={60} />
                        </ItemToolTip>
                        <ItemToolTip item={data.hero.armor.find((armor: Armor) => armor.slot === "Chest")} direction="right">
                            <Image src="/chest-blue.svg" alt="Vercel Logo" width={60} height={60} />
                        </ItemToolTip>
                        <ItemToolTip item={data.hero.armor.find((armor: Armor) => armor.slot === "Gloves")} direction="right">
                            <Image src="/gloves-blue.svg" alt="Vercel Logo" width={60} height={60} />
                        </ItemToolTip>
                    </HStack>
                    <HStack justifyContent="center" spacing="24px">
                        <ItemToolTip item={data.hero.armor.find((armor: Armor) => armor.slot === "Pants")} direction="right">
                            <Image src="/pants-blue.svg" alt="Vercel Logo" width={60} height={60} />
                        </ItemToolTip>
                    </HStack>
                    <HStack justifyContent="center" spacing="24px">
                        {
                            data.hero.weapons.map((weapon: Weapon, index: number) => (
                                <ItemToolTip item={weapon} direction="right" key={index}>
                                    <Image src={`/${data.hero.type}-attack.svg`} alt="Vercel Logo" width={60} height={60} />
                                </ItemToolTip>
                            ))
                        }
                        
                    </HStack>
                    <Stack direction="column" background={formBackground} borderRadius={5} p={2} >
                        <Text fontSize="lg">Hp: {data.hero.armor.reduce((sum: number, armor: Armor) => sum + armor.hitPoints, 0)}</Text>
                        <Text fontSize="lg">Dmg: {data.hero.weapons.map((weapon: Weapon) => `${weapon.damage.low} - ${weapon.damage.high}`).toString()}</Text>
                    </Stack>
                </Stack>
            </Container>
            <Container m={10}>
                <Flex direction="column" background={formBackground} p={12} rounded={5}>
                    <Heading mb={6}>Inventory</Heading>
                    <Stack direction="column" spacing={5}>
                        {
                            data.hero.inventory.map((weapon: any, index: number) => (
                                <HStack justify="space-between" key={index}>
                                    <ItemToolTip item={weapon} direction="right">
                                        <Image src={`/${data.hero.type}-attack.svg`} alt="Vercel Logo" width={60} height={60} />
                                    </ItemToolTip>
                                    <Text fontSize="md">{weapon.name}</Text>
                                    <Text>{weapon.type}</Text>
                                    <Text>{weapon.damage.low} - {weapon.damage.high}</Text>
                                    <Button>Equip</Button>
                                </HStack>
                            ))
                        }
                    </Stack>
                </Flex>
            </Container>
        </Flex>
    );
};

export default Gear;