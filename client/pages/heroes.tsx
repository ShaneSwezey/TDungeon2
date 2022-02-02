import { gql, useMutation } from "@apollo/client";
import { Button, Center, Container, Flex, Heading, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Header from "../components/header";
import { IHero } from "../interfaces/hero";
import Image from 'next/image';
import { difference, upperFirst } from "lodash";
import { formatHeroType, getHeroClassImageSrc } from "../utils/hero";
import { HeroType } from "../enums/hero";
import Link from "next/link";
import { client } from "../apollo-client";
import { GetServerSidePropsContext, NextPage } from "next";
import ErrorPage from "next/error";
import { useRouter } from "next/router";

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
    heroes?: IHero[];
    name: string;
    errorStatus?: number;
}

const Heroes: NextPage<Props> = ({ heroes, name, errorStatus }: Props) => {
    const { data: session } = useSession();
    const [ setHeroActiveMutation ] = useMutation(SET_HERO_ACTIVE_MUTATION);
    const [ createNewHeroMutation ] = useMutation(CREATE_NEW_HERO_MUTATION);
    const router = useRouter();
    const formBackground = useColorModeValue("gray.100", "gray.700");

    if (heroes === undefined) return <ErrorPage statusCode={errorStatus!} />

    const setHeroActive = async (heroId: string) => {
        try {
            const { data } = await setHeroActiveMutation({ variables: { name: session!.user!.name!.toLowerCase(), heroId }});
            if (data) router.replace(router.asPath);
        } catch(error) {
            console.log('[setHeroActive]', error);
            throw error;
        }
    }

    const createNewHero = async (type: HeroType) => {
        try {
            const { data } = await createNewHeroMutation({ variables: { name: session!.user!.name!.toLowerCase(), type }});
            if (data) router.replace(router.asPath);
        } catch(error) {
            console.log('[createNewHero]', error);
            throw error;
        }
    }

    return (
        <>
            <Header />
            <Container m={10} background={formBackground} p={12} rounded={5}>
                <Heading mb={6}>Heroes</Heading>
                <Stack direction="column" spacing={5} justifyContent="space-between">
                    {
                        heroes.map(hero => (
                            <Flex direction="row" justifyContent="space-between" key={hero.type}>
                                <Image src={getHeroClassImageSrc(hero.type)} alt="Vercel Logo" width={60} height={60} />
                                <Center>
                                    <Text>{upperFirst(hero.type.toLowerCase())}</Text>
                                </Center>
                                {
                                    session && session.user?.name?.toLowerCase() === name &&
                                        <>
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
                                        </>
                                }
                            </Flex>
                        ))
                    }
                    {
                        difference(Object.values(HeroType), (heroes || []).map(hero => hero.type)).map(type => (
                            <Flex direction="row" justifyContent="space-between" key={type}>
                                <Image src={getHeroClassImageSrc(type)} alt="Vercel Logo" width={60} height={60} />
                                <Center>
                                    <Text>{formatHeroType(type)}</Text>
                                </Center>
                                {
                                    session && session.user?.name?.toLowerCase() === name &&
                                        <Center>
                                            <Button 
                                                onClick={() => createNewHero(type)}
                                                disabled={type !== HeroType.WARRIOR && type !== HeroType.ROGUE && type !== HeroType.RANGER}
                                            >
                                                Create
                                            </Button>
                                        </Center>
                                }
                            </Flex>
                        ))
                    }
                </Stack>
            </Container>
        </>
    );
}

interface HeroQueryParameters {
    name: string;
}

interface HeroQueryData {
    heroes: IHero[];
}

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
    try {
        const { name } = query;
        const { data } = await client.query<HeroQueryData, HeroQueryParameters>({
            query: HEROES_QUERY,
            variables: { name: name as string }
        });

        return {
            props: {
                heroes: data.heroes,
                name
            }
        }
    } catch(error) {
        return {
            props: {
                errorStatus: 404 // hard coded for now, will fix later
            }
        }
    }
}

export default Heroes;