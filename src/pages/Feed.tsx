import { useEffect, useState } from "react"
import { DB, SDK } from "../appwrite/appwrite-config"
import { Box, Stack, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs, useDisclosure, useToast } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import '../App.css'
import Startupcard from "../components/Startup/Startupcard"
import Hackathoncard from "../components/hackathon/Hackathoncard"


const Feed = () => {
    const navigate = useNavigate()
    const toast = useToast()
    const [details, setDetails] = useState({} as any)
    const [role, setRole] = useState('' as any)
    const [startupCollection, setStartupCollection] = useState([] as any)
    const [joinLoading, setJoinLoading] = useState(false)
    const startupDisclosure = useDisclosure();
    useEffect(() => {
        SDK.get().then(res => {
            setDetails(res)
            // fetch user document and assign role
            DB.getDocument('646cfa393629aedbd58f', '646edbd8de898ccf87c5', res.$id).then(result => {
                setRole(result.role)
            }).catch(err => console.log(err))

            // fetch collections
            DB.listDocuments('646cfa393629aedbd58f', '646cfa7aa01148c42ebf').then(res => {
                setStartupCollection(res.documents)
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
    }, [])

    const joinStartup = (userId: string, documentId: string) => {
        setJoinLoading(true)
        DB.updateDocument('646cfa393629aedbd58f', '646cfa7aa01148c42ebf', documentId, {
            cofounder: userId
        }).then(() => {
        }).catch(err => console.log(err)).finally(() => {
            setJoinLoading(false)
        })
    }

    return (
        <>
            {/* Modal */}
            <Box h="100vh" w="100vw" overflowY={"overlay" as any} boxSizing="border-box">
                <Navbar />
                {/* <p>{details.name}</p>
            <p>{details.email}</p> */}

                <Box m={"auto"} p="6" w={{ base: "100vw", lg: "65vw" }}>
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
                                        startupCollection.map((document: any, index: number) => {
                                            return (
                                                <>
                                                    <Startupcard
                                                        key={index}
                                                        document={document}
                                                        details={details}
                                                        role={role}
                                                        joinStartup={joinStartup}
                                                        index={index}
                                                        joinLoading={joinLoading}
                                                    />
                                                </>
                                            )
                                        })
                                    }
                                </Stack>

                            </TabPanel>
                            <TabPanel>
                                <Hackathoncard />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box >
            </Box>
        </>
    )
}


export default Feed
