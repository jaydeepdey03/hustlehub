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
} from '@chakra-ui/react';
const Hackathoncard = (props: any) => {
    // const { document, details, role, joinStartup, index } = props
    return (
        <Center py={6}>
            <Flex
                direction={'row'}
                maxW={'4xl'}
                w={'3xl'}
                height={"300px"}
                bg={useColorModeValue('white', 'gray.900')}
                // border
                border={'2px solid #e2e8f0'}
                rounded={'md'}
                overflow={'hidden'}>
                <Image
                    width={'30%'}
                    height={'full'}
                    src={
                        'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
                    }
                    // fill
                    objectFit={'cover'}
                />
                <Stack p="6" spacing={5}>
                    <Stack>
                        <Text
                            color={'green.500'}
                            textTransform={'uppercase'}
                            fontWeight={800}
                            fontSize={'sm'}
                            letterSpacing={1.1}>
                            Blog
                        </Text>
                        <Heading
                            color={useColorModeValue('gray.700', 'white')}
                            fontSize={'2xl'}
                            fontFamily={'body'}>
                            Boost your conversion rate
                        </Heading>
                        <Text>
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
                            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
                            et ea rebum.
                        </Text>
                    </Stack>
                    {/* <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
                        <Avatar
                            src={'https://avatars0.githubusercontent.com/u/1164541?v=4'}
                            name={'Author'}
                        />
                        <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                            <Text fontWeight={600}>Achim Rolle</Text>
                            <Text color={'gray.500'}>Feb 08, 2021 · 6min read</Text>
                        </Stack>
                    </Stack> */}
                    <Flex justifyContent={"space-between"}>
                        <Stack spacing={3}>
                            <Text fontWeight={600} fontSize="xs">Participants</Text>
                            <AvatarGroup size='sm' max={3}>
                                <Avatar name='Ryan Florence' src='https://bit.ly/ryan-florence' />
                                <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
                                <Avatar name='Kent Dodds' src='https://bit.ly/kent-c-dodds' />
                                <Avatar name='Prosper Otemuyiwa' src='https://bit.ly/prosper-baba' />
                                <Avatar name='Christian Nwamba' src='https://bit.ly/code-beast' />
                            </AvatarGroup>
                        </Stack>
                        {/* Button */}
                        <Flex mt="4"  alignItems={"center"}>
                            <Button colorScheme='telegram'>Join</Button>
                        </Flex>
                    </Flex>
                </Stack>
            </Flex>
        </Center>
    )
}

export default Hackathoncard
