import { ReactNode, useEffect, useState } from 'react';
import {
    Box,
    Flex,
    Avatar,
    HStack,
    IconButton,
    // Button,
    // Menu,
    // MenuButton,
    // MenuList,
    // MenuItem,
    // MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
    Button,
} from '@chakra-ui/react';
import {
    HamburgerIcon,
    CloseIcon,
    // AddIcon
} from '@chakra-ui/icons';
import ToggleTheme from './Toggletheme';
import useGlobalState from '../hooks/useGlobalState';
import { SDK } from '../appwrite/appwrite-config';
import { Link } from 'react-router-dom';

// const Links = ['About Us', 'Register', 'Login'];

const NavLink = ({ children, linktxt }: { children: ReactNode, linktxt: string }) => (
    <Link to={linktxt}>
        <Box
            px={2}
            py={1}
            rounded={'md'}
            _hover={{
                textDecoration: 'none',
                bg: useColorModeValue('gray.200', 'gray.700'),
            }}
        >
            {children}
        </Box>
    </Link>
);


const Navbar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { Logout } = useGlobalState()

    const [data, setData] = useState({} as any)

    useEffect(() => {
        SDK.get().then((res) => {
            setData(res)
            console.log(res)
        }).catch(() => {
        })
    }, [data])

    return (
        <>
            <Box bg={useColorModeValue('gray.50', 'gray.900')} shadow={"xs"} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <Box>HustleHub</Box>
                    </HStack>
                    <Flex alignItems={'center'} justifyContent={"space-around"}>
                        <HStack
                            as={'nav'}
                            spacing={4}
                            display={{ base: 'none', md: 'flex' }}
                        >
                            <NavLink linktxt={'/feed'}>Feed</NavLink>
                            {data.$id ?
                                <>
                                    <Button onClick={() => Logout()}>Logout</Button>
                                    <Avatar
                                        size={'sm'}
                                        name={data.name}
                                    />
                                </> :
                                <>
                                    <NavLink linktxt="/login">Login</NavLink>
                                    <NavLink linktxt="/register">Register</NavLink>
                                </>
                            }
                            <ToggleTheme />
                        </HStack>
                        <HStack
                            as={'nav'}
                            spacing={4}
                            display={{ base: 'flex', md: 'none' }}
                        >
                            {data.$id && <Avatar
                                size={'sm'}
                                name={data.name}
                            />}
                            <ToggleTheme />
                        </HStack>
                    </Flex>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            {data.$id ?
                                <>
                                    <NavLink linktxt="/feed">Feed</NavLink>
                                    <Button onClick={() => Logout()}>Logout</Button>
                                </> :
                                <>
                                    <NavLink linktxt="/login">Login</NavLink>
                                    <NavLink linktxt="/register">Register</NavLink>
                                </>
                            }
                        </Stack>
                    </Box>
                ) : null}
            </Box>
        </>
    )
}

export default Navbar
