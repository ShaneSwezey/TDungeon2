import { Badge, HStack, Stack, Text  } from "@chakra-ui/react";
import Image from "next/image";
import { EventCharacter } from "../../enums/character";
import { Event } from "../../enums/event";
import { IAction } from "../../interfaces/action";
import { IBattleEventHero } from "../../interfaces/hero";
import { getHeroClassImageSrc, getHeroHitClassImageSrc } from "../../utils/hero";
import ItemToolTip from "../itemToolTip";

interface Props {
    hero: IBattleEventHero;
    initiatorType: EventCharacter;
    initiatorAction: IAction;
    receiverAction: IAction;
}

const HeroEvent = ({ hero, initiatorType, initiatorAction, receiverAction }: Props) => {
    return (
        <HStack padding={0}>
            {
                initiatorType === EventCharacter.MONSTER && receiverAction.type.find(event => event === Event.HIT) ?
                    <Image src={getHeroHitClassImageSrc(hero.heroType)} width={60} height={60} />
                :
                    <Image src={getHeroClassImageSrc(hero.heroType)} width={60} height={60} />
            }
            {
                initiatorType === EventCharacter.HERO && initiatorAction.weapon &&
                    <>
                        <ItemToolTip item={initiatorAction.weapon} type={"Weapon"} battleEvent={true}>
                            <Image src={initiatorAction.weapon.imgSrc} width={60} height={60}/>
                        </ItemToolTip>
                        <Stack 
                            direction="column"
                        >
                            {
                                initiatorAction.type.map(event => (
                                    <Badge 
                                        backgroundColor="blue.300"
                                        variant="solid"
                                        color="white"
                                        fontSize={12}
                                        rounded={5}
                                        m={0}
                                    >
                                        {event}
                                    </Badge>
                                ))
                            }
                        </Stack>
                    </>
            }
            {
                initiatorType === EventCharacter.MONSTER && receiverAction.type.find(event => event === Event.HIT) &&
                    <Text color="#E53E3E" fontWeight="bolder" fontSize={initiatorAction.isCrit ? 40 : 20}>-{initiatorAction.value}</Text>
            }
            {
                initiatorType === EventCharacter.MONSTER && receiverAction.type.find(event => event === Event.DODGE) &&
                    <Text fontWeight="bolder" fontSize={initiatorAction.isCrit ? 40 : 20}>{initiatorAction.value}</Text>
            }
        </HStack>
    );
}

export default HeroEvent;