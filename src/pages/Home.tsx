import {
    Box,
    Heading,
    Container,
    Text,
    Button,
    Stack,
    Icon,
    useColorModeValue,
    IconProps,
    Image,
    Flex,
    useBreakpointValue,
} from '@chakra-ui/react';
// import ToggleTheme from "../components/Toggletheme"
import { ReactElement } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
    FcAbout,
    FcAssistant,
    FcCollaboration,
    FcDonate,
    FcManager,
} from 'react-icons/fc';


const Home = () => {
    return (
        <>
            <Navbar />
            <Box h="100vh" w="100vw" overflowX={"hidden"} pos="relative">
                <Box maxW={'100%'} h="100%" ml={
                    useBreakpointValue({
                        base: "3%",
                        md: "10%"
                    })
                }

                    mb={{
                        base: "30%",
                        md: "0%"
                    }}
                    display={"flex"}
                    flexDirection={{
                        base: "column",
                        md: "row"
                    }}
                >
                    <Stack
                        as={Box}
                        textAlign={'center'}
                        spacing={{ base: 8, md: 8 }}
                        py={{ base: 10, md: 24 }}
                        mb={{ base: 10, md: 24 }}
                        h="80%"
                        alignItems={"start"}
                        justifyContent={"space-around"}
                    >
                        <Image src="/built-with-appwrite.svg" alt="logo" h="20%" w="20%" />
                        <Heading
                            fontWeight={"bold"}
                            fontSize={{ base: '5xl', sm: '6xl', md: '7xl' }}
                            textAlign={"left"}
                            lineHeight={'110%'}>
                            Hustle Together <br />
                            <Text as={'span'} color={'red.400'}>
                                Thrive Together 🚀
                            </Text>
                        </Heading>
                        <Text
                            color={'gray.400'}
                            maxW={'xl'}
                            textAlign={"left"}
                            fontSize={{ base: 'sm', lg: 'md' }}
                        >
                            Uniting Like-minded Go-Getters for Success! Join our vibrant community of passionate individuals who share a common drive for success. Discover endless opportunities to collaborate, network, and thrive together. Together, we embrace the hustle and embark on an empowering journey towards achieving our goals.
                        </Text>
                        <Stack spacing={6} direction={'row'}>
                            <Button
                                rounded={'full'}
                                px={6}
                                colorScheme={'red'}
                                bg={'red.400'}
                                _hover={{ bg: 'red.500' }}>
                                Get started
                            </Button>
                            <Button rounded={'full'} px={6}>
                                Check out
                            </Button>
                        </Stack>
                    </Stack>
                    <Image
                        className='glow-img'
                        alt={'Hero Image'}
                        fit={'cover'}
                        m="auto"
                        mt={{ base: "auto", md: "32" }}
                        w={{ base: '90%', md: '50%' }}
                        h={'50%'}
                        src={'/hero.png'}
                        rounded={"xl"}
                    />
                </Box>
                <Container maxW={'70%'} h={{ base: "100%", md: "70%" }}>
                    <Stack
                        // h="90%"
                        align={'center'}
                        spacing={{ base: 8, md: 32 }}
                        // py={{ base: 20, md: 28 }}
                        direction={{ base: 'column', md: 'row' }}>
                        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
                            <Heading
                                lineHeight={1.1}
                                fontWeight={700}
                                fontSize={{ base: '5xl', sm: '4xl', lg: '5xl' }}>
                                <Text
                                    as={'span'}
                                    position={'relative'}
                                    _after={{
                                        content: "''",
                                        width: 'full',
                                        height: '20%',
                                        position: 'absolute',
                                        bottom: 1,
                                        left: 0,
                                        bg: 'red.400',
                                        zIndex: -1,
                                    }}
                                >
                                    Meet New Startups,
                                </Text>
                                <br />
                                <Text as={'span'} color={'red.400'}>
                                    Meet New Cofounders
                                </Text>
                            </Heading>
                            <Text color={'gray.500'}>
                                Embark on a startup journey, find your co-founders, and bring innovation to life. Join our platform, where new startups meet aspiring co-founders. Together, let's shape the future of entrepreneurship.
                            </Text>
                            <Stack
                                spacing={{ base: 4, sm: 6 }}
                                direction={{ base: 'column', sm: 'row' }}>
                                {/* <Button
                                    rounded={'full'}
                                    size={'lg'}
                                    fontWeight={'normal'}
                                    px={6}
                                    colorScheme={'red'}
                                    bg={'red.400'}
                                    _hover={{ bg: 'red.500' }}>
                                    Get started
                                </Button>
                                <Button
                                    rounded={'full'}
                                    size={'lg'}
                                    fontWeight={'normal'}
                                    px={6}
                                    leftIcon={<PlayIcon h={4} w={4} color={'gray.300'} />}>
                                    How It Works
                                </Button> */}
                            </Stack>
                        </Stack>
                        <Flex
                            flex={1}
                            justify={'center'}
                            align={'center'}
                            position={'relative'}
                            w={'full'}>
                            <Blob
                                w={'150%'}
                                h={'150%'}
                                position={'absolute'}
                                top={'-20%'}
                                left={0}
                                zIndex={-1}
                                color={useColorModeValue('red.50', 'red.400')}
                            />
                            <Box
                                position={'relative'}
                                height={'300px'}
                                rounded={'2xl'}
                                boxShadow={'2xl'}
                                width={'full'}
                                overflow={'hidden'}>
                                <Image
                                    alt={'Hero Image'}
                                    fit={'cover'}
                                    align={'center'}
                                    w={'100%'}
                                    h={'100%'}
                                    src={'/hero.png'}
                                />
                            </Box>
                        </Flex>
                    </Stack>
                </Container>
                <Box h="100%">
                    <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
                        <Heading fontSize={{ base: '2xl', sm: '4xl' }} fontWeight={'bold'}>
                            Short heading
                        </Heading>
                        <Text color={'gray.600'} fontSize={{ base: 'sm', sm: 'lg' }}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
                            obcaecati ut cupiditate pariatur, dignissimos, placeat amet officiis.
                        </Text>
                    </Stack>

                    <Container maxW={'5xl'} mt={12}>
                        <Flex flexWrap="wrap" gridGap={6} justify="center">
                            <Card
                                heading={'Heading'}
                                icon={<Icon as={FcAssistant} w={10} h={10} />}
                                description={
                                    'Lorem ipsum dolor sit amet catetur, adipisicing elit.'
                                }
                                href={'#'}
                            />
                            <Card
                                heading={'Heading'}
                                icon={<Icon as={FcCollaboration} w={10} h={10} />}
                                description={
                                    'Lorem ipsum dolor sit amet catetur, adipisicing elit.'
                                }
                                href={'#'}
                            />
                            <Card
                                heading={'Heading'}
                                icon={<Icon as={FcDonate} w={10} h={10} />}
                                description={
                                    'Lorem ipsum dolor sit amet catetur, adipisicing elit.'
                                }
                                href={'#'}
                            />
                            <Card
                                heading={'Heading'}
                                icon={<Icon as={FcManager} w={10} h={10} />}
                                description={
                                    'Lorem ipsum dolor sit amet catetur, adipisicing elit.'
                                }
                                href={'#'}
                            />
                            <Card
                                heading={'Heading'}
                                icon={<Icon as={FcAbout} w={10} h={10} />}
                                description={
                                    'Lorem ipsum dolor sit amet catetur, adipisicing elit.'
                                }
                                href={'#'}
                            />
                        </Flex>
                    </Container>
                </Box>
                <Box h="100vh">

                </Box>
            </Box>
            <Box pos="fixed" bottom={"0"} width={"100vw"}>
                <Footer />
            </Box>
        </>
    )
}

