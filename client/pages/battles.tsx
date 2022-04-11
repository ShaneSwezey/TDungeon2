import { 
    Center, 
    Container, 
    Flex, 
    Heading, 
    Spacer, 
    useColorModeValue,
    Text, 
    VStack,
    Spinner
} from '@chakra-ui/react';
import { gql, useQuery } from '@apollo/client';
import type { NextPage } from 'next';
import { IBattle } from '../interfaces/battle';
import Image from 'next/image'
import Link from "next/link";

const BATTLES_QUERY = gql`
  query battles {
    battles {
      next
      list {
        id
        winner
        createdAt
      }
    }
  }
`;

interface Battles {
    battles: {
        next: string;
        list: IBattle[];
    }
}

const Battles: NextPage = () => {
    const { data, loading } = useQuery<Battles>(BATTLES_QUERY);
    const formBackground = useColorModeValue("gray.100", "gray.700");

    return (
        <Flex direction="row" justifyContent="center">
            <Container m={10} background={formBackground} p={12} rounded={5}>
                <Flex direction="column" >
                    <Heading mb={6}>Battles</Heading>
                    {
                        loading ? 
                            <Spinner />
                        :
                            <VStack spacing="24px" mb={5}>
                                {
                                    data?.battles.list.map(({ id, winner, createdAt }) => (
                                        <Link
                                            href={{
                                                pathname: 'battleEvents/[id]',
                                                query: { id }
                                            }}
                                            key={id}
                                            passHref
                                        >
                                            <Flex 
                                                direction="row" 
                                                w="100%" 
                                                h="70px" 
                                                border="solid" 
                                                borderColor={winner === "Heroes" ? "blue.300" : "green.300"} 
                                                rounded={5} 
                                                _hover={{ cursor: "pointer" }} key={id}
                                                p={1}
                                            >
                                                {
                                                    winner === "Heroes" ?
                                                        <Image src="/spartan-helmet-blue.svg" alt="Vercel Logo" width={60} height={100} />
                                                    :
                                                        <Image src="/spartan-helmet-red.svg" alt="Vercel Logo" width={60} height={16} />
                                                }
                                                <Spacer />
                                                <Center>
                                                    <Text color={winner === "Heroes" ? "blue.300" : "green.300"} fontWeight="bold">
                                                        {`#${id} ${new Date(createdAt).toDateString()}`}
                                                    </Text>
                                                </Center>
                                                <Spacer />
                                                {
                                                    winner === "Heroes" ? 
                                                        <Image src="/devil-mask-red.svg" alt="Vercel Logo" width={60} height={100} />
                                                    :
                                                        <Image src="/devil-mask-green.svg" alt="Vercel Logo" width={60} height={16} />
                                                } 
                                            </Flex>
                                        </Link>
                                    ))
                                }
                            </VStack>
                    }
                </Flex>
            </Container>
        </Flex>
    );
}

export default Battles;