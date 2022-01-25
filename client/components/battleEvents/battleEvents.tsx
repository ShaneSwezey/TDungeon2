import { Container, Flex, Heading, VStack, Box, HStack } from "@chakra-ui/layout";
import { Center, Spinner, useColorModeValue } from "@chakra-ui/react";
import { gql, useQuery } from "@apollo/client";
import { IBattleEvent } from "../../interfaces/battleEvent";
import { EventCharacter } from "../../enums/character";
import { IBattleEventHero } from "../../interfaces/hero";
import { IBattleEventMonster } from "../../interfaces/monster";
import NameRow from "./nameRow";
import HeroEvent from "./heroEvent";
import MonsterEvent from "./monsterEvent";

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
            initiatorType
            initiator {
                ...HeroFragment
                ...MonsterFragment
            }
            initiatorAction {
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
            receiverType
            receiver {
                ...HeroFragment
                ...MonsterFragment
            }
            receiverAction {
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
    battleId: string
}

const BattleEvents = ({ battleId }: Props)=> {
    const { loading, data } = useQuery<DataQuery, DataVariables>(Battle_Events_Query, { variables: { battleId }});
    const formBackground = useColorModeValue("gray.100", "gray.700");
    
    return (
        <Container mt={10}>
            <Flex direction="column" background={formBackground} p={12} rounded={5}>
                <HStack>
                <Heading mb={6}>Events</Heading>
                <Center>
                    <Heading mb={6} size="md">{`#${battleId}`}</Heading>
                </Center>
                </HStack>
                {
                    loading ? 
                        <Spinner />
                    :
                        <>
                            {
                                data?.battleEvents.map(battleEvent => (
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
                        </>
                }
            </Flex>
        </Container>
    )
}

export default BattleEvents;