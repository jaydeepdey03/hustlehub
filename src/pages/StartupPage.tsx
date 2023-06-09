import { Box, Heading, Stack, VStack, useColorModeValue, Text, Divider, Button, Image, useToast, Flex } from "@chakra-ui/react"
import Navbar from "../components/Navbar"
import { BsRocketTakeoff } from "react-icons/bs"
import { useLocation, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { DB, SDK } from "../appwrite/appwrite-config"
import Milestones from "../components/Startup/Milestone"
import { CheckIcon } from "@chakra-ui/icons"
import Profilecard from "./Profilecard"
import { StartupInterface, AuthUser } from "../types/MyData"

const StartupPage = () => {
    const location = useLocation()
    console.log(location, 'location')
    const [details, setDetails] = useState({} as AuthUser)
    const [joinLoading, setJoinLoading] = useState(false)
    const [leaveLoading, setLeaveLoading] = useState(false)
    const toast = useToast()
    const [hasJoined, setHasJoined] = useState(false)
    const { id } = useParams()

    useEffect(() => {
        SDK.get().then((res: AuthUser) => {
            console.log(res, 'startup page')
            setDetails(res as AuthUser)
        }).catch(err => console.log(err))
    }, [location])

    const [startup, setStartup] = useState({} as StartupInterface)
    useEffect(() => {
        if (id) {

            DB.getDocument('646cfa393629aedbd58f', '646cfa7aa01148c42ebf', id).then(res  => {
                setStartup(res as StartupInterface)
                console.log(res, 'redetails')
            }
            ).catch(err => console.log(err))
        } else {
            toast({
                title: "Error",
                description: "ID is Undefined",
                status: "error",
                duration: 9000,
                isClosable: true,
            })
        }
    }, [location, hasJoined, id, toast])

    const joinStartup = () => {
        setJoinLoading(true)
        if (id) {
            DB.updateDocument('646cfa393629aedbd58f', '646cfa7aa01148c42ebf', id, {
                cofounder: details?.$id
            }).then(() => {
                setHasJoined(prev => !prev)
            }).catch(err => {
                console.log(err)
                toast({
                    title: "Error",
                    description: "Error while joining",
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                })
            }).finally(() => {
                setJoinLoading(false)
            })
        } else {
            toast({
                title: "Error",
                description: "ID is Undefined",
                status: "error",
                duration: 9000,
                isClosable: true,
            })
        }

    }

    const leaveStartup = () => {
        setLeaveLoading(true)
        if (id) {
            DB.updateDocument('646cfa393629aedbd58f', '646cfa7aa01148c42ebf', id, {
                cofounder: null
            }).then(() => {
                setHasJoined(prev => !prev)
            }).catch(err => {
                console.log(err)
                toast({
                    title: "Error",
                    description: "Error while leaving",
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                })
            }).finally(() => {
                setLeaveLoading(false)
            })
        } else {
            toast({
                title: "Error",
                description: "ID is Undefined",
                status: "error",
                duration: 9000,
                isClosable: true,
            })
        }

    }

    console.log(details, 'new startup cofounder')
    console.log(startup.founder, '1new startup cofounder')
    return (
        <>
            <Navbar />
            <Stack direction={{ base: 'column', lg: 'row' }} p={"6"} spacing={"10"} justifyContent={"center"}>
                <VStack
                    h="100%"
                    w={{ base: "100%", lg: "30%" }}
                    border={"2px solid"}
                    borderColor={'gray.200'}
                    rounded={"xl"}
                    spacing={{ base: 4, lg: 10 }}
                >
                    {/* <Avatar
                        size="2xl"
                        name="Startup Name"
                        src={startup.image}
                        mt="5"
                    /> */}
                    <Image
                        src={startup.image}
                        alt="Startup Image"
                        boxSize="90%"
                        height={{ base: "200px", lg: "90%" }}
                        objectFit="cover"
                        // borderRadius="full"
                        border="2px solid"
                        borderColor={useColorModeValue('gray.200', 'gray.700')}
                        mt="5"
                    />
                    <Text
                        bgGradient='linear(to-l, #7928CA, #FF0080)'
                        bgClip='text'
                        fontSize='3xl'
                        fontWeight='extrabold'
                    >
                        {startup.title}
                    </Text>
                    <Divider w="80%" m="auto" />
                    <VStack spacing={"10"}>
                        <Profilecard userId={startup.founder} created={true} details={true} />
                    </VStack>
                    <Divider w="80%" m="auto" />
                    {/* {location.state.role === 'investor' && <Button
                        colorScheme="facebook"
                        width={'80%'}
                        m="auto"
                        rounded={"full"}
                        leftIcon={<MdAttachMoney />}
                        variant="solid"
                        size="md"
                        style={{
                            marginBottom: '30px'
                        }}
                    >Fund</Button>} */}
                    {
                        (startup.cofounder == null && startup?.founder !== details?.$id) ?
                            <Button
                                colorScheme="facebook"
                                width={'80%'}
                                m="auto"
                                rounded={"full"}
                                leftIcon={<BsRocketTakeoff />}
                                variant="solid"
                                size="md"
                                style={{
                                    marginBottom: '30px'
                                }}
                                isLoading={joinLoading}
                                loadingText="Joining..."
                                onClick={() => {
                                    joinStartup()
                                }}

                            >
                                Join Startup
                            </Button> :
                            <Flex w="90%" alignContent={"center"} direction={"column"}>
                                <Button
                                    width={'80%'}
                                    m="auto"
                                    rounded={"full"}
                                    leftIcon={<CheckIcon />}
                                    variant="solid"
                                    size="md"
                                    style={{
                                        marginBottom: '30px'
                                    }}
                                    // isLoading={joinLoading}
                                    isDisabled={true}
                                >
                                    Joined
                                </Button>
                                {(startup?.founder !== details?.$id) && <Button
                                    colorScheme="red"
                                    width={'80%'}
                                    m="auto"
                                    rounded={"full"}
                                    variant="outline"
                                    size="md"
                                    style={{
                                        marginBottom: '30px'
                                    }}
                                    isLoading={leaveLoading}
                                    loadingText="Leaving..."
                                    onClick={() => {
                                        leaveStartup()
                                    }}
                                >
                                    Leave
                                </Button>}
                            </Flex>
                    }

                </VStack>
                <Stack
                    direction={"column"}
                    h="100%"
                    w={{ base: "100%", lg: "60%" }}
                    border={"2px solid"}
                    borderColor={useColorModeValue('gray.200', 'gray.700')}
                    rounded={"xl"}
                    spacing={{ base: 4, md: 6 }}
                    p={{ base: 4, md: 10 }}
                    pb={{ base: 4, md: 2 }}
                >
                    <Text fontSize={"xl"} fontWeight={600}>{startup.title}</Text>
                    <Box h="30%" maxW="full">
                        <Text fontSize={"xs"} as="u" fontWeight={300}>Startup Idea</Text>
                        <Text fontSize={"md"} fontWeight={300}>{startup.idea}</Text>
                    </Box>
                    <Divider width={"100%"} />
                    <Stack direction={{ base: "column", lg: "row" }} spacing={"10"}>
                        <Box>
                            <Heading mb='3' size='sm' fontWeight={"semibold"}>Founder </Heading>
                            {/* <HStack>
                                <Avatar size={"sm"} name={"Dan Abramov"} src={"https://bit.ly/dan-abramov"} />
                                <Text fontSize={"sm"} color={useColorModeValue('gray',
                                    'white')}>
                                    {startup.founder} {startup.founder === details.$id && '(You)'}</Text>
                            </HStack> */}
                            <Profilecard userId={startup.founder} created={false} details={true} />
                        </Box>
                        {startup.cofounder !== null && <Box>
                            <Heading mb='3' size='sm' fontWeight={"semibold"}>Co-Founder</Heading>
                            <Profilecard userId={startup.cofounder} created={false} details={true} />
                        </Box>}
                    </Stack>
                    <Divider width={"100%"} />
                    <Milestones milestoneArray={startup.milestones} />
                </Stack>
            </Stack>
        </>
    )
}

export default StartupPage
