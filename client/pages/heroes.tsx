import { gql, useMutation, useQuery } from "@apollo/client";
import { Button, Center, Container, Flex, Heading, Spinner, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { IHero } from "../interfaces/hero";
import { difference, upperFirst } from "lodash";
import { formatHeroType, getHeroClassImageSrc } from "../utils/hero";
import { HeroType } from "../enums/hero";
import { NextPage } from "next";
import { Session } from "next-auth";
import Link from "next/link";
import Image from 'next/image';

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

interface HeroQueryParameters {
    name: string;
}

interface HeroQueryData {
    heroes: IHero[];
}

const Heroes: NextPage = () => {
    const { data: session, status } = useSession();
    return (
        <>
            {
                status !== 'authenticated' ? 
                        <Spinner />
                    :
                        <HeroesChild session={session} />
            }
        </>
    )
}

interface HeroesChildProps {
    session: Session;
}

const HeroesChild = ({ session }: HeroesChildProps) => {
    const { data, loading } = useQuery<HeroQueryData, HeroQueryParameters>(HEROES_QUERY, { variables: { name: session.user!.name!.toLowerCase() as string }});
    
    const [ setHeroActiveMutation ] = useMutation(SET_HERO_ACTIVE_MUTATION, { 
        refetchQueries: [
            HEROES_QUERY,
            'heroes'
        ]
    });
    const [ createNewHeroMutation ] = useMutation(CREATE_NEW_HERO_MUTATION, {
        refetchQueries: [
            HEROES_QUERY,
            'heroes'
        ]
    });
    
    const formBackground = useColorModeValue("gray.100", "gray.700");

    const setHeroActive = async (heroId: string) => {
        try {
            await setHeroActiveMutation({ variables: { name: session!.user!.name!.toLowerCase() as string, heroId }});
        } catch(error) {
            console.error('[setHeroActive]', error);
            throw error;
        }
    }

    const createNewHero = async (type: HeroType) => {
        try {
            await createNewHeroMutation({ variables: { name: session!.user!.name!.toLowerCase() as string, type }});
        } catch(error) {
            console.error('[createNewHero]', error);
            throw error;
        }
    }

    return (
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
                                                <Button onClick={() => setHeroActive(hero.id!)}>Activate</Button>
                                        }
                                    </Center>
                                    <Center>
                                        <Link
                                            href={{
                                                pathname: "hero/[id]",
                                                query: { id: hero.id! }
                                            }}
                                            passHref
                                        >
                                            <Button>Character</Button>
                                        </Link>
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
                                            onClick={() => createNewHero(type)}
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
    );
}


export default Heroes;