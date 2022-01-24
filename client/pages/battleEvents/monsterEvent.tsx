import { Badge, HStack, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";
import { EventCharacter } from "../../enums/character";
import { IAction } from "../../interfaces/action";
import { IBattleEventMonster} from "../../interfaces/monster";
import { getMonsterHitImageSrc, getMonsterImageSrc } from "../../utils/monster";
import ItemToolTip from "../itemToolTip";
import { Event } from "../../enums/event";

interface Props {
    monster: IBattleEventMonster;
    initiatorType: EventCharacter;
    initiatorAction: IAction;
    receiverAction: IAction;
}

const MonsterEvent = ({ monster, initiatorType, initiatorAction, receiverAction }: Props) => {
    console.log("initiatorType:", initiatorType);
    console.log("initiatorAction:", initiatorAction);
    console.log("receiverAction:", receiverAction);
    return (
        <HStack>
            {
                initiatorType === EventCharacter.HERO && receiverAction.type.find(event => event === Event.HIT) &&
                    <Text color="#E53E3E" fontWeight="bolder" fontSize={initiatorAction.isCrit ? 40 : 20} mr={2}>-{initiatorAction.value}</Text>
            }
            {
                initiatorType === EventCharacter.HERO && receiverAction.type.find(event => event === Event.DODGE) &&
                    <Text fontWeight="bolder" fontSize={initiatorAction.isCrit ? 40 : 20} mr={2}>{initiatorAction.value}</Text>
            }
            {
                initiatorType === EventCharacter.MONSTER && initiatorAction.weapon &&
                    <>
                     <Stack 
                            direction="column"
                        >
                            {
                                initiatorAction.type.map(event => (
                                    <Badge 
                                        backgroundColor="green.300"
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
                    <ItemToolTip item={initiatorAction.weapon} type={"Weapon"} battleEvent={true}>
                        <Image src={initiatorAction.weapon.imgSrc} width={60} height={60}/>
                    </ItemToolTip>
                    </>
            }
            {
                initiatorType === EventCharacter.HERO && receiverAction.type.find(event => event === Event.HIT) ?
                    <Image src={getMonsterHitImageSrc(monster.monsterType)} width={60} height={60} />
                :
                    <Image src={getMonsterImageSrc(monster.monsterType)} width={60} height={60} />
            }
        </HStack>
    );
}

export default MonsterEvent;