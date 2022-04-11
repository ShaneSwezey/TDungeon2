import { gql, useMutation, useQuery } from '@apollo/client';
import { Button, Container, Flex, Heading, Spinner, useColorModeValue } from '@chakra-ui/react';
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

interface CurrentBattlePayload {
    currentBattle: boolean;
}

const Admin: NextPage = () => {
    const { data: queryData, loading: queryLoading  } = useQuery<CurrentBattlePayload>(IS_BATTLE_QUERY);
    const [ createBattle, { data: mutationData, loading: mutationLoading } ] = useMutation<ICreateBattleData>(CREATE_BATTLE_MUTATION);
    const formBackground = useColorModeValue("gray.100", "gray.700");

    return (
        <Flex direction="row">
            {
                queryLoading ? 
                    <Spinner />
                :
                    <Container m={10} background={formBackground} p={12} rounded={5}>
                        <Heading mb={6}>Admin Controls</Heading>
                        <Button
                            backgroundColor="#E53E3E"
                            isDisabled={queryData?.currentBattle}
                            onClick={() => createBattle()}
                        >
                            New Battle
                        </Button>
                    </Container>
            }
            {
                mutationData && 
                    <Container m={10} background={formBackground} p={12} rounded={5}>
                        <Heading mb={6}>{mutationData?.createBattle.id}</Heading>
                    </Container>
            }
        </Flex>
    );
}

export default Admin;