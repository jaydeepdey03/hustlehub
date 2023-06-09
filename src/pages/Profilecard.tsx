import { Avatar, Link as ChakraLink, Divider, HStack, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, VStack, useColorModeValue, useDisclosure } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { DB } from "../appwrite/appwrite-config"
import { User } from '../types/MyData'
import { CiMail } from "react-icons/ci";
import { FiTwitter } from "react-icons/fi";
import { AiOutlineLinkedin } from "react-icons/ai";

interface ProfilecardProps {
    userId: string;
    created: boolean;
    details: boolean;
}


const Profilecard = (props: ProfilecardProps) => {
    const { userId, created, details } = props
    const [user, setUser] = useState({} as User)
    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => {
        if (userId) {
            DB.getDocument('646cfa393629aedbd58f', '646edbd8de898ccf87c5', userId).then(res => {
                setUser(res as User)
                console.log(res, 'from profilecard')
            }
            ).catch(err => console.log(err))
        }
    }, [userId])

    const borderColor = useColorModeValue("gray.200", "gray.700");

    if (details === false) return (
        <Avatar name={user.name} size={"sm"} />
    )
    else return (
        <>
            <Stack direction={'row'} spacing={4} align={'center'} onClick={onOpen} cursor={"pointer"}>
                <Avatar
                    // src={'https://avatars0.githubusercontent.com/u/1164541?v=4'}
                    name={user.name}
                />
                <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                    {created && <Text fontSize={"xs"} fontWeight={300}>Created by</Text>}
                    <Text fontWeight={600}>{user.name}</Text>
                    <Text color={'gray.500'}>{user.email}</Text>
                </Stack>
            </Stack>

            <Modal onClose={onClose} size={"xl"} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader></ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack
                            h="100%"
                            w={{ base: "100%"}}
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
                                {user.twitterLink && <ChakraLink href={user.twitterLink} target={"_blank"}>
                                    <Icon
                                        as={FiTwitter}
                                        w={5}
                                        h={5}
                                    />
                                </ChakraLink>}
                                {user.linkedinLink && <ChakraLink href={user.linkedinLink} target={"_blank"}>
                                    <Icon
                                        as={AiOutlineLinkedin}
                                        w={5}
                                        h={5}
                                    />
                                </ChakraLink>}
                            </HStack>
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default Profilecard
