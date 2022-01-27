import { Container, VStack, Heading, useColorModeValue, Center, Text, Spacer, Spinner } from "@chakra-ui/react"
import { Flex,  } from '@chakra-ui/layout';
import Image from 'next/image'
import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import BattleEvents from './battleEvents/battleEvents';
import { IBattle } from "../interfaces/battle";

// #D0021B

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

interface QueryData {
  battles: {
    next: string;
    list: IBattle[];
  }
}

const Battles = () => {
  const { loading, data } = useQuery<QueryData>(BATTLES_QUERY);
  const [selectedBattleId, setSelectedBattleId] = useState<string | undefined>(undefined);
  const formBackground = useColorModeValue("gray.100", "gray.700");

  const onClick = (id: string) => setSelectedBattleId(id);

  return (
    <Flex direction="row">
      <Container m={10}>
        <Flex direction="column" background={formBackground} p={12} rounded={5}>
          <Heading mb={6}>Battles</Heading>
          {
            loading ?
              <Spinner />
            :
            <VStack spacing="24px" mb={5}>
              {
                (data?.battles.list || []).map(({ id, winner, createdAt }) => {
                  const winnerColor = winner === "Heroes" ? "blue.300" : "green.300";
                  return(
                    <Flex 
                      direction="row" 
                      w="100%" 
                      h="70px" 
                      border="solid" 
                      borderColor={winnerColor} 
                      rounded={5} 
                      _hover={{ cursor: "pointer" }} key={id}
                      p={1}
                      onClick={() => onClick(id)}
                    >
                      {
                        winner === "Heroes" ?
                        <Image src="/spartan-helmet-blue.svg" alt="Vercel Logo" width={60} height={100} />
                        :
                        <Image src="/spartan-helmet-red.svg" alt="Vercel Logo" width={60} height={16} />
                      }
                      <Spacer />
                      <Center>
                        <Text color={winnerColor} fontWeight="bold">
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
                  )
                })
              }
            </VStack>
          }
        </Flex>
      </Container>
      {
        selectedBattleId &&
          <BattleEvents battleId={selectedBattleId} />
      }
    </Flex>
  );
}

export default Battles;