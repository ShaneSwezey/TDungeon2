import { gql } from "@apollo/client";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Center, Container, Flex, Heading, HStack, Icon, Spacer, useColorModeValue, VStack } from "@chakra-ui/react";
import { GetServerSidePropsContext, NextPage } from "next";
import { client } from "../../apollo-client";
import HeroEvent from "../../components/battleEvents/heroEvent";
import MonsterEvent from "../../components/battleEvents/monsterEvent";
import NameRow from "../../components/battleEvents/nameRow";
import Header from "../../components/header";
import { EventCharacter } from "../../enums/character";
import { IBattleEvent } from "../../interfaces/battleEvent";
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
    fragment HeroFragment on Hero {
        id
        name
        heroType: type
        crit
        dodge
        block
        attackPower
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
            damage {
                high
                low
            }
            rarity
            crit {
                chance
            }
            imgSrc
        }
    }
`;

const MONSTER_FRAGMENT = gql`
    fragment MonsterFragment on Monster {
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
        weapons {
            name
            type
            damage {
                high
                low
            }
            rarity
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
            initiator {
                character {
                    ...HeroFragment
                    ...MonsterFragment
                }
                action {
                    type
                    value
                    isCrit
                    weapon {
                        name
                        type
                        damage {
                            low
                            high
                        }
                        rarity
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
                    type
                    value
                    isCrit
                    weapon {
                        name
                        type
                        damage {
                            low
                            high
                        }
                        rarity
                        crit {
                            chance
                        }
                        imgSrc
                    }
                }
            }
        }
    }
`;

const getBorderColor = (type: EventCharacter) => {
    switch(type) {
        case EventCharacter.HERO:
            return "blue.300";
        case EventCharacter.MONSTER:
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
        <>
            <Header />
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
                                        borderColor={getBorderColor(battleEvent.initiatorType) as EventCharacter} 
                                        rounded={5} 
                                        p={1}
                                        mb={0}
                                        justifyContent="space-between"
                                    >
                                        <>
                                            <HeroEvent 
                                                hero={(battleEvent.initiatorType === EventCharacter.HERO ? battleEvent.initiator : battleEvent.receiver) as IBattleEventHero}
                                                initiatorType={battleEvent.initiatorType}
                                                receiverAction={battleEvent.receiverAction}
                                                initiatorAction={battleEvent.initiatorAction}
                                            />
                                            <MonsterEvent 
                                                monster={(battleEvent.initiatorType === EventCharacter.MONSTER ? battleEvent.initiator : battleEvent.receiver) as IBattleEventMonster}
                                                initiatorType={battleEvent.initiatorType}
                                                receiverAction={battleEvent.receiverAction}
                                                initiatorAction={battleEvent.initiatorAction}
                                            />
                                        </>
                                    </HStack>
                                    <NameRow 
                                        hero={(battleEvent.initiatorType === EventCharacter.HERO ? battleEvent.initiator : battleEvent.receiver) as IBattleEventHero} 
                                        monster={(battleEvent.initiatorType === EventCharacter.MONSTER ? battleEvent.initiator : battleEvent.receiver) as IBattleEventMonster} 
                                    />
                                </VStack>
                            ))
                        }
                </Flex>
            </Container>
        </>
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
        return { 
            props: {
                errorStatus: 404 // hard coded for now, will fix later
            }
        };
    }
}


export default BattleEvents;