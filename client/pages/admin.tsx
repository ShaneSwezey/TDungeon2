import { gql, useMutation } from '@apollo/client';
import { Button, Container, Flex, Heading, useColorModeValue } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { client } from '../apollo-client';
import Header from '../components/header';

const IS_BATTLE_QUERY = gql`
    query isCurrentBattle {
        currentBattle
    }
`;

const CREATE_BATTLE_MUTATION = gql`
    mutation createBattle {
        createBattle {
            id
        }
    }
`;

interface ICreateBattleData {
    createBattle: {
        id: string;
    }
}

interface Props {
    currentBattle: boolean;
}

const Admin: NextPage<Props> = ({ currentBattle }: Props) => {
    const [ createBattle, { loading, data } ] = useMutation<ICreateBattleData>(CREATE_BATTLE_MUTATION);
    const formBackground = useColorModeValue("gray.100", "gray.700");

    console.log("data:", data);

    return (
        <>
            <Header />
            <Flex direction="row">
                <Container m={10} background={formBackground} p={12} rounded={5}>
                    <Heading mb={6}>Admin Controls</Heading>
                    <Button
                        backgroundColor="#E53E3E"
                        isDisabled={currentBattle}
                        onClick={() => createBattle()}
                    >
                        New Battle
                    </Button>
                </Container>
                {
                    data && 
                        <Container m={10} background={formBackground} p={12} rounded={5}>
                            <Heading mb={6}>{data.createBattle.id}</Heading>
                        </Container>
                }
            </Flex>
        </>
    );
}

export async function getServerSideProps() {
    const { data } = await client.query({
        query: IS_BATTLE_QUERY
    });

    return {
        props: {
            curentBattle: data.currentBattle
        }
    }
}

export default Admin;