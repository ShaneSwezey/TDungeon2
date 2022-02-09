import { Badge, HStack, Stack } from "@chakra-ui/react";
import Image from "next/image";
import { IBattleEventMonster} from "../../interfaces/monster";
import ItemToolTip from "../itemToolTip";
import { IAction } from "../../interfaces/battleEvent";

interface Props {
    monster: IBattleEventMonster;
    action: IAction;
}

const MonsterEvent = ({ monster, action }: Props) => {
    return (
        <HStack>
            {
                action.weapon &&
                    <>
                        <Stack 
                            direction="column"
                        >
                            {
                                action.events.map(event => (
                                    <Badge 
                                        backgroundColor="green.300"
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
                    <ItemToolTip item={action.weapon} type={"Weapon"} battleEvent={true}>
                        <Image src={action.weapon.imgSrc} alt="Weapon Picture" width={60} height={60}/>
                    </ItemToolTip>
                    </>
            }
            <Image src={monster.imgSrc} alt="Monster Hit Picture" width={60} height={60} />
        </HStack>
    );
}

export default MonsterEvent;