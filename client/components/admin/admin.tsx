import { Flex, Container, Heading, useColorModeValue, Button, Spinner } from "@chakra-ui/react";
import { useQuery, gql, useMutation } from '@apollo/client';

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

interface CurrentBattle {
    currentBattle: boolean;
}

const Admin = () => {
    const { loading, data } = useQuery<CurrentBattle>(IS_BATTLE_QUERY);
    const [ createBattle, createBattleResult ] = useMutation(CREATE_BATTLE_MUTATION);
    const formBackground = useColorModeValue("gray.100", "gray.700");

    return (
        <Flex direction="row">
            <Container m={10} background={formBackground} p={12} rounded={5}>
                <Heading mb={6}>Admin Controls</Heading>
                {
                    loading ?
                        <Spinner />
                    :
                        <Button
                            backgroundColor="#E53E3E"
                            isDisabled={data!.currentBattle}
                            onClick={() => createBattle()}
                        >
                            New Battle
                        </Button>
                }
            </Container>
            {
                createBattleResult.data &&
                <Container m={10} background={formBackground} p={12} rounded={5}>
                    <Heading mb={6}>Battle {createBattleResult.data.createBattle.id}</Heading>
                </Container>
            }
        </Flex>
    );
}

export default Admin;