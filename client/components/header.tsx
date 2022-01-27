import { Center, Flex, Heading, Spacer } from "@chakra-ui/layout";
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import { useColorMode, useColorModeValue, Button, Box, Stack } from "@chakra-ui/react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

const Header = () => {
    const { data: session } = useSession();
    
    const { toggleColorMode  } = useColorMode();
    const darkModeIcon = useColorModeValue(
        <MoonIcon h={25} w={25} />, 
        <SunIcon h={25} w={25} />
    );

    return (
        <Flex direction="column">
            <Flex direction="row" h={50}>
                <Center
                    mt={4}
                    ml={7}
                >
                    <Heading>TDungeon Alpha V#0.0</Heading>
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
                            <Button 
                                mr={5} 
                                backgroundColor="#bf94ff"
                                _hover={{ bg: "#bf94ff" }} 
                                onClick={() => signIn()}
                            >
                                Twitch Login
                            </Button>
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
            <Flex direction="row" mt={5} ml={7} spacing={5}>
                <Link href="/battles">
                    <Button>
                    Battles
                    </Button>
                </Link>
                {
                    session &&
                        <>
                            <Link
                                href="/heroSelection"
                            >
                                <Button
                                    ml={5}
                                >
                                    Heroes
                                </Button>
                            </Link>
                            {
                                session.user!.name === "SlipperyToads" &&
                                    <Link 
                                        href="/admin">
                                        <Button
                                            ml={5} 
                                            backgroundColor="#E53E3E"
                                        >
                                            Admin
                                        </Button>
                                    </Link>
                            }
                        </>
                }
            </Flex>
        </Flex>
    )
};

export default Header;