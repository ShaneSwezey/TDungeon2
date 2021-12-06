import { Container, Flex, Heading, VStack, Spacer, Text, Center, Box, Stack } from "@chakra-ui/layout";
import { ChevronUpIcon } from '@chakra-ui/icons';
import { useColorModeValue } from "@chakra-ui/react";
import { NextPage } from "next";
import { BattleEvent, Event, Hero, HeroAttack, Monster } from "../interfaces";
import Image from 'next/image';
import { gql, useQuery } from "@apollo/client";

const Hero_Fragment = gql`
    fragment HeroFragment on Hero {
      id
      name
      type
      stamina {
        hitPoints
        maxHitPoints
      }
      armor {
        name
        type
        slot
        hitPoints
      }
    }
`;
  
  const Hero_Attack_Fragment = gql`
    fragment HeroAttackFragment on HeroAttackType {
      id
      name
      type
      stamina {
        hitPoints
        maxHitPoints
      }
      armor {
        name
        type
        slot
        hitPoints
      }
      weapon {
        name
        type
        damage {
          low
          high
        }
      }
    }
  `;
  
  const Monster_Fragment = gql`
    fragment MonsterFragment on Monster {
      id
      type
      stamina {
        hitPoints
        maxHitPoints
      }
      attack {
        low
        high
      }
    }
  `;
  
  const Battle_Events_Query = gql`
    ${Hero_Fragment}
    ${Monster_Fragment}
    ${Hero_Attack_Fragment}
    query BattleEvents($battleId: String!) {
      battleEvents(battleId: $battleId) {
        _id
        battleId
        round
        iteration
        event {
          type
          value
          isCrit
          deathBlow
          to {
            ...HeroFragment
            ...MonsterFragment
          }
          from {
            ...HeroAttackFragment
            ...MonsterFragment
          }
        }
      }
    }
  `;



const determineBorderColor = (type: string) => {
    switch(type) {
        case "Orc":
            return "green.400";
        case "Goblin":
            return "green.400";
        case "Ghoul":
            return "green.400";
        default:
            return "blue.300";
    }
}

interface RowProps {
    battleEvent: BattleEvent;
}

const isTypeHero = (type: string) => ["Melee", "Ranged", "Caster"].includes(type);
const isTypeMonster = (type: string) => ["Goblin", "Orc", "Ghoul"].includes(type);

 const getHeroImage = (battleEvent: BattleEvent) => {
    const { event } = battleEvent;
    const isToTypeHero = isTypeHero(event.to.type);
    if (isToTypeHero) {
        if (event.deathBlow) return '/chopped-skull.svg';
        return `/${event.to.type}-red.svg`;
    } else {
        return `/${event.from.type}-blue.svg`
    }
}

const getMonsterImage = (battleEvent: BattleEvent) => {
    const { event } = battleEvent;
    const isToTypeMonster = isTypeMonster(event.to.type);
    if (isToTypeMonster) {
        if (event.deathBlow) return '/chopped-skull.svg';
        return `/${event.to.type}-red.svg`;
    } else {
        return `/${event.from.type}-green.svg`
    }
}

interface AttackProps {
    event: Event;
}

const Attack: NextPage<AttackProps> = ({ event }: AttackProps) => {
    const isToTypeHero = isTypeHero(event.to.type);
    if (isToTypeHero) {
        return <>
            <Center ml={2}>
                <Text color="#D0021B" fontWeight="bolder" fontSize={event.isCrit ? 40 : 20}>-{event.value}</Text>
            </Center>
            <Spacer />
            <Stack direction="column">
            {
                event.type === "Flurry" &&
                <Text color="white" fontWeight="bold" backgroundColor="green.300" pl={1} pr={1} rounded={5} h={6}>Flurry</Text>
            }
            {
                event.isCrit &&
                <Text color="white" fontWeight="bold" backgroundColor="green.300" pl={1} pr={1} rounded={5} h={6} w={37}>Crit</Text>
            }
            </Stack>
            <Image src={`/${event.from.type}-attack.svg`} alt="Vercel Logo" width={60} height={100} />
        </>
    } else {
        const hero = event.from as HeroAttack;
        return <>
            <Image 
                src={`/${event.from.type}-attack.svg`} 
                alt="Vercel Logo" 
                width={60} 
                height={100}
            />
            <Stack direction="column">
            {
                event.type === "Flurry" &&
                <Text color="white" fontWeight="bold" backgroundColor="blue.300" pl={1} pr={1} rounded={5} h={6}>Flurry</Text>
            }
            {
                event.isCrit &&
                <Text color="white" fontWeight="bold" backgroundColor="blue.300" pl={1} pr={1} rounded={5} h={6} w={37}>Crit</Text>
            }
            </Stack>
            <Spacer />
            <Center mr={2}>
                <Text color="#D0021B" fontWeight="bolder" fontSize={event.isCrit ? 40 : 20}>-{event.value}</Text>
            </Center>
        </>
    }
}

