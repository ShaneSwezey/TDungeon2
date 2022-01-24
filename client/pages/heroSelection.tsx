import { Flex, Container, Stack, Text, Button, Heading, Center, useColorModeValue, Spinner } from '@chakra-ui/react';
import { useQuery, gql, useMutation } from '@apollo/client';
import Image from 'next/image';
import { difference } from 'lodash';
import { HeroType, SelectableHeroes } from '../enums/hero';
import { upperFirst } from 'lodash';
import { IHero } from '../interfaces/hero';
import { formatHeroType, getHeroClassImageSrc } from '../utils/hero';

const HEROES_QUERY = gql`
    query heroes($name: String!) {
        heroes(name: $name) {
            id
            name
            type
            active
        }
    }
`;

const SET_HERO_ACTIVE_MUTATION = gql`
    mutation setHeroActive($name: String!, $heroId: String!) {
        setHeroActive(name: $name, heroId: $heroId) {
            heroId
            active
        }
    }
`;

const CREATE_NEW_HERO_MUTATION = gql`
    mutation createNewHero($name: String!, $type: String!) {
        createHero(name: $name, type: $type) {
            id
        }
    }
`;

interface Props {
    name: string;
    openInventory: (heroId: string, heroType: HeroType) => void;
}

interface HeroQueryParameters {
    name: string;
}

interface HeroQueryData {
    heroes: IHero[];
}

const HeroSelection = ({ name, openInventory }: Props) => {
    const { loading, data } = useQuery<HeroQueryData, HeroQueryParameters>(HEROES_QUERY, { variables: { name } });
    const [ setHeroActiveMutation ] = useMutation(
        SET_HERO_ACTIVE_MUTATION,
        { 
            refetchQueries: [ { query: HEROES_QUERY, variables: { name } }, "heroes" ] 
        }
    );
    const [ createNewHeroMutation ] = useMutation(
        CREATE_NEW_HERO_MUTATION,
        {
            refetchQueries: [ { query: HEROES_QUERY, variables: { name } }, "heroes" ] 
        }
    );
    const formBackground = useColorModeValue("gray.100", "gray.700");

    return (
        <Flex direction="row">
            <Container m={10} background={formBackground} p={12} rounded={5}>
                {
                    loading ? 
                        <Spinner />
                    :
                        <>
                            <Heading mb={6}>Heroes</Heading>
                            <Stack direction="column" spacing={5} justifyContent="space-between">
                                {
                                    data?.heroes.map(hero => (
                                        <Flex direction="row" justifyContent="space-between" key={hero.type}>
                                            <Image src={getHeroClassImageSrc(hero.type)} alt="Vercel Logo" width={60} height={60} />
                                            <Center>
                                                <Text>{upperFirst(hero.type.toLowerCase())}</Text>
                                            </Center>
                                            <Center>
                                                {
                                                    hero.active ?
                                                        <Button disabled={true} bg={"green"}>Active</Button>
                                                        :
                                                        <Button onClick={() => setHeroActiveMutation({ variables: { name, heroId: hero.id }})}>Activate</Button>
                                                }
                                            </Center>
                                            <Center>
                                                <Button onClick={() => openInventory(hero.id!, hero.type)}>Inventory</Button>
                                            </Center>
                                        </Flex>
                                    ))
                                }
                                {
                                    data &&
                                        difference(Object.values(HeroType), data.heroes.map(hero => hero.type)).map(type => (
                                            <Flex direction="row" justifyContent="space-between" key={type}>
                                                <Image src={getHeroClassImageSrc(type)} alt="Vercel Logo" width={60} height={60} />
                                                <Center>
                                                    <Text>{formatHeroType(type)}</Text>
                                                </Center>
                                                <Center>
                                                    <Button 
                                                        onClick={() => createNewHeroMutation({ variables: { name, type }})}
                                                        disabled={type !== HeroType.WARRIOR && type !== HeroType.ROGUE && type !== HeroType.RANGER}
                                                    >
                                                        Create
                                                    </Button>
                                                </Center>
                                            </Flex>
                                        ))
                                }
                            </Stack>
                        </>
                }
            </Container>
        </Flex>
    )
}

export default HeroSelection;


