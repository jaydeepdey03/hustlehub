import {
    Heading,
    Avatar,
    Box,
    Center,
    Image,
    Flex,
    Text,
    Stack,
    chakra,
    Link as ChakraLink, Tab, TabList, TabPanel, TabPanels, Tabs, VStack, Divider, Icon, Grid, HStack, useColorModeValue, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, FormErrorMessage, Textarea, FormHelperText, IconButton, Button, ModalFooter, useDisclosure
} from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import { Link, useLocation } from 'react-router-dom';
import { IconType } from 'react-icons/lib';
import { FaRegComment, FaRegEye, FaRegHeart } from 'react-icons/fa';
import { CiMail } from 'react-icons/ci';
import { useState, useEffect, Fragment } from 'react';
import { DB, SDK, storage } from '../appwrite/appwrite-config';
import { Field, FieldArray, Formik } from 'formik';
import { CloseIcon } from '@chakra-ui/icons';
import * as Yup from 'yup';
import { ID } from 'appwrite';
import UpdateStartupModal from '../components/UpdateStartupModal';
interface ArticleAttributes {
    title: string;
    link: string;
    created_at: string;
    meta: {
        reactions: number;
        comments: number;
        views: number;
    };
}

const articles: ArticleAttributes[] = [
    {
        title: 'Started 2022 by updating portfolio website',
        link: 'https://mahmad.me/blog/started-2022-by-updating-portfolio-website-1jde-temp-slug-4553258',
        created_at: '21 Jan 2022',
        meta: {
            reactions: 225,
            comments: 20,
            views: 500
        }
    },
    {
        title: 'Create professional portfolio website with Nextjs and ChakraUI',
        link: 'https://mahmad.me/blog/create-professional-portfolio-website-with-nextjs-and-chakraui-4lkn',
        created_at: '20 Jun 2021',
        meta: {
            reactions: 400,
            comments: 25,
            views: 300
        }
    },
    {
        title: `Find out what's new in my portfolio website`,
        link: 'https://mahmad.me/blog/what-s-new-in-my-portfolio-websitea',
        created_at: '31 Sept 2022',
        meta: {
            reactions: 5,
            comments: 15,
            views: 150
        }
    }
];


