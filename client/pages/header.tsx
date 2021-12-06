import { Center, Flex, Heading, Spacer } from "@chakra-ui/layout";
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import { NextPage } from "next";
import { useColorMode, useColorModeValue, Button, Box, Stack } from "@chakra-ui/react";
import { useSession, signIn, signOut } from "next-auth/react";


const Header: NextPage = () => {
    
    const { data: session, status } = useSession();
    
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
                <Heading>TDungeon ProtoType v#0.0</Heading>
            </Center>
            <Spacer />
            {
                session ?
                    <Stack direction="row" mr={5}>
                        <Center mt={4}>
                            <Box fontWeight="bold" mr={5}>Hello, {session.user?.name}</Box>
                            <Button onClick={() => signOut()}>Logout</Button>
                        </Center>
                    </Stack>
                :
                    <Center mt={4}>
                        <Button mr={5} onClick={() => signIn()}>Twitch Login</Button>
                    </Center>
            }
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