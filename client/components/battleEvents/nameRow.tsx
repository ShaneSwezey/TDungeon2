import { ChevronUpIcon } from "@chakra-ui/icons";
import { Flex, Spacer, Text } from "@chakra-ui/react";
import { upperFirst } from "lodash";
import { IBattleEventHero } from "../../interfaces/hero";
import { IBattleEventMonster } from "../../interfaces/monster";

interface Props {
    hero: IBattleEventHero;
    monster: IBattleEventMonster;
}


const NameRow = ({ hero, monster }: Props) =>  {
    return (
        <Flex
            direction="row" 
            w="100%" 
            h="30px"  
            mt={0}
        >
            <ChevronUpIcon ml={2} color="blue.300" />
            <Text color="blue.300" fontWeight="bold">{hero.name} {hero.stamina.hitPoints}/{hero.stamina.maxHitPoints}</Text>
            <Spacer />
            <Text color="green.300" fontWeight="bold">{`${monster.stamina.hitPoints}/${monster.stamina.maxHitPoints} ${upperFirst(monster.monsterType.toLowerCase())}#${monster.id?.substring(monster.id.length - 4)}`}</Text>
            <ChevronUpIcon mr={2} color="green.300" />
        </Flex>
    );
}

export default NameRow;