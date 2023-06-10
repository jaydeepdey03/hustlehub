import {
    Avatar,
    Box,
    Flex,
    Text,
    Stack,
    chakra,
    Link as ChakraLink, Tab, TabList, TabPanel, TabPanels, Tabs, VStack, Divider, Icon, Grid, HStack, useColorModeValue, Button, useDisclosure, useToast, Center
} from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import { Link, useLocation, useParams } from 'react-router-dom';
import { CiMail } from 'react-icons/ci';
import { useState, useEffect, Fragment } from 'react';
import { DB, SDK, storage } from '../appwrite/appwrite-config';
import { ID } from 'appwrite';
import { FiTwitter } from 'react-icons/fi';
import { AiOutlineLinkedin } from 'react-icons/ai'
import UpdateStartupModal from '../components/UpdateStartupModal';
import UpdateHackathonModal from '../components/UpdateHackathonModal';
import { StartupInterface, HackathonInterface, User, AuthUser } from '../types/MyData';
import { DeleteIcon } from '@chakra-ui/icons';
import useGlobalState from '../hooks/useGlobalState';

function Profile() {
    const location = useLocation()
    console.log(location, 'location')
    const [userStartup, setUserStartup] = useState([] as StartupInterface[])
    const [userHackathon, setUserHackathon] = useState([] as HackathonInterface[])
    const [user, setUser] = useState({} as AuthUser)
    const updateDisclosure = useDisclosure()
    const updateHackathonDisclosure = useDisclosure()
    const toast = useToast()
    const [updateStartupLoading, setUpdateStartupLoading] = useState(false)
    const [UpdateHackathonLoading, setUpdateHackathonLoading] = useState(false)
    const [joinedStartup, setJoinedStartup] = useState([] as StartupInterface[])
    const [joinedHackathon, setJoinedHackathon] = useState([] as HackathonInterface[])
    const [details, setDetails] = useState({} as User)
    const { id } = useParams()
    const { setHasCreated, hasCreated } = useGlobalState()

    const UpdateStartup = (title: string, description: string, image: File | string, milestone: string[], docId: string) => {
        setUpdateStartupLoading(true)
        storage.createFile("647a464fabf94fdc2ebf", ID.unique(), image as File).then(res => {
            const url = storage.getFilePreview("647a464fabf94fdc2ebf", res.$id)
            DB.updateDocument('646cfa393629aedbd58f', '646cfa7aa01148c42ebf',
                docId
                , {
                    title,
                    idea: description,
                    image: url,
                    milestones: milestone
                }).then((res1) => {
                    updateDisclosure.onClose()
                    console.log("updated startup", res1)
                }).catch(err => {
                    console.log(err)
                    toast({
                        title: "Error",
                        description: "Error updating startup",
                        status: "error",
                        duration: 9000,
                        isClosable: true,
                    })
                })
        }).catch(err1 => {
            console.log(err1)
            toast({
                title: "Error",
                description: "Error uploading image",
                status: "error",
                duration: 9000,
                isClosable: true,
            })
        }).finally(() => setUpdateStartupLoading(false))
    }
    const UpdateHackathon = (title: string, description: string, image: File | string, noOfMembers: number, link: string, docId: string) => {
        setUpdateHackathonLoading(true)
        storage.createFile("647a464fabf94fdc2ebf", ID.unique(), image as File).then(res => {
            const url = storage.getFilePreview("647a464fabf94fdc2ebf", res.$id)
            DB.updateDocument('646cfa393629aedbd58f', '646ed5510d2cb68ff19f',
                docId
                , {
                    title,
                    idea: description,
                    image: url,
                    noOfMembers,
                    link
                }).then((res1) => {
                    updateHackathonDisclosure.onClose()
                    console.log("updated hackathon", res1)
                }).catch(err => {
                    console.log(err)
                    toast({
                        title: "Error",
                        description: "Error updating hackathon",
                        status: "error",
                        duration: 9000,
                        isClosable: true,
                    })
                })
        }).catch(err1 => {
            console.log(err1)
            toast({
                title: "Error",
                description: "Error uploading image",
                status: "error",
                duration: 9000,
                isClosable: true,
            })
        }).finally(() => setUpdateHackathonLoading(false))
    }



    useEffect(() => {
        SDK.get().then((res: AuthUser) => {
            setUser(res)
            // fetch from startup collection the startups created by this user
            DB.listDocuments('646cfa393629aedbd58f', '646cfa7aa01148c42ebf')
                .then(res1 => {
                    // Convert the documents to StartupInterface type
                    const startupDocuments = res1?.documents as StartupInterface[];

                    // Filter the array based on cofounder property
                    const filteredStartups = startupDocuments.filter(startup => startup.cofounder === res?.$id);

                    // Set the filtered array
                    setJoinedStartup(filteredStartups);
                })
                .catch(err => {
                    console.log(err);
                    toast({
                        title: 'Error',
                        description: 'Error fetching startups',
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                    });
                });

        }).catch(err => {
            console.log(err)
            toast({
                title: "Error",
                description: "Error fetching user",
                status: "error",
                duration: 9000,
                isClosable: true,
            })
        })


    }, [location, toast])

    useEffect(() => {
        SDK.get().then((res: AuthUser) => {
            setUser(res as AuthUser)
            // fetch from hackathons collection the startups created by this user
            DB.listDocuments('646cfa393629aedbd58f', '646ed5510d2cb68ff19f').then(res1 => {
                // fetch those hackathons whose members array contains current user
                const hackathonDocument = res1?.documents as HackathonInterface[];
                const filteredHackathon = hackathonDocument.filter(hackathon => hackathon.members.includes(res?.$id));

                setJoinedHackathon(filteredHackathon)
            }).catch(err => console.log(err))
        }).catch(err => console.log(err))
    }, [location, toast, hasCreated])

    console.log(userHackathon, 'user hacakthon from profile')


    useEffect(() => {
        // list startups whos cofounder is current user
        SDK.get().then((res: AuthUser) => {
            setUser(res as AuthUser)
            // fetch from startup collection the startups created by this user
            DB.listDocuments('646cfa393629aedbd58f', '646cfa7aa01148c42ebf').then(res1 => {
                // set array of startups who founder is this user


                const startupDocuments = res1?.documents as StartupInterface[];

                // Filter the array based on cofounder property
                const filteredStartups = startupDocuments.filter(startup => startup.founder === res?.$id);

                setUserStartup(filteredStartups)
            }).catch(err => console.log(err))
        }).catch(err => console.log(err))
    }, [location, hasCreated, toast])

    useEffect(() => {
        SDK.get().then((res: AuthUser) => {
            setUser(res as AuthUser)
            // fetch from startup collection the startups created by this user
            DB.listDocuments('646cfa393629aedbd58f', '646ed5510d2cb68ff19f').then(res1 => {
                const hackathonDocument = res1?.documents as HackathonInterface[];
                console.log(hackathonDocument, 'hackathon document')
                const filteredStartups = hackathonDocument.filter(hackathon => hackathon.creator === res?.$id);
                setUserHackathon(filteredStartups)
            }).catch(err => console.log(err))
        }).catch(err => console.log(err))
    }, [location, hasCreated, toast])

    useEffect(() => {
        if (id) {
            DB.getDocument('646cfa393629aedbd58f', '646edbd8de898ccf87c5', id).then((res) => {
                setDetails(res as User)
                console.log(res, 'res')
            }).catch(err => {
                console.log(err)
                toast({
                    title: "Error",
                    description: "Error fetching user details",
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                })
            })
        }
        else {
            toast({
                title: "Error",
                description: "Error fetching ID",
                status: "error",
                duration: 9000,
                isClosable: true,
            })
        }

    }, [location, toast, id])

    const borderColor = useColorModeValue("gray.200", "gray.700");
    const createdColor = useColorModeValue('gray.600', 'gray.300')
    const profileFetchedCardColor = useColorModeValue('gray.600', 'gray.300')

    const deleteStartup = (startupId: string) => {
        DB.deleteDocument('646cfa393629aedbd58f', '646cfa7aa01148c42ebf', startupId).then(res => {
            setHasCreated(prev => !prev)
            toast({
                title: "Startup Deleted",
                description: "We've deleted your startup for you.",
                status: "success",
                duration: 9000,
                isClosable: true,
            })
            console.log("deleted startup", res)
        }).catch(err => {
            toast({
                title: "Error",
                description: "Error Deleting your startup for you.",
                status: "error",
                duration: 9000,
                isClosable: true,
            })
            console.log(err, 'err at delete doc')
        })
    }

    const deleteHackathon = (hackathonId: string) => {
        DB.deleteDocument('646cfa393629aedbd58f', '646ed5510d2cb68ff19f', hackathonId).then(res => {
            setHasCreated(prev => !prev)
            toast({
                title: "Hackathon Deleted",
                description: "We've deleted your Hackathon for you.",
                status: "success",
                duration: 9000,
                isClosable: true,
            })
            console.log("deleted Hackathon", res)
        }).catch(err => {
            toast({
                title: "Error",
                description: "Error Deleting your Hackathon for you.",
                status: "error",
                duration: 9000,
                isClosable: true,
            })
            console.log(err, 'err at delete doc')
        })
    }

    return (
        <>
            <Navbar />
            <Stack width={"80%"} m="auto" direction={{ base: 'column', lg: 'row' }} p={"6"} spacing={"5"} justifyContent={"center"}>
                <VStack
                    h="100%"
                    w={{ base: "100%", lg: "30%" }}
                    rounded={"xl"}
                    border={"1px solid"}
                    borderColor={borderColor}
                    spacing={{ base: 4, md: 10 }}
                >
                    <Avatar
                        size="2xl"
                        name={user.name}
                        mt="5"
                    />
                    <Text
                        bgGradient="linear(to-r, red.500, purple.500)"
                        bgClip="text"
                        fontSize="3xl"
                        fontWeight="extrabold"
                    // color={'purpi'}
                    >
                        {user.name}
                    </Text>
                    In this code, the bgGradient property specifies a linear gradient from a light red shade (#FFDADA) to a slightly darker red




                    <Divider w="80%" m="auto" />
                    <HStack spacing={"4"}>
                        {/* <Profilecard userId={startup.founder} created={true} /> */}
                        <Icon
                            as={CiMail}
                            w={5}
                            h={5}
                        />
                        <Text fontSize={"sm"} fontWeight={"semibold"} color="gray.500">{user.email}</Text>
                    </HStack>
                    <Divider w="80%" m="auto" />
                    <HStack h="4vh" style={{
                        marginBottom: "32px"
                    }}
                        spacing={"10"}
                    >
                        {details.twitterLink && <ChakraLink href={details.twitterLink}>
                            <Icon
                                as={FiTwitter}
                                w={5}
                                h={5}
                            />
                        </ChakraLink>}
                        {details.linkedinLink && <ChakraLink href={details.linkedinLink}>
                            <Icon
                                as={AiOutlineLinkedin}
                                w={5}
                                h={5}
                            />
                        </ChakraLink>}

                    </HStack>
                </VStack>

                <VStack
                    alignItems={"flex-start"}
                    w={{ base: "100%", lg: "70%" }}
                    h="60vh"
                    border={"1px solid"}
                    borderColor={'gray.200'}
                    rounded={"xl"}
                    spacing={{ base: 4, md: 10 }}
                >
                    <Tabs variant='soft-rounded' colorScheme='red' p="4" w="full">
                        <TabList justifyContent="flex-start">
                            <Tab fontSize={"sm"}>Your Startup</Tab>
                            <Tab fontSize={"sm"}>Your Hackathons</Tab>
                            <Tab fontSize={"sm"}>Joined Startup</Tab>
                            <Tab fontSize={"sm"}>Joined Hackathons</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <Flex justify="left" mb={3} justifyContent={"center"}>
                                    {/* <chakra.h3 fontSize="2xl" fontWeight="bold" textAlign="center">
                                        Your Startups
                                    </chakra.h3> */}
                                </Flex>
                                {
                                    userStartup.length === 0 &&
                                    <VStack borderColor="gray.400" rounded="md" overflow="hidden" spacing={2}>
                                        <Text textAlign={"center"} fontSize={"xs"}>
                                            You have not created any startup yet
                                        </Text>
                                    </VStack>
                                }
                                <VStack rounded="md" overflow="hidden" spacing={0}>
                                    {userStartup.map((startup: StartupInterface, index: number) => (
                                        <Fragment key={index}>
                                            <Grid
                                                templateRows={{ base: 'auto auto', md: 'auto' }}
                                                w="100%"
                                                templateColumns={{ base: 'unset', md: '4fr 2fr 2fr' }}
                                                p={{ base: 2, sm: 4 }}
                                                gap={3}
                                                alignItems="center"
                                                justifyContent={"space-between"}
                                                _hover={{ bg: borderColor }}
                                                border={"1px solid"}
                                                borderColor={borderColor}
                                            >
                                                <Box gridColumnEnd={{ base: 'span 2', md: 'unset' }}>
                                                    {/* <chakra.h3 as={ChakraLink} href={article.link} isExternal fontWeight="bold" fontSize="lg">
                                                            {startup.title}
                                                        </chakra.h3> */}
                                                    <Text fontWeight="bold" fontSize="lg" as={Link} to={`/startup/${startup?.$id}`}>
                                                        {startup.title}
                                                    </Text>
                                                    <chakra.p
                                                        fontWeight="medium"
                                                        fontSize="sm"
                                                        color={createdColor}
                                                    >
                                                        Started: {new Date(startup.$createdAt).toLocaleDateString(
                                                            'en-US',
                                                            {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric'
                                                            }
                                                        )}
                                                    </chakra.p>
                                                </Box>
                                                <HStack
                                                    spacing={{ base: 0, sm: 3 }}
                                                    alignItems="center"
                                                    fontWeight="medium"
                                                    fontSize={{ base: 'xs', sm: 'sm' }}
                                                    color={profileFetchedCardColor}
                                                >
                                                    {/* <ArticleStat icon={FaRegComment} value={article.meta.comments} />
                                            <ArticleStat icon={FaRegHeart} value={article.meta.reactions} />
                                            <ArticleStat icon={FaRegEye} value={article.meta.views} /> */}
                                                </HStack>
                                                <Stack
                                                    spacing={2}
                                                    direction="row"
                                                    fontSize={{ base: 'sm', sm: 'md' }}
                                                    justifySelf="flex-end"
                                                    alignItems="center"
                                                >
                                                    <Text as={Button} onClick={updateDisclosure.onOpen}>
                                                        Edit
                                                    </Text>
                                                    <Center bg={"red.400"} p="2" rounded="full" w="8" h="8" cursor={"pointer"}>
                                                        <Icon
                                                            onClick={() => deleteStartup(startup.$id)}
                                                            color="white"
                                                            as={DeleteIcon}
                                                        />
                                                    </Center>
                                                </Stack>
                                            </Grid>
                                            {/* {articles.length - 1 !== index && <Divider m={0} />} */}
                                            <UpdateStartupModal document={startup}
                                                updateDisclosure={updateDisclosure}
                                                UpdateStartup={UpdateStartup}
                                                updateStartupLoading={updateStartupLoading}
                                            />
                                        </Fragment>
                                    ))}
                                    {/* <Text textAlign={"center"} fontSize={"xs"}>
                                        {userStartup.length} fetched
                                    </Text> */}
                                </VStack>
                            </TabPanel>
                            <TabPanel p="0">
                                <Flex justify="left" mb={3} justifyContent={"center"}>
                                    {/* <chakra.h3 fontSize="2xl" fontWeight="bold" textAlign="center">
                                        Your Hackathons
                                    </chakra.h3> */}
                                </Flex>
                                {
                                    userHackathon.length === 0 &&
                                    <VStack borderColor="gray.400" rounded="md" overflow="hidden" spacing={2}>
                                        <Text textAlign={"center"} fontSize={"xs"}>
                                            You have not created any startup yet
                                        </Text>
                                    </VStack>
                                }
                                <VStack borderColor="gray.400" rounded="md" overflow="hidden" spacing={2}>
                                    {userHackathon.map((hackathon: HackathonInterface, index: number) => (
                                        <Fragment key={index}>
                                            <Grid
                                                templateRows={{ base: 'auto auto', md: 'auto' }}
                                                w="100%"
                                                templateColumns={{ base: 'unset', md: '4fr 2fr 2fr' }}
                                                p={{ base: 2, sm: 4 }}
                                                gap={3}
                                                alignItems="center"
                                                justifyContent={"space-between"}
                                                _hover={{ bg: borderColor }}
                                                border={"1px solid"}
                                                borderColor={borderColor}
                                            >
                                                <Box gridColumnEnd={{ base: 'span 2', md: 'unset' }}>
                                                    {/* <chakra.h3 as={ChakraLink} href={article.link} isExternal fontWeight="bold" fontSize="lg">
                                                         {startup.title}
                                                     </chakra.h3> */}
                                                    <Text fontWeight="bold" fontSize="lg" as={Link} to={`/startup/${hackathon?.$id}`}>
                                                        {hackathon.title}
                                                    </Text>
                                                    <chakra.p
                                                        fontWeight="medium"
                                                        fontSize="sm"
                                                        color={profileFetchedCardColor}
                                                    >
                                                        Started: {new Date(hackathon.$createdAt).toLocaleDateString(
                                                            'en-US',
                                                            {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric'
                                                            }
                                                        )}
                                                    </chakra.p>
                                                </Box>
                                                <HStack
                                                    spacing={{ base: 0, sm: 3 }}
                                                    alignItems="center"
                                                    fontWeight="medium"
                                                    fontSize={{ base: 'xs', sm: 'sm' }}
                                                    color={profileFetchedCardColor}
                                                >
                                                    {/* <ArticleStat icon={FaRegComment} value={article.meta.comments} />
                                         <ArticleStat icon={FaRegHeart} value={article.meta.reactions} />
                                         <ArticleStat icon={FaRegEye} value={article.meta.views} /> */}
                                                </HStack>
                                                <Stack
                                                    spacing={2}
                                                    direction="row"
                                                    fontSize={{ base: 'sm', sm: 'md' }}
                                                    justifySelf="flex-end"
                                                    alignItems="center"
                                                >
                                                    <Text as={Button} onClick={updateHackathonDisclosure.onOpen}>
                                                        Edit
                                                    </Text>
                                                    <Center bg={"red.400"} p="2" rounded="full" w="8" h="8" cursor={"pointer"}>
                                                        <Icon
                                                            color={"white"}
                                                            onClick={() => deleteHackathon(hackathon.$id)}
                                                            as={DeleteIcon}
                                                        />
                                                    </Center>
                                                </Stack>
                                            </Grid>
                                            {/* {articles.length - 1 !== index && <Divider m={0} />} */}
                                            <UpdateHackathonModal
                                                hackathon={hackathon}
                                                updateHackathonDisclosure={updateHackathonDisclosure}
                                                UpdateHackathon={UpdateHackathon}
                                                UpdateHackathonLoading={UpdateHackathonLoading}
                                            />
                                        </Fragment>
                                    ))}
                                </VStack>
                            </TabPanel>

                            <TabPanel>
                                {
                                    joinedStartup.length === 0 &&
                                    <VStack borderColor="gray.400" rounded="md" overflow="hidden" spacing={2}>
                                        <Text textAlign={"center"} fontSize={"xs"}>
                                            You have not joined any startup yet
                                        </Text>
                                    </VStack>
                                }
                                <VStack rounded="md" overflow="hidden" spacing={0}>
                                    {joinedStartup.map((startup: StartupInterface, index: number) => (
                                        <Fragment key={index}>
                                            <Grid
                                                templateRows={{ base: 'auto auto', md: 'auto' }}
                                                w="100%"
                                                templateColumns={{ base: 'unset', md: '4fr 2fr 2fr' }}
                                                p={{ base: 2, sm: 4 }}
                                                gap={3}
                                                alignItems="center"
                                                justifyContent={"space-between"}
                                                _hover={{ bg: borderColor }}
                                                border={"1px solid"}
                                                borderColor={borderColor}
                                            >
                                                <Box gridColumnEnd={{ base: 'span 2', md: 'unset' }}>
                                                    {/* <chakra.h3 as={ChakraLink} href={article.link} isExternal fontWeight="bold" fontSize="lg">
                                                            {startup.title}
                                                        </chakra.h3> */}
                                                    <Text fontWeight="bold" fontSize="lg" as={Link} to={`/startup/${startup?.$id}`}>
                                                        {startup.title}
                                                    </Text>
                                                    <chakra.p
                                                        fontWeight="medium"
                                                        fontSize="sm"
                                                        color={profileFetchedCardColor}
                                                    >
                                                        Started: {new Date(startup.$createdAt).toLocaleDateString(
                                                            'en-US',
                                                            {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric'
                                                            }
                                                        )}
                                                    </chakra.p>
                                                </Box>
                                                <HStack
                                                    spacing={{ base: 0, sm: 3 }}
                                                    alignItems="center"
                                                    fontWeight="medium"
                                                    fontSize={{ base: 'xs', sm: 'sm' }}
                                                    color={profileFetchedCardColor}
                                                >
                                                    {/* <ArticleStat icon={FaRegComment} value={article.meta.comments} />
                                            <ArticleStat icon={FaRegHeart} value={article.meta.reactions} />
                                            <ArticleStat icon={FaRegEye} value={article.meta.views} /> */}
                                                </HStack>
                                                <Stack
                                                    spacing={2}
                                                    direction="row"
                                                    fontSize={{ base: 'sm', sm: 'md' }}
                                                    justifySelf="flex-end"
                                                    alignItems="center"
                                                >
                                                    {/* <Text as={Button} onClick={updateDisclosure.onOpen}>
                                                        Edit
                                                    </Text> */}
                                                </Stack>
                                            </Grid>
                                            {/* {articles.length - 1 !== index && <Divider m={0} />} */}
                                            {/* <UpdateStartupModal document={startup}
                                                updateDisclosure={updateDisclosure}
                                                UpdateStartup={UpdateStartup}
                                                updateStartupLoading={updateStartupLoading}
                                            /> */}
                                        </Fragment>
                                    ))}
                                    {/* <Text textAlign={"center"} fontSize={"xs"}>
                                        {userStartup.length} fetched
                                    </Text> */}
                                </VStack>
                            </TabPanel>
                            <TabPanel>
                                <Flex justify="left" mb={3} justifyContent={"center"}>
                                    {/* <chakra.h3 fontSize="2xl" fontWeight="bold" textAlign="center">
                                        Your Hackathons
                                    </chakra.h3> */}
                                </Flex>
                                {
                                    joinedHackathon.length === 0 &&
                                    <VStack borderColor="gray.400" rounded="md" overflow="hidden" spacing={2}>
                                        <Text textAlign={"center"} fontSize={"xs"}>
                                            You have not created any hackathon yet
                                        </Text>
                                    </VStack>
                                }
                                <VStack borderColor="gray.400" rounded="md" overflow="hidden" spacing={2}>
                                    {joinedHackathon.map((hackathon: HackathonInterface, index: number) => (
                                        <Fragment key={index}>
                                            <Grid
                                                templateRows={{ base: 'auto auto', md: 'auto' }}
                                                w="100%"
                                                templateColumns={{ base: 'unset', md: '4fr 2fr 2fr' }}
                                                p={{ base: 2, sm: 4 }}
                                                gap={3}
                                                alignItems="center"
                                                justifyContent={"space-between"}
                                                _hover={{ bg: borderColor }}
                                                border={"1px solid"}
                                                borderColor={borderColor}
                                            >
                                                <Box gridColumnEnd={{ base: 'span 2', md: 'unset' }}>
                                                    {/* <chakra.h3 as={ChakraLink} href={article.link} isExternal fontWeight="bold" fontSize="lg">
                                                         {startup.title}
                                                     </chakra.h3> */}
                                                    <Text fontWeight="bold" fontSize="lg" as={Link} to={`/hackathon/${hackathon?.$id}`}>
                                                        {hackathon.title}
                                                    </Text>
                                                    <chakra.p
                                                        fontWeight="medium"
                                                        fontSize="sm"
                                                        color={profileFetchedCardColor}
                                                    >
                                                        Started: {new Date(hackathon.$createdAt).toLocaleDateString(
                                                            'en-US',
                                                            {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric'
                                                            }
                                                        )}
                                                    </chakra.p>
                                                </Box>
                                                <HStack
                                                    spacing={{ base: 0, sm: 3 }}
                                                    alignItems="center"
                                                    fontWeight="medium"
                                                    fontSize={{ base: 'xs', sm: 'sm' }}
                                                    color={profileFetchedCardColor}
                                                >
                                                    {/* <ArticleStat icon={FaRegComment} value={article.meta.comments} />
                                         <ArticleStat icon={FaRegHeart} value={article.meta.reactions} />
                                         <ArticleStat icon={FaRegEye} value={article.meta.views} /> */}
                                                </HStack>
                                                <Stack
                                                    spacing={2}
                                                    direction="row"
                                                    fontSize={{ base: 'sm', sm: 'md' }}
                                                    justifySelf="flex-end"
                                                    alignItems="center"
                                                >
                                                    {/* <Text as={Button} onClick={updateHackathonDisclosure.onOpen}>
                                                        Edit
                                                    </Text> */}
                                                </Stack>
                                            </Grid>
                                            {/* {articles.length - 1 !== index && <Divider m={0} />} */}
                                            {/* <UpdateHackathonModal
                                                hackathon={hackathon}
                                                updateHackathonDisclosure={updateHackathonDisclosure}
                                                UpdateHackathon={UpdateHackathon}
                                                UpdateHackathonLoading={UpdateHackathonLoading}
                                            /> */}
                                        </Fragment>
                                    ))}
                                </VStack>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>

                </VStack>
            </Stack>
        </>
    );
}


export default Profile;