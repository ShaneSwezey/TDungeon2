import { gql, useMutation, useQuery } from "@apollo/client";
import { Button, Center, Container, Flex, Heading, Spinner, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Header from "./header";
import { IHero } from "../interfaces/hero";
import Image from 'next/image';
import { difference, upperFirst } from "lodash";
import { formatHeroType, getHeroClassImageSrc } from "../utils/hero";
import { HeroType } from "../enums/hero";

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

const Heroes = () => {
    const { data: session } = useSession();
    const { loading, data } = useQuery<HeroQueryData, HeroQueryParameters>(HEROES_QUERY, { variables: { name: session!.user!.name!.toLowerCase() } });
    const [ setHeroActiveMutation ] = useMutation(
        SET_HERO_ACTIVE_MUTATION,
        { 
            refetchQueries: [ { query: HEROES_QUERY, variables: { name: session!.user!.name!.toLowerCase() } }, "heroes" ] 
        }
    );
    const [ createNewHeroMutation ] = useMutation(
        CREATE_NEW_HERO_MUTATION,
        {
            refetchQueries: [ { query: HEROES_QUERY, variables: { name: session!.user!.name!.toLowerCase() } }, "heroes" ] 
        }
    );
    const formBackground = useColorModeValue("gray.100", "gray.700");

    return (
        <>
            <Header />
            <Flex direction="row">
                <Container m={10} background={formBackground} p={12} rounded={5}>
                    <Heading mb={6}>Heroes</Heading>
                    {
                        loading ?
                            <Spinner />
                        :
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
                                                        <Button onClick={() => setHeroActiveMutation({ variables: { name: session!.user!.name!.toLowerCase(), heroId: hero.id }})}>Activate</Button>
                                                }
                                            </Center>
                                            <Center>
                                                <Button>Inventory</Button>
                                            </Center>
                                        </Flex>
                                    ))
                                }
                                {
                                    difference(Object.values(HeroType), (data?.heroes || []).map(hero => hero.type)).map(type => (
                                        <Flex direction="row" justifyContent="space-between" key={type}>
                                            <Image src={getHeroClassImageSrc(type)} alt="Vercel Logo" width={60} height={60} />
                                            <Center>
                                                <Text>{formatHeroType(type)}</Text>
                                            </Center>
                                            <Center>
                                                <Button 
                                                    onClick={() => createNewHeroMutation({ variables: { name: session!.user!.name!.toLowerCase(), type }})}
                                                    disabled={type !== HeroType.WARRIOR && type !== HeroType.ROGUE && type !== HeroType.RANGER}
                                                >
                                                    Create
                                                </Button>
                                            </Center>
                                        </Flex>
                                    ))
                                }
                            </Stack>
                    }
                </Container>
            </Flex>
        </>
    );
}

interface HeroQueryParameters {
    name: string;
}

interface HeroQueryData {
    heroes: IHero[];
}

export default Heroes;