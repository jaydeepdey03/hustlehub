import {
    Image,
    Box,
    Center,
    Heading,
    Text,
    Stack,
    Avatar,
    useColorModeValue,
    Flex,
    AvatarGroup,
    Button,
    Tag,
    TagLabel,
    chakra,
    HStack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    useDisclosure,
} from '@chakra-ui/react';
import Profilecard from '../../pages/Profilecard';
import { Link } from 'react-router-dom';
const Hackathoncard = (props: any) => {
    const { document, details, role } = props
    const hackathonDisclosure = useDisclosure()
    return (
        <>
            <Center py={6}>
                <Stack
                    direction={{ base: "column", md: 'row' }}
                    maxW={'5xl'}
                    w={'5xl'}
                    minH={{ base: "100%", lg: "350px" }}
                    bg={useColorModeValue('white', 'gray.900')}
                    // border
                    border={'2px solid #e2e8f0'}
                    rounded={'md'}
                    overflow={'hidden'}>
                    <Image
                        // width={'30%'}
                        width={{ base: "100%", md: "30%" }}
                        p="3"
                        src={document.image ? document.image :
                            'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
                        }
                        // fill
                        objectFit={'cover'}
                    />
                    <Stack p="6" spacing={6} w="100%">
                        <Stack>
                            <Heading
                                color={useColorModeValue('gray.700', 'white')}
                                fontSize={'2xl'}
                                fontFamily={'body'}>
                                {document.title}
                            </Heading>
                            <Box minH="7rem" minW={{ base: "xs", md: "lg" }}>
                                <Box alignItems={"center"}>
                                    <Text fontSize={"sm"}>Hackathon Idea</Text>
                                    <Text>
                                        {document.idea}
                                    </Text>
                                </Box>
                            </Box>
                        </Stack>
                        {/* <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
                            <Avatar
                                src={'https://avatars0.githubusercontent.com/u/1164541?v=4'}
                                name={'Author'}
                            />
                            <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                                <Text fontSize={"xs"} fontWeight={300}>Created by</Text>
                                <Text fontWeight={600}>Achim Rolle</Text>
                                <Text color={'gray.500'}>Feb 08, 2021 · 6min read</Text>
                            </Stack>
                            
                        </Stack> */}
                        <Profilecard userId={document.creator} created={true} details={true} />
                        <Flex justifyContent={"space-between"}>
                            <Stack spacing={3}>
                                <Text fontWeight={600} fontSize="xs">Participants {" "}
                                    <chakra.span fontWeight={"normal"}>(Max: {document.noOfMembers})</chakra.span>
                                </Text>

                                {
                                    document.members.length !== 0 ? (
                                        <AvatarGroup size="sm" max={3}>
                                            {document?.members?.map((member: any) => (
                                                <Profilecard userId={member} created={false} details={false} key={member} />
                                            ))}
                                        </AvatarGroup>
                                    ) : (
                                        <Text fontSize="sm" color={useColorModeValue("gray", "white")}>
                                            No Participants yet
                                        </Text>
                                    )
                                }

                            </Stack>
                            {/* Button */}
                            <Flex mt="6" alignItems={"center"}>
                                <Button colorScheme='telegram' size={"sm"}
                                    as={Link} to={`/hackathon/${document.$id}`}
                                    state={{ documentId: document.$id }}
                                >Learn More</Button>
                            </Flex>
                        </Flex>
                    </Stack>
                </Stack>
            </Center>

            <Modal onClose={hackathonDisclosure.onClose} size={"xl"} isOpen={hackathonDisclosure.isOpen} isCentered scrollBehavior="inside">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Startup Name</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack spacing={4}>
                            <Stack>
                                <Text fontWeight={"bold"} fontSize={"md"}>{document.title}</Text>
                                <Text>
                                    {document.idea}
                                </Text>
                            </Stack>
                            <HStack spacing={"4"} pl='4'>
                                <Box>
                                    <Heading mb='3' size='sm'>Founder <span>{ }</span> </Heading>
                                    <HStack>
                                        <Avatar size={"sm"} name={"Dan Abramov"} src={"https://bit.ly/dan-abramov"} />
                                        <Text fontSize={"sm"} color={useColorModeValue('gray',
                                            'white')}>
                                        </Text>
                                    </HStack>
                                </Box>

                            </HStack>
                        </Stack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={hackathonDisclosure.onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default Hackathoncard
