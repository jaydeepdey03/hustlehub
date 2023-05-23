import { useEffect, useState } from "react"
import { SDK } from "../appwrite/appwrite-config"
import { Avatar, Box, Button, Card, CardBody, CardFooter, HStack, Heading, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs, Text, VStack, useDisclosure, useToast } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import '../App.css'
import Milestones from "../components/Startup/Milestone"
const Feed = () => {
    const navigate = useNavigate()
    const toast = useToast()
    const [details, setDetails] = useState({} as any)
    const learnMoreDisclosure = useDisclosure()

    useEffect(() => {
        SDK.get().then(res => setDetails(res)).catch(() => {
            toast({
                title: "An error occurred.",
                description: "You are not logged in.",
                status: "error",
                duration: 9000,
                isClosable: true,
            })
            navigate('/login')
        })
    }, [])

    return (
        <>
            {/* Modal */}
            <Modal onClose={learnMoreDisclosure.onClose} size={"xl"} isOpen={learnMoreDisclosure.isOpen} isCentered scrollBehavior="inside">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Startup Name</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack spacing={4}>

                            <Stack>
                                <Text fontWeight={"bold"} fontSize={"md"}>Startup idea</Text>
                                <Text>
                                    Coffee latte is a coffee beverage of Italian origin made with espresso and steamed milk. The word comes from the Italian caffè e latte [kafˌfɛ e lˈlatte], caffelatte [kaffeˈlatte] or caffellatte [kaffelˈlatte]. Caffè latte is often served in a large cup.
                                </Text>
                            </Stack>
                            <HStack>
                                <Avatar size={"sm"} name={"John Doe"} src={"https://bit.ly/dan-abramov"} />
                                <Text fontSize={"sm"} color="gray">John Doe</Text>
                            </HStack>

                            <Stack spacing={"5"}>
                                <Text m="1" fontWeight={"semibold"} fontSize={"md"}>Milestones</Text>
                                <Milestones />
                            </Stack>
                        </Stack>
                    </ModalBody>
                    <ModalFooter justifyContent={"space-between"}>
                        <Button colorScheme="telegram">Join</Button>
                        <Button colorScheme="telegram">Fund</Button>
                        <Button onClick={learnMoreDisclosure.onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Box h="100vh" w="100vw" overflowY={"overlay" as any} boxSizing="border-box">
                <Navbar />
                {/* <p>{details.name}</p>
            <p>{details.email}</p> */}

                <Box maxW={{base: "100vw", lg: "65vw"}} m={"auto"} p="6">
                    <Tabs position="relative" variant="unstyled" isFitted isLazy>
                        <TabList>
                            <Tab _focus={{ outline: 'none' }} _hover={{ outline: 'none' }}>Startups</Tab>
                            <Tab _focus={{ outline: 'none' }} _hover={{ outline: 'none' }}>Hackathons</Tab>
                        </TabList>
                        <TabIndicator
                            mt="-1.5px"
                            height="2px"
                            bg="blue.500"
                            borderRadius="1px"
                        />
                        <TabPanels>
                            <TabPanel>
                                <Stack spacing={'5'}>
                                    {
                                        [1, 2, 3, 4].map((_, index) => {
                                            return (
                                                <>
                                                    <Card
                                                        key={index}
                                                        direction={{ base: 'column', sm: 'row' }}
                                                        overflow='hidden'
                                                        variant='outline'
                                                    >
                                                        <Image
                                                            objectFit='cover'
                                                            maxW={{ base: '100%', sm: '200px' }}
                                                            m="4"
                                                            src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
                                                            alt='Caffe Latte'
                                                        />

                                                        <Stack>
                                                            <CardBody>
                                                                <Stack>
                                                                    <Heading size='md'>The perfect latte</Heading>
                                                                    <Box alignItems={"center"}>
                                                                        <Text fontSize={"sm"}>Startup Idea</Text>
                                                                        <Text fontSize="md" noOfLines={4}>
                                                                            Caffè latte is a coffee beverage of Italian origin made with espresso and steamed milk. The word comes from the Italian caffè e latte [kafˌfɛ e lˈlatte], caffelatte [kaffeˈlatte] or caffellatte [kaffelˈlatte]. Caffè latte is often served in a large cup.
                                                                        </Text>
                                                                    </Box>
                                                                </Stack>
                                                            </CardBody>

                                                            <CardFooter justifyContent={"space-between"}>
                                                                <Button variant='solid' colorScheme='telegram' size="sm">
                                                                    Join Startup
                                                                </Button>
                                                                <Button
                                                                    onClick={learnMoreDisclosure.onOpen}
                                                                    variant='solid' colorScheme='telegram' size="sm">
                                                                    Learn More
                                                                </Button>
                                                            </CardFooter>
                                                        </Stack>
                                                    </Card>
                                                </>
                                            )
                                        })
                                    }
                                </Stack>

                            </TabPanel>
                            <TabPanel>
                                <p>two!</p>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box >
            </Box>
        </>
    )
}

export default Feed
