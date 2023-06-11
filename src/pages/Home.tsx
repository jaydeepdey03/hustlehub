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
    SimpleGrid,
    Link as ChakraLink
} from '@chakra-ui/react';
// import ToggleTheme from "../components/Toggletheme"
import { ReactElement } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { BsGithub, BsPeople, BsRocketTakeoff } from 'react-icons/bs';
import { IoMdBuild } from 'react-icons/io';
import { MdEmojiPeople } from 'react-icons/md';
import { Link } from 'react-router-dom';


const Home = () => {
    return (
        <>
            <Navbar />
            <Box h="100%" w="100%">
                <Box maxW={'100%'} h="100%" ml={useBreakpointValue({ base: "3%", md: "7%" })} mb={{ base: "30%", md: "0%" }} display="flex" flexDirection={{ base: "column", lg: "row" }}>
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
                            maxW={'lg'}
                            textAlign={"justify"}
                            fontSize={{ base: 'sm', lg: 'md' }}
                        >
                            Uniting Like-minded Go-Getters for Success! Join our vibrant community of passionate individuals who share a common drive for success. Discover endless opportunities to collaborate, network, and thrive together. Together, we embrace the hustle and embark on an empowering journey towards achieving our goals.
                        </Text>
                        <Stack spacing={6} direction={'row'}>
                            <Button
                                as={Link}
                                to="/login"
                                rounded={'full'}
                                px={6}
                                colorScheme={'red'}
                                bg={'red.400'}
                                _hover={{ bg: 'red.500' }}>
                                Get started
                            </Button>
                            <Button rounded={'full'} px={6} leftIcon={<BsGithub />} as={ChakraLink} href="https://github.com/jaydeepdey03/hustlehub" target="_blank">
                                Star me at Github
                            </Button>
                        </Stack>
                    </Stack>
                    <Image
                        className='glow-img'
                        alt={'Hero Image'}
                        fit={'cover'}
                        m="auto"
                        mt={{ base: "auto", md: "auto" }}
                        w={{ base: '90%', md: '50%' }}
                        mr="7"
                        h={'50%'}
                        src={'/hero.png'}
                        rounded={"xl"}
                    />
                </Box>
                <Container maxW={'85%'} h={{ base: "100%", md: "50%" }}>
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
                                fontSize={{ base: '5xl', sm: '5xl', lg: '5xl' }}>
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
                            <Text color={'gray.500'} textAlign={'justify'} maxW="md" fontSize={"md"}>
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
                                w={'125%'}
                                h={'125%'}
                                position={'absolute'}
                                top={'-20%'}
                                left={0}
                                zIndex={-1}
                                color={useColorModeValue('red.50', 'red.400')}
                            />
                            <Box
                                position={'relative'}
                                height={'400px'}
                                rounded={'2xl'}
                                boxShadow={'2xl'}
                                width={"500px"}
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
                <Box h={"100%"} maxW="3xl" m="auto" p="4">
                    <Stack
                        textAlign={'center'}
                        align={'center'}
                        spacing={{ base: 8, md: 10 }}
                        py={{ base: 20, md: 28 }}>
                        <Heading
                            fontWeight={"bold"}
                            fontSize={{ base: '3xl', sm: '5xl', md: '6xl' }}
                            lineHeight={'110%'}>
                            Finding Hackathon{' '} <br />
                            <Text as={'span'} color={'orange.400'}>
                                made easy 🔥
                            </Text>
                        </Heading>
                        <Text color={'gray.500'} maxW={'2xl'} fontSize={{ base: 'sm', sm: 'sm', md: 'lg' }}>
                            Find Hackathons Made Easy. Discover and join the most exciting hackathons effortlessly with our intuitive platform that streamlines your search and registration process. Unleash your creativity and connect with like-minded innovators as we simplify the hunt for hackathons, empowering you to focus on what matters most – building awesome projects.
                        </Text>
                        <Image
                            className='glow-img'
                            alt={'Hero Image'}
                            fit={'cover'}
                            m="auto"
                            mt={{ base: "auto", md: "32" }}
                            w={{ base: '100%', md: '100%' }}
                            h={'50%'}
                            src={'/hero.png'}
                            rounded={"xl"}
                        />
                        <Stack spacing={6} direction={'row'}>
                            <Button
                                as={Link}
                                to="/feed"
                                rounded={'full'}
                                px={6}
                                colorScheme={'orange'}
                                bg={'orange.400'}
                                _hover={{ bg: 'orange.500' }}>
                                Get started
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
                <Box mt={{base: "10%", md: 0}} px={{ base: "2", md: "5" }}>
                    <Stack spacing={4} as={Container} maxW={{ base: "xl", md: "3xl" }} textAlign="center">
                        <Heading fontSize={{ base: "5xl", sm: "6xl" }} fontWeight="bold">
                            Features
                        </Heading>
                        <Text color="gray.600" fontSize={{ base: "sm", sm: "lg" }}>
                            One platform to rule them all. We provide a wide range of features to help you find your next hackathon, meet new people, and build awesome projects.
                        </Text>
                    </Stack>
                </Box>


                <Box mt={12}>
                    <Flex flexWrap="wrap" gridGap={6} justify="center">
                        <Card
                            heading={'Idea Pitching Platform'}
                            icon={<Icon as={BsRocketTakeoff} color="red.400" w={10} h={10} />}
                            description={'Share your startup ideas and receive feedback from a supportive community of entrepreneurs, investors, and industry experts.'}
                            href={'#'}
                        />
                        <Card
                            heading={'Co-founder Discovery'}
                            icon={<Icon as={BsPeople} color="red.400" w={10} h={10} />}
                            description={'Connect with potential co-founders who share your vision and complement your skill set, facilitating the formation of strong startup teams.'}
                            href={'#'}
                        />
                        <Card
                            heading={'Hackathon Team Building'}
                            icon={<Icon as={IoMdBuild} color="red.400" w={10} h={10} />}
                            description={'Find team members with diverse expertise for hackathons, allowing you to create dynamic and well-rounded teams to tackle challenges.'}
                            href={'#'}
                        />
                        <Card
                            heading={'Networking and Collaboration'}
                            icon={<Icon as={MdEmojiPeople} color="red.400" w={10} h={10} />}
                            description={'Engage with a vibrant network of innovators, mentors, and industry professionals, fostering valuable connections and collaboration opportunities.'}
                            href={'#'}
                        />
                    </Flex>
                </Box>

                <Box h="80%" mt="10vh">
                    <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'} mb="10vh">
                        <Heading fontSize={{ base: '5xl', sm: '5xl' }} fontWeight={'bold'}>
                            Built with
                        </Heading>
                        <Text color={'gray.600'} fontSize={{ base: 'sm', sm: 'lg' }}>
                            Built with latest technologies to provide you with the best experience.
                        </Text>
                    </Stack>
                    <SimpleGrid
                        gap={10}
                        columns={[2, null, 4]}
                        justifyItems="center"
                        alignItems="center"
                        maxW="5xl"
                        m="auto"
                        p="7"
                    >
                        <Image src="/ts.png" alt="logo" h="auto" w="7rem" rounded="xl" />
                        <Image src="/built-with-appwrite2.svg" alt="logo" h="7rem" w="7rem" rounded="xl" />
                        <Image src="/reactts.png" alt="logo" h="7rem" w="rem" />
                        <Image src="/chakra.png" alt="logo" h="auto" w="auto" p="7" rounded="xl" />
                    </SimpleGrid>

                </Box>
            </Box >
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
            w={'90%'}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={5}>
            <Stack align={'center'} spacing={2}>
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
                    <Heading size="md" textAlign="center" textColor={"gray.600"}>{heading}</Heading>
                    <Text mt={1} fontSize={'sm'} textAlign="center">
                        {description}
                    </Text>
                </Box>
                {/* <Button variant={'link'} colorScheme={'blue'} size={'sm'}>
                    Learn more
                </Button> */}
            </Stack>
        </Box>
    );
};


export default Home
