import { Center, Flex, Heading, Spacer } from "@chakra-ui/layout";
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import { NextPage } from "next";
import { useColorMode, useColorModeValue } from "@chakra-ui/react";


const Header: NextPage = () => {
    const { toggleColorMode, colorMode } = useColorMode();
    const darkModeIcon = useColorModeValue(
        <MoonIcon h={25} w={25} />, 
        <SunIcon h={25} w={25} />
    );

    return(
        <Flex direction="row" h={50}>
            <Center
                mt={4}
                ml={7}
            >
                <Heading>TDungeon Beta v#0.0</Heading>
            </Center>
            <Spacer />
            <Center 
                mt={4}
                mr={7}
                _hover={{ cursor: "pointer" }} 
                onClick={toggleColorMode}
            >
                {darkModeIcon}
            </Center>
        </Flex>
    )
};

export default Header;