interface HumanBlockProps {
    battleEvent: BattleEvent;
}

const HumanBlock: NextPage<HumanBlockProps> = ({ battleEvent }: HumanBlockProps) => {
    const isToTypeHero = isTypeHero(battleEvent.event.to.type);
    const hero = (isToTypeHero ? battleEvent.event.to : battleEvent.event.from) as Hero;
    const color = isToTypeHero ? "#D0021B" : "blue.300"
    return (
        <Stack direction="column">
            <Image src={getHeroImage(battleEvent)} width={60} height={100} />
            {/* <Text color={color}>{hero.name}-{hero.stamina.hitPoints}/{hero.stamina.maxHitPoints}</Text> */}
        </Stack>
    );
}

const Row: NextPage<RowProps> = ({ battleEvent }: RowProps) => {
    return(
        <>
            <HumanBlock battleEvent={battleEvent} />
            <Attack event={battleEvent.event} />
            <Image src={getMonsterImage(battleEvent)} width={60} height={100} />
        </>
    );
}



const NameRow: NextPage<RowProps> = ({ battleEvent } : RowProps) =>  {
    const isToTypeHero = isTypeHero(battleEvent.event.to.type);
    const hero = (isToTypeHero ? battleEvent.event.to : battleEvent.event.from) as Hero;
    const heroColor = isToTypeHero ? "red.500" : "blue.300";
    const monster = (!isToTypeHero ? battleEvent.event.to : battleEvent.event.from) as Monster;
    const monsterColor = isToTypeHero ? "green.300" : "red.500";
    return (
        <Flex
            direction="row" 
            w="100%" 
            h="30px"  
            //key={battleEvent._id}
            mt={0}
        >
            <ChevronUpIcon ml={2} color={heroColor} />
            <Text color={heroColor} fontWeight="bold">{hero.name} {hero.stamina.hitPoints}/{hero.stamina.maxHitPoints}</Text>
            <Spacer />
            <Text color={monsterColor} fontWeight="bold">{`${monster.stamina.hitPoints}/${monster.stamina.maxHitPoints} ${monster.type}#${monster.id?.substring(monster.id.length - 4)}`}</Text>
            <ChevronUpIcon mr={2} color={monsterColor} />
        </Flex>
    );
}

interface Props {
    battleId: number
}

const BattleEvents: NextPage<Props> = ({ battleId }: Props)=> {
    const {loading, error, data} = useQuery(Battle_Events_Query, { variables: { battleId }});

    const formBackground = useColorModeValue("gray.100", "gray.700");
    if (loading) return <div>Loading...</div>;
    return (
        <Container mt={10}>
            <Flex direction="column" background={formBackground} p={12} rounded={5}>
                <Heading mb={6}>{`Events #${data.battleEvents[0].battleId.substring(data.battleEvents[0].battleId.length - 5)}`}</Heading>
                <VStack spacing="5px" mb={5} >
                    {
                        data.battleEvents.map((battleEvent: any) => 
                            <Box w="100%" key={battleEvent._id}>
                                <Flex
                                    direction="row" 
                                    w="100%" 
                                    h="70px" 
                                    border="solid" 
                                    borderColor={determineBorderColor(battleEvent.event.from.type)} 
                                    rounded={5} 
                                    p={1}
                                    mb={0}
                                >
                                    <Row battleEvent={battleEvent} />
                                </Flex>
                                <NameRow battleEvent={battleEvent}/>
                            </Box>
                        )
                    }
                </VStack>
            </Flex>
        </Container>
    )
}

export default BattleEvents;