export const Blob = (props: IconProps) => {
    return (
        <Icon
            width={'100%'}
            viewBox="0 0 578 440"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 112.004-66.78C282.34 8.024 325.382-3.369 370.518.904c54.019 5.115 112.774 10.886 150.881 49.482 39.916 40.427 49.421 100.753 53.385 157.402 4.13 59.015 11.255 128.44-30.444 170.44-41.383 41.683-111.6 19.106-169.213 30.663-46.68 9.364-88.56 35.21-135.943 30.551z"
                fill="currentColor"
            />
        </Icon>
    );
};

interface CardProps {
    heading: string;
    description: string;
    icon: ReactElement;
    href: string;
}

const Card = ({ heading, description, icon }: CardProps) => {
    return (
        <Box
            maxW={{ base: 'full', md: '275px' }}
            w={'full'}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={5}>
            <Stack align={'start'} spacing={2}>
                <Flex
                    w={16}
                    h={16}
                    align={'center'}
                    justify={'center'}
                    color={'white'}
                    rounded={'full'}
                    bg={useColorModeValue('gray.100', 'gray.700')}>
                    {icon}
                </Flex>
                <Box mt={2}>
                    <Heading size="md">{heading}</Heading>
                    <Text mt={1} fontSize={'sm'}>
                        {description}
                    </Text>
                </Box>
                <Button variant={'link'} colorScheme={'blue'} size={'sm'}>
                    Learn more
                </Button>
            </Stack>
        </Box>
    );
};


export default Home
