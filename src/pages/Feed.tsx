import { useEffect, useState } from "react"
import { DB, SDK } from "../appwrite/appwrite-config"
import { Box, Stack, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs, Text, useToast } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import '../App.css'
import Startupcard from "../components/Startup/Startupcard"
import Hackathoncard from "../components/hackathon/Hackathoncard"
import { BsRocketTakeoff } from 'react-icons/bs'
import { FiMonitor } from 'react-icons/fi'
import useGlobalState from "../hooks/useGlobalState"
import { AuthUser, HackathonInterface, StartupInterface } from "../types/MyData"


const Feed = () => {
    const navigate = useNavigate()
    const toast = useToast()
    // details matlab current logged in user
    const [details, setDetails] = useState({} as AuthUser)
    const [role, setRole] = useState('' as string)
    const [startupCollection, setStartupCollection] = useState([] as StartupInterface[])
    const [hackathonCollection, setHackathonCollection] = useState([] as HackathonInterface[])

    // const startupDisclosure = useDisclosure();
    const { hasCreated } = useGlobalState()

    useEffect(() => {
        SDK.get().then(res => {
            setDetails(res)
            // fetch user document and assign role
            DB.getDocument('646cfa393629aedbd58f', '646edbd8de898ccf87c5', res.$id).then(result => {
                setRole(result.role)
            }).catch(err => console.log(err))

            // fetch collections
            DB.listDocuments('646cfa393629aedbd58f', '646cfa7aa01148c42ebf').then((res) => {
                setStartupCollection(res.documents.reverse() as StartupInterface[])
            }).catch(err => console.log(err))
        }).catch(() => {
            toast({
                title: "An error occurred.",
                description: "You are not logged in.",
                status: "error",
                duration: 9000,
                isClosable: true,
            })
            navigate('/login')
        })
    }, [hasCreated, navigate, toast])

    useEffect(() => {
        DB.listDocuments('646cfa393629aedbd58f', '646ed5510d2cb68ff19f').then(res => {
            setHackathonCollection(res.documents.reverse() as HackathonInterface[])
        }).catch(err => console.log(err))
    }, [hasCreated])



    console.log(hackathonCollection, 'hackathon')

    return (
        <>
            {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            }<Box h="100vh" w="100vw" overflowY={"overlay" as any} boxSizing="border-box">
                <Navbar />
                <Box m={"auto"} p="6" w={{ base: "100vw", xl: "70vw" }}>
                    <Tabs position="relative" variant="unstyled" isFitted defaultIndex={0} isLazy>
                        <TabList>
                            <Tab _focus={{ outline: 'none' }} _hover={{ outline: 'none' }}>
                                <BsRocketTakeoff />
                                <Text ml="2">Startups</Text>
                            </Tab>
                            <Tab _focus={{ outline: 'none' }} _hover={{ outline: 'none' }}>
                                <FiMonitor />
                                <Text ml="2">Hackathons</Text>
                            </Tab>
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
                                        startupCollection.length === 0 &&
                                        <Text mt={"24"} fontSize="xl" fontWeight="bold" textAlign="center" color="gray.500">
                                            No startups yet
                                        </Text>
                                    }
                                    {
                                        startupCollection.map((startup: StartupInterface, index: number) => {
                                            return (
                                                <>
                                                    <Startupcard
                                                        key={index}
                                                        document={startup}
                                                        details={details}
                                                        role={role}
                                                        index={index}
                                                    />
                                                </>
                                            )
                                        })
                                    }
                                </Stack>

                            </TabPanel>
                            <TabPanel>
                                {
                                    hackathonCollection.length === 0 &&
                                    <Text mt={"24"} fontSize="xl" fontWeight="bold" textAlign="center" color="gray.500">
                                        No Hackathons yet
                                    </Text>
                                }
                                {
                                    hackathonCollection && hackathonCollection.map((document: HackathonInterface, index: number) => {
                                        console.log(document, 'document')
                                        return (
                                            <>
                                                <Hackathoncard
                                                    key={index}
                                                    document={document}
                                                    details={details}
                                                />
                                            </>
                                        )
                                    })
                                }
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box >
            </Box>
        </>
    )
}


export default Feed
