import { gql } from "@apollo/client";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Center, Container, Flex, Heading, HStack, Icon, useColorModeValue, VStack } from "@chakra-ui/react";
import { GetServerSidePropsContext, NextPage } from "next";
import { client } from "../../apollo-client";
import HeroEvent from "../../components/battleEvents/heroEvent";
import MonsterEvent from "../../components/battleEvents/monsterEvent";
import NameRow from "../../components/battleEvents/nameRow";
import Header from "../../components/header";
import { EventCharacter } from "../../enums/character";
import { IAction, IBattleEvent } from "../../interfaces/battleEvent";
import { IBattleEventHero } from "../../interfaces/hero";
import { IBattleEventMonster } from "../../interfaces/monster";
import { useRouter } from 'next/router';
import ErrorPage from "next/error";

interface DataQuery {
    battleEvents: IBattleEvent[]
}

interface DataVariables {
    battleId: string
}

const HERO_FRAGMENT = gql`
    fragment HeroFragment on BattleEventHero {
        id
        name
        heroType: type
        crit
        dodge
        block
        attackPower
        imgSrc
        stamina {
            maxHitPoints
            hitPoints
        }
        armor {
            name
            type
            slot
            hitPoints
        }
        weapons {
            name
            type
            rarity
            damage {
                high
                low
            }
            crit {
                chance
            }
            imgSrc
        }
    }
`;

const MONSTER_FRAGMENT = gql`
    fragment MonsterFragment on BattleEventMonster {
        id
        monsterType: type
        stamina {
            maxHitPoints
            hitPoints
        }
        crit
        dodge
        attackPower
        block
        imgSrc
        weapons {
            name
            type
            rarity
            damage {
                high
                low
            }
            crit {
                chance
            }
            imgSrc
        }
    }
`;



  
const Battle_Events_Query = gql`
    ${HERO_FRAGMENT}
    ${MONSTER_FRAGMENT}
    query BattleEvents($battleId: String!) {
        battleEvents(battleId: $battleId) {
            id
            battleId
            round
            iteration
            turn
            initiator {
                character {
                    ...HeroFragment
                    ...MonsterFragment
                }
                action {
                    events
                    value
                    isCrit
                    weapon {
                        name
                        type
                        rarity
                        damage {
                            low
                            high
                        }
                        crit {
                            chance
                        }
                        cleave {
                            chance
                            num {
                                low
                                high
                            }
                        }
                        flurry {
                            chance
                            num {
                                low
                                high
                            }
                        }
                        imgSrc
                    }
                }
            }
            receiver {
                character {
                    ...HeroFragment
                    ...MonsterFragment
                }
                action {
                    events
                    value
                    isCrit
                }
            }
        }
    }
`;

const getBorderColor = (type: string) => {
    switch(type) {
        case "HEROES":
            return "blue.300";
        case "MONSTERS":
            return "green.400";
        default:
            return "blue.300";
    }
}

interface Props {
    battleEvents?: IBattleEvent[]
    errorStatus?: number;
}

const BattleEvents: NextPage<Props> = ({ battleEvents, errorStatus }: Props) => {
    const router = useRouter();
    const formBackground = useColorModeValue("gray.100", "gray.700");

    if (battleEvents === undefined) return <ErrorPage statusCode={errorStatus!} />

    return (
        <Container mt={10} maxWidth="65%">
            <Flex direction="column" background={formBackground} p={12} rounded={5}>
                <HStack mb={5}>
                    <Icon 
                        as={ChevronLeftIcon} 
                        boxSize={10} 
                        _hover={{ cursor: "pointer" }}
                        onClick={() => router.back()}
                    />
                    <Heading mb={6} ml={5}>Battle Events</Heading>
                    <Center>
                        <Heading size="lg">{`#${battleEvents[0].battleId}`}</Heading>
                    </Center>
                </HStack>
                    {
                        battleEvents.map(battleEvent => (
                            <VStack spacing="5px" mb={5} key={battleEvent.id}>
                                <HStack
                                    w="100%" 
                                    h="70px" 
                                    border="solid" 
                                    borderColor={getBorderColor(battleEvent.turn)} 
                                    rounded={5} 
                                    p={1}
                                    mb={0}
                                    justifyContent="space-between"
                                >
                                    <>
                                        <HeroEvent 
                                            hero={(battleEvent.turn === "HEROES" ? battleEvent.initiator.character : battleEvent.receiver.character) as IBattleEventHero}
                                            action={(battleEvent.turn === "HEROES" ? battleEvent.initiator.action : battleEvent.receiver.action) as IAction}
                                            turn={battleEvent.turn}
                                        />
                                        <MonsterEvent 
                                            monster={(battleEvent.turn === "MONSTERS" ? battleEvent.initiator.character : battleEvent.receiver.character) as IBattleEventMonster}
                                            action={(battleEvent.turn === "MONSTERS" ? battleEvent.initiator.action : battleEvent.receiver.action) as IAction}
                                            turn={battleEvent.turn}
                                        />
                                    </>
                                </HStack>
                                <NameRow 
                                    hero={(battleEvent.turn === "HEROES" ? battleEvent.initiator.character : battleEvent.receiver.character) as IBattleEventHero} 
                                    monster={(battleEvent.turn === "MONSTERS" ? battleEvent.initiator.character : battleEvent.receiver.character) as IBattleEventMonster} 
                                />
                            </VStack>
                        ))
                    }
            </Flex>
        </Container>
    );
}

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
    try {
        const { id } = query;
        const { data } = await client.query<DataQuery, DataVariables>({
            query: Battle_Events_Query,
            variables: { battleId: id as string }
        });

        return {
            props: {
                battleEvents: data.battleEvents
            }
        }
    } catch(error) {
        console.log('error:', error);
        return { 
            props: {
                errorStatus: 404 // hard coded for now, will fix later
            }
        };
    }
}


export default BattleEvents;