import { Badge, HStack, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";
import { IAction } from "../../interfaces/battleEvent";
import { IBattleEventHero } from "../../interfaces/hero";
import ItemToolTip from "../itemToolTip";
import { Event } from '../../enums/event';

interface Props {
    hero: IBattleEventHero;
    action: IAction;
    turn: string;
}

const HeroEvent = ({ hero, action, turn }: Props) => {
    return (
        <HStack>
            <Image src={hero.imgSrc} alt="Hero Picture" width={60} height={60} />
            {
                action.weapon &&
                    <>
                        <ItemToolTip item={action.weapon} type={"Weapon"} battleEvent={true}>
                            <Image src={action.weapon.imgSrc} alt="Weapon Picture" width={60} height={60}/>
                        </ItemToolTip>
                        <Stack 
                            direction="column"
                        >
                            {
                                action.events.map(event => (
                                    <Badge 
                                        backgroundColor="blue.300"
                                        variant="solid"
                                        color="white"
                                        fontSize={12}
                                        rounded={5}
                                        m={0}
                                        key={event}
                                    >
                                        {event}
                                    </Badge>
                                ))
                            }
                        </Stack>
                    </>
            }
            {
                turn === "MONSTERS" && action.events.find(event => event === Event.HIT) &&
                    <Text color="#E53E3E" fontWeight="bolder" fontSize={action.isCrit ? 40 : 20}>-{action.value}</Text>
            }
            {
                turn === "MONSTERS" && action.events.find(event => event === Event.DODGE) &&
                    <Text fontWeight="bolder" fontSize={action.isCrit ? 40 : 20}>{action.value}</Text>
            }
        </HStack>
    );
}

export default HeroEvent;