function Profile() {
    const location = useLocation()
    const [userStartup, setUserStartup] = useState([] as any)
    const [userHackathon, setUserHackathon] = useState([] as any)
    const [user, setUser] = useState({} as any)
    const updateDisclosure = useDisclosure()

    const UpdateStartup = (title: string, description: string, image: File, milestone: string[]) => {
        storage.createFile("647a464fabf94fdc2ebf", ID.unique(), image).then(res => {
            const url = storage.getFilePreview("647a464fabf94fdc2ebf", res.$id)
            DB.updateDocument('646cfa393629aedbd58f', '646cfa7aa01148c42ebf', document.$id, {
                title,
                idea: description,
                image: url,
                milestones: milestone
            }).then((res1) => {
                updateDisclosure.onClose()
                console.log("updated startup", res1)
            }).catch(err => console.log(err, 'err at update doc'))
        }).catch(err1 => console.log('err at create file', err1))
    }

    useEffect(() => {
        SDK.get().then(res => {
            setUser(res)
            // fetch from startup collection the startups created by this user
            DB.listDocuments('646cfa393629aedbd58f', '646cfa7aa01148c42ebf').then(res1 => {
                // set array of startups who founder is this user
                setUserStartup(res1.documents.filter((startup: any) => startup.founder === res.$id))
            }).catch(err => console.log(err))
        }).catch(err => console.log(err))
    }, [location])

    useEffect(() => {
        SDK.get().then(res => {
            setUser(res)
            // fetch from startup collection the startups created by this user
            DB.listDocuments('646cfa393629aedbd58f', '646ed5510d2cb68ff19f').then(res1 => {
                // set array of startups who founder is this user
                setUserHackathon(res1.documents.filter((hackathon: any) => hackathon.creator === res.$id))
            }).catch(err => console.log(err))
        }).catch(err => console.log(err))
    }, [location])

    console.log(userHackathon, 'user hacakthon from profile')

    return (
        <>
            <Navbar />
            <Stack width={"80%"} m="auto" direction={{ base: 'column', md: 'row' }} p={"6"} spacing={"10"} justifyContent={"center"}>


                <VStack
                    h="100%"
                    w={{ base: "100%", md: "30%" }}
                    rounded={"xl"}
                    border={"1px solid"}
                    borderColor={useColorModeValue('gray.200', 'gray.700')}
                    spacing={{ base: 4, md: 10 }}
                >
                    <Avatar
                        size="2xl"
                        name={user.name}
                        mt="5"
                    />
                    <Text
                        bgGradient='linear(to-l, #7928CA, #FF0080)'
                        bgClip='text'
                        fontSize='3xl'
                        fontWeight='extrabold'
                    >
                        {user.name}
                    </Text>
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
                    <HStack></HStack>
                </VStack>

                <VStack
                    alignItems={"flex-start"}
                    w="70%"
                    h="60vh"
                    border={"1px solid"}
                    borderColor={'gray.200'}
                    rounded={"xl"}
                    spacing={{ base: 4, md: 10 }}
                >
                    <Tabs variant='soft-rounded' colorScheme='red' p="4" w="full">
                        <TabList justifyContent="flex-start">
                            <Tab>Your Startup</Tab>
                            <Tab>Your Hackathons</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <Flex justify="left" mb={3} justifyContent={"center"}>
                                    {/* <chakra.h3 fontSize="2xl" fontWeight="bold" textAlign="center">
                                        Your Startups
                                    </chakra.h3> */}
                                </Flex>
                                <VStack rounded="md" overflow="hidden" spacing={0}>
                                    {userStartup.map((startup: any, index: number) => (
                                        <Fragment key={index}>
                                            <Grid
                                                templateRows={{ base: 'auto auto', md: 'auto' }}
                                                w="100%"
                                                templateColumns={{ base: 'unset', md: '4fr 2fr 2fr' }}
                                                p={{ base: 2, sm: 4 }}
                                                gap={3}
                                                alignItems="center"
                                                justifyContent={"space-between"}
                                                _hover={{ bg: useColorModeValue('gray.200', 'gray.700') }}
                                                border={"1px solid"}
                                                borderColor={useColorModeValue('gray.200', 'gray.700')}
                                            >
                                                <Box gridColumnEnd={{ base: 'span 2', md: 'unset' }}>
                                                    {/* <chakra.h3 as={ChakraLink} href={article.link} isExternal fontWeight="bold" fontSize="lg">
                                                            {startup.title}
                                                        </chakra.h3> */}
                                                    <chakra.h3 fontWeight="bold" fontSize="lg">
                                                        {startup.title}
                                                    </chakra.h3>
                                                    <chakra.p
                                                        fontWeight="medium"
                                                        fontSize="sm"
                                                        color={useColorModeValue('gray.600', 'gray.300')}
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
                                                    color={useColorModeValue('gray.600', 'gray.300')}
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
                                                </Stack>
                                            </Grid>
                                            {/* {articles.length - 1 !== index && <Divider m={0} />} */}
                                            <UpdateStartupModal document={startup}
                                                updateDisclosure={updateDisclosure}
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
                                <VStack borderColor="gray.400" rounded="md" overflow="hidden" spacing={2}>
                                    {userHackathon.map((hackathon:any, index:number) => (
                                        <Fragment key={index}>
                                            <Grid
                                                templateRows={{ base: 'auto auto', md: 'auto' }}
                                                w="100%"
                                                templateColumns={{ base: 'unset', md: '4fr 2fr 2fr' }}
                                                p={{ base: 2, sm: 4 }}
                                                gap={3}
                                                alignItems="center"
                                                justifyContent={"space-between"}
                                                _hover={{ bg: useColorModeValue('gray.200', 'gray.700') }}
                                                border={"1px solid"}
                                                borderColor={useColorModeValue('gray.200', 'gray.700')}
                                            >
                                                <Box gridColumnEnd={{ base: 'span 2', md: 'unset' }}>
                                                    {/* <chakra.h3 as={ChakraLink} href={article.link} isExternal fontWeight="bold" fontSize="lg">
                                                         {startup.title}
                                                     </chakra.h3> */}
                                                    <chakra.h3 fontWeight="bold" fontSize="lg">
                                                        {hackathon.title}
                                                    </chakra.h3>
                                                    <chakra.p
                                                        fontWeight="medium"
                                                        fontSize="sm"
                                                        color={useColorModeValue('gray.600', 'gray.300')}
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
                                                    color={useColorModeValue('gray.600', 'gray.300')}
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
                                                    <Text as={Button} >
                                                        Edit
                                                    </Text>
                                                </Stack>
                                            </Grid>
                                            {/* {articles.length - 1 !== index && <Divider m={0} />} */}
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

const ArticleStat = ({ icon, value }: { icon: IconType; value: number }) => {
    return (
        <Flex p={1} alignItems="center">
            <Icon as={icon} w={5} h={5} mr={2} />
            <chakra.span> {value} </chakra.span>
        </Flex>
    );
};


const ArticleSettingLink = ({ label }: { label: string }) => {
    return (
        <chakra.p
            as={Link}
            _hover={{ bg: useColorModeValue('gray.400', 'gray.600') }}
            p={1}
            rounded="md"
        >
            {label}
        </chakra.p>
    );
};


export default Profile;