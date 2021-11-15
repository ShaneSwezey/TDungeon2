import { NextPage } from "next";
import { Container, VStack, Heading, useColorModeValue, Center, Text, Spacer } from "@chakra-ui/react"
import { Flex,  } from '@chakra-ui/layout';
import Image from 'next/image'
import { Battle } from "../interfaces";

interface Props {
    battles: Battle[];
    onClick: (battleId: string) => void;
}

// #D0021B

export const Battles: NextPage<Props> = ({ battles, onClick }: Props) => {
    const formBackground = useColorModeValue("gray.100", "gray.700");

    return (
        <Container m={10}>
          <Flex direction="column" background={formBackground} p={12} rounded={5}>
            <Heading mb={6}>Battle</Heading>
            <VStack spacing="24px" mb={5}>
              {
                battles.map(({ _id, winner, createdAt }) => {
                  const winnerColor = winner === "Heroes" ? "blue.300" : "green.300";
                  const date = new Date(createdAt);
                  const dateString = `${date.toLocaleDateString()}-${date.toLocaleTimeString()}`
                  return(
                    <Flex 
                      direction="row" 
                      w="100%" 
                      h="70px" 
                      border="solid" 
                      borderColor={winnerColor} 
                      rounded={5} 
                      _hover={{ cursor: "pointer" }} key={_id}
                      p={1}
                      onClick={() => onClick(_id)}
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
                          {`#${_id.substring(_id.length - 5)} ${dateString}`}
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
          </Flex>
        </Container>
    );
}