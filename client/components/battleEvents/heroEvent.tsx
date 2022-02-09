import { Badge, HStack, Stack, Text  } from "@chakra-ui/react";
import Image from "next/image";
import { EventCharacter } from "../../enums/character";
import { Event } from "../../enums/event";
import { IAction } from "../../interfaces/battleEvent";
import { IBattleEventHero } from "../../interfaces/hero";
import ItemToolTip from "../itemToolTip";

interface Props {
    hero: IBattleEventHero;
    action: IAction;
}

const HeroEvent = ({ hero, action }: Props) => {
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
        </HStack>
    );
}

export default HeroEvent;