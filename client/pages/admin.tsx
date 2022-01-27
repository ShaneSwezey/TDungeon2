import { gql, useMutation } from '@apollo/client';
import { Button, Container, Flex, Heading, useColorModeValue } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { getSession } from 'next-auth/react';
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

interface Props {
    currentBattle: boolean;
}

const Admin: NextPage<Props> = ({ currentBattle }: Props) => {
    const [ createBattle, { loading, data } ] = useMutation(CREATE_BATTLE_MUTATION);
    const formBackground = useColorModeValue("gray.100", "gray.700");

    return (
        <>
            <Header />
            <Flex direction="row">
                <Container m={10} background={formBackground} p={12} rounded={5}>
                    <Heading mb={6}>Admin Controls</Heading>
                    <Button
                        backgroundColor="#E53E3E"
                        isDisabled={currentBattle}
                    >
                        New Battle
                    </Button>
                </Container>
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