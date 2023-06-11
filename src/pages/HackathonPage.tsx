import { Box, Button, Divider, Flex, Image, Stack, Text, VStack, useColorModeValue, Link as ChakraLink, Grid, GridItem, useToast, Skeleton } from "@chakra-ui/react"
import Navbar from "../components/Navbar"
import Profilecard from "./Profilecard"
import { BsRocketTakeoff } from "react-icons/bs"
import { CheckIcon } from "@chakra-ui/icons"
import { useLocation, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { DB, SDK } from "../appwrite/appwrite-config"
import useGlobalState from "../hooks/useGlobalState"
import { AuthUser, HackathonInterface } from "../types/MyData"

const HackathonPage = () => {
    const location = useLocation()
    console.log(location, 'location')
    const [details, setDetails] = useState({} as AuthUser)
    const toast = useToast()
    const { hasCreated, setHasCreated } = useGlobalState()
    const { id } = useParams()

    useEffect(() => {
        SDK.get().then((res: AuthUser) => {
            setDetails(res as AuthUser)
        }).catch(err => console.log(err))
    }, [location])

    const [joinLoading, setJoinLoading] = useState(false)

    const [selectedHackathon, setSelectedHackathon] = useState({} as HackathonInterface)

    useEffect(() => {
        if (id) {
            DB.getDocument('646cfa393629aedbd58f', '646ed5510d2cb68ff19f', id).then(res => {
                setSelectedHackathon(res as HackathonInterface)
            }
            ).catch(err => {
                console.log(err)
                toast({
                    title: "Error",
                    description: "Sorry, there was an error",
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                })
            })
        } else {
            toast({
                title: "Error",
                description: "Sorry, there was an error",
                status: "error",
                duration: 9000,
                isClosable: true,
            })
        }
    }, [location, hasCreated, id, toast])

    const joinHackathon = async () => {
        setJoinLoading(true)
        if (id) {
            DB.getDocument('646cfa393629aedbd58f', '646ed5510d2cb68ff19f', id).then(res => {
                if (res.members.length === res.noOfMembers) {
                    toast({
                        title: "Hackathon is full",
                        description: "Sorry, the hackathon is full",
                        status: "error",
                        duration: 9000,
                        isClosable: true,
                    })
                    return
                }
                if (res?.members?.includes(details?.$id)) {
                    toast({
                        title: "Already joined",
                        description: "Sorry, you have already joined the hackathon",
                        status: "error",
                        duration: 9000,
                        isClosable: true,
                    })
                    return
                }
                DB.updateDocument('646cfa393629aedbd58f', '646ed5510d2cb68ff19f', id, {
                    members: [...res.members, details?.$id]
                }).then(() => {
                    setHasCreated(prev => !prev)
                }).catch(err => {
                    console.log(err)
                })
            }
            ).catch(err => {
                console.log(err)
                toast({
                    title: "Error",
                    description: "Sorry, there was an error",
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                })
            }).finally(() => setJoinLoading(false))
        } else {
            toast({
                title: "Error",
                description: "Sorry, there was an error",
                status: "error",
                duration: 9000,
                isClosable: true,
            })
        }
    }

    const leaveHackathon = async () => {
        if (id) {
            DB.getDocument('646cfa393629aedbd58f', '646ed5510d2cb68ff19f', id).then(res => {
                if (res?.members?.includes(details?.$id) === false) {
                    toast({
                        title: "Not joined",
                        description: "Sorry, you have not joined the hackathon",
                        status: "error",
                        duration: 9000,
                        isClosable: true,
                    })
                    return
                }
                DB.updateDocument('646cfa393629aedbd58f', '646ed5510d2cb68ff19f', id, {
                    members: res.members.filter((member: string) => member !== details.$id)
                }).then(() => {
                    setHasCreated(prev => !prev)
                }).catch(err => {
                    toast({
                        title: "Error",
                        description: "Sorry, there was an error",
                        status: "error",
                        duration: 9000,
                        isClosable: true,
                    })
                    console.log(err)
                })
            }).catch(err => {
                console.log(err)
                toast({
                    title: "Error",
                    description: "Sorry, there was an error",
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                })
            })
        } else {
            toast({
                title: "Error",
                description: "Sorry, there was an error",
                status: "error",
                duration: 9000,
                isClosable: true,
            })
        }
    }


    console.log((selectedHackathon?.members?.includes(details?.$id) || selectedHackathon?.creator === details?.$id), 'selectedHackathon')

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
                    alignItems={"center"}
                >
                    {/* <Avatar
                        size="2xl"
                        name="Startup Name"
                        src={startup.image}
                        mt="5"
                    /> */}
                    <Image
                        src={selectedHackathon.image}
                        alt="Startup Image"
                        boxSize="90%"
                        height={{ base: "200px", lg: "90%" }}
                        objectFit="contain"
                        // borderRadius="full"
                        border="2px solid"
                        borderColor={useColorModeValue('gray.200', 'gray.700')}
                        mt="5"
                        fallback={
                            <Skeleton mt="4" height="200px" width="90%" />
                        }
                    />
                    <Text
                        bgGradient='linear(to-l, #7928CA, #FF0080)'
                        bgClip='text'
                        fontSize='3xl'
                        textAlign={"center"}
                        fontWeight='extrabold'
                    >
                        {selectedHackathon.title}
                    </Text>
                    <Divider w="80%" m="auto" />
                    <VStack spacing={"10"} width={"full"} alignItems={"center"}>
                        <Box>
                            <Profilecard userId={selectedHackathon.creator} created={true} details={true} />
                        </Box>
                    </VStack>
                    <Divider w="80%" m="auto" />
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
                    <Text fontSize={"xl"} fontWeight={600}>{selectedHackathon.title}</Text>
                    <Box h="40%" maxW="full">
                        <Text fontSize={"xs"} as="u" fontWeight={300}>Hackathon Idea</Text>
                        <Box minH="10vh" overflowY="auto">
                            <Text fontSize={"md"} fontWeight={300}>{selectedHackathon.idea}</Text>
                        </Box>
                    </Box>
                    <Divider w="100%" m="auto" />
                    <Flex direction={"column"} p="6" pl="0">
                        <Text fontSize={"xs"} as="u" fontWeight={300}>Hackathon Link</Text>
                        <Text as={ChakraLink} target="_blank" href={selectedHackathon.link}>{selectedHackathon.link}</Text>
                    </Flex>
                    <Divider w="100%" m="auto" />
                    <Text fontSize={"xl"} fontWeight={600} textAlign={"center"}>Members </Text>
                    {
                        selectedHackathon?.members?.length === 0 && (
                            <Text fontSize={"md"} fontWeight={300} textAlign={"center"}>No members yet</Text>
                        )
                    }
                    <Box display="flex" justifyContent="center">
                        <Grid templateColumns={`repeat(${selectedHackathon?.members?.length === 1 ? "1" : "2"}, 1fr)`} gap="9" justifyContent="center">
                            {selectedHackathon?.members?.map((member: string) => (
                                <GridItem key={member}>
                                    <Profilecard userId={member} created={false} details={true} />
                                </GridItem>
                            ))}
                        </Grid>
                    </Box>




                    <Divider w="80%" m="auto" />
                    <VStack>
                        {

                            (selectedHackathon?.members?.includes(details?.$id) || selectedHackathon?.creator === details?.$id) ? (
                                <Stack direction={{
                                    base: "column",
                                    lg: "row"
                                }} justifyContent="center" alignItems={"center"} p="6">

                                    <Button colorScheme="blue" variant="outline" leftIcon={<CheckIcon />} isDisabled={true} size={"lg"}>Joined</Button>

                                    {(selectedHackathon?.creator !== details?.$id) && <Text cursor={"pointer"} mb="6" colorScheme="red" variant="solid"
                                        onClick={leaveHackathon} color="red" as="u"
                                    >Leave Hackathon</Text>}
                                </Stack>
                            )
                                :
                                (
                                    <Button mb="6" colorScheme="blue" variant="outline" leftIcon={<BsRocketTakeoff />}
                                        onClick={joinHackathon}
                                        isLoading={joinLoading}
                                        loadingText="Joining Hackathon..."
                                        size={"lg"}>Join Hackathon</Button>
                                )
                        }
                    </VStack>
                </Stack>
            </Stack>
        </>
    )
}

export default HackathonPage
