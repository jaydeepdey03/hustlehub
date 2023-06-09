import { ReactNode, useEffect, useState } from 'react';
import {
    Box,
    Flex,
    Avatar,
    HStack,
    IconButton,
    useDisclosure,
    useColorModeValue,
    Stack,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    Icon,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    FormHelperText,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    FormErrorMessage,
    Image,
    useToast,
} from '@chakra-ui/react';
import {
    HamburgerIcon,
    CloseIcon,
    AddIcon,
    // AddIcon
} from '@chakra-ui/icons';
import ToggleTheme from './Toggletheme';
import useGlobalState from '../hooks/useGlobalState';
import { DB, SDK, storage } from '../appwrite/appwrite-config';
import { Link, useLocation } from 'react-router-dom';
import { Field, FieldArray, Formik } from 'formik';
import * as Yup from 'yup';
import { AppwriteException, ID } from 'appwrite';
import { AuthUser } from '../types/MyData';

// const Links = ['About Us', 'Register', 'Login'];

const NavLink = ({ children, linktxt }: { children: ReactNode, linktxt: string }) => (
    <Link to={linktxt}>
        <Box
            px={2}
            py={1}
            rounded={'md'}
            _hover={{
                textDecoration: 'none',
                bg: useColorModeValue('gray.200', 'gray.700'),
            }}
        >
            {children}
        </Box>
    </Link>
);


const Navbar = () => {
    const { Logout, setHasCreated } = useGlobalState()
    const { pathname } = useLocation()
    const [data, setData] = useState({} as AuthUser)
    const profileDisclosure = useDisclosure();
    const startupDisclosure = useDisclosure();
    const HackathonDisclosure = useDisclosure();
    // console.log(location, 'location')
    const [role, setRole] = useState('' as string)
    const [startupLoading, setStartupLoading] = useState(false)
    const toast = useToast()


    useEffect(() => {
        SDK.get().then((res: AuthUser) => {
            // fetch the user using logged in user id
            DB.getDocument('646cfa393629aedbd58f', '646edbd8de898ccf87c5', res.$id).then((result) => {
                setRole(result.role)
            }).catch(err => console.log(err))
            setData(res as AuthUser)
        }).catch(() => {
            console.log('not logged in')
        })
    }, [])

    const AddNewStartup = async (title: string, description: string, image: File | string, milestones: string[]) => {
        setStartupLoading(true)
        storage.createFile("647a464fabf94fdc2ebf", ID.unique(), image as File).then(res => {
            const url = storage.getFilePreview("647a464fabf94fdc2ebf", res.$id)
            DB.createDocument("646cfa393629aedbd58f", "646cfa7aa01148c42ebf", ID.unique(), {
                title: title,
                idea: description,
                image: url,
                founder: data.$id,
                milestones: milestones,
            }).then(() => {
                startupDisclosure.onClose()
                setHasCreated(prev=>!prev)
                DB.listDocuments("646cfa393629aedbd58f", "646cfa7aa01148c42ebf")
                    .then(() => {
                        // Update the startup collection state with the fetched data
                        // setStartupCollection(res.documents);
                        console.log()
                    })
                    .catch((err2) => {
                        console.log(err2);
                        toast({
                            title: "Error",
                            description: err2.message,
                            status: "error",
                            duration: 9000,
                            isClosable: true,
                        })
                    });
            }).catch((err1: unknown) => {
                const appwriteexception = err1 as AppwriteException
                console.log(appwriteexception.message)
                toast({
                    title: "Error",
                    description: appwriteexception.message,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                })
            })
        }).catch(err2 => {
            console.log(err2)
            toast({
                title: "Error",
                description: err2.message,
                status: "error",
                duration: 9000,
                isClosable: true,
            })
        }).finally(() => {
            setStartupLoading(false)
        })
    }

    const [hackathonLoading, setHackathonLoading] = useState(false)

    const createNewHackathon = async (title: string, idea: string, image: File | string, noOfMembers: number, link:string) => {
        setHackathonLoading(true)
        storage.createFile("647a464fabf94fdc2ebf", ID.unique(), image as File).then(res => {
            const url = storage.getFilePreview("647a464fabf94fdc2ebf", res.$id)
            DB.createDocument("646cfa393629aedbd58f", "646ed5510d2cb68ff19f", ID.unique(), {
                title: title,
                idea: idea,
                image: url,
                noOfMembers: noOfMembers,
                creator: data.$id,
                link: link,
            }).then(() => {
                setHasCreated(prev=>!prev)
                HackathonDisclosure.onClose()
                DB.listDocuments("646cfa393629aedbd58f", "646ed5510d2cb68ff19f")
                    .then(() => {
                        // Update the startup collection state with the fetched data
                        // setStartupCollection(res.documents);
                        console.log()
                    })
                    .catch((err) => {
                        console.log(err);
                        toast({
                            title: "Error",
                            description: err.message,
                            status: "error",
                            duration: 9000,
                            isClosable: true,
                        })
                    });
            }).catch((err: unknown) => {
                const appwriteexception = err as AppwriteException
                toast({
                    title: "Error",
                    description: appwriteexception.message,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                })
                console.log(appwriteexception.message)
            }).finally(() => {
                setHackathonLoading(false)
            })
        }).catch(err2 => {
            console.log(err2)
            toast({
                title: "Error",
                description: err2.message,
                status: "error",
                duration: 9000,
                isClosable: true,
            })
        }).finally(() => {
            setStartupLoading(false)
        })
    }

    const bgColor = useColorModeValue('white', 'gray.900');
    const buttoncolor = useColorModeValue("gray.100", "gray.500");

    return (
        <>
            <Modal onClose={startupDisclosure.onClose} size={"xl"} isOpen={startupDisclosure.isOpen}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Startup</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Formik
                            initialValues={{
                                title: '',
                                description: '',
                                image: '',
                                // milestone: is array of string
                                milestone: [],
                            }}
                            validationSchema={Yup.object({
                                title: Yup.string().required('Title is required'),
                                description: Yup.string().required('Description is required'),
                                image: Yup.mixed().required('Image is required'),
                            })}

                            onSubmit={(value) => {
                                // add data to appwrite database
                                AddNewStartup(
                                    value.title,
                                    value.description,
                                    value.image,
                                    value.milestone
                                )
                                console.log(value, 'startup form')
                            }}
                        >
                            {(formik) => (
                                <form onSubmit={formik.handleSubmit}>
                                    <Stack spacing={8} mx={'auto'} maxW={'lg'}>
                                        <Stack spacing={4}>
                                            <FormControl
                                                id="title"
                                                isInvalid={!!formik.errors.title && formik.touched.title}
                                            >
                                                <FormLabel>Title</FormLabel>
                                                <Field
                                                    type="text"
                                                    placeholder='Startup Title'
                                                    as={Input}
                                                    {...formik.getFieldProps('title')}
                                                />
                                                <FormErrorMessage >{formik.errors.title}</FormErrorMessage>
                                            </FormControl>
                                            <FormControl
                                                id="description"
                                                isInvalid={!!formik.errors.description && formik.touched.description}
                                            >
                                                <FormLabel>Description</FormLabel>
                                                <Field
                                                    as={Textarea}
                                                    placeholder='Startup Description'
                                                    size='sm'
                                                    {...formik.getFieldProps('description')}
                                                />
                                                <FormErrorMessage>{formik.errors.description}</FormErrorMessage>
                                            </FormControl>
                                            <FormControl
                                                id="image"
                                                isInvalid={!!formik.errors.image && formik.touched.image}
                                            >
                                                <FormLabel>Files</FormLabel>
                                                <Input
                                                    id="uploader"
                                                    accept="image/*"
                                                    type="file"
                                                    sx={{
                                                        "::file-selector-button": {
                                                            height: 10,
                                                            padding: 0,
                                                            mr: 4,
                                                            background: "none",
                                                            border: "none",
                                                            fontWeight: "bold",
                                                        },
                                                    }}
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0];
                                                        formik.setFieldValue('image', file);
                                                    }}
                                                    onBlur={formik.handleBlur('image')}
                                                    isInvalid={Boolean(formik.errors.image && formik.touched.image)}
                                                />
                                                <FormHelperText>Any logo of startup</FormHelperText>
                                            </FormControl>
                                            <FieldArray name="milestone">
                                                {({ push, remove }) => (
                                                    <>
                                                        <Stack spacing={4}>
                                                            {formik.values.milestone.map((milestoneData, index) => (
                                                                <Box key={index} display="flex">
                                                                    <FormControl isInvalid={!!formik.errors.milestone?.[index]}>
                                                                        <FormLabel>Milestone {index + 1}</FormLabel>
                                                                        <Input
                                                                            name={`milestone[${index}]`}
                                                                            value={milestoneData}
                                                                            onChange={formik.handleChange}
                                                                        />
                                                                        <FormErrorMessage>{formik.errors.milestone?.[index]}</FormErrorMessage>
                                                                    </FormControl>
                                                                    <IconButton
                                                                        aria-label="Remove"
                                                                        icon={<CloseIcon />}
                                                                        onClick={() => remove(index)}
                                                                        ml={2}
                                                                    />
                                                                </Box>
                                                            ))}
                                                        </Stack>
                                                        <Button
                                                            mt={4}
                                                            leftIcon={<AddIcon />}
                                                            onClick={() => push('')}
                                                        >
                                                            Add Milestone
                                                        </Button>
                                                    </>
                                                )}
                                            </FieldArray>
                                        </Stack>
                                    </Stack>
                                    <ModalFooter pr="0">
                                        <Button
                                            isLoading={startupLoading}
                                            loadingText="Creating..."
                                            colorScheme='linkedin' type="submit">Submit</Button>
                                    </ModalFooter>
                                </form>
                            )}

                        </Formik>
                    </ModalBody>

                </ModalContent>
            </Modal >
            {/* hackathon */}
            < Modal onClose={HackathonDisclosure.onClose} size={"xl"} isOpen={HackathonDisclosure.isOpen} >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Hackathon Idea</ModalHeader>
                    <ModalCloseButton />
                    <Formik
                        initialValues={{
                            title: '',
                            idea: '',
                            image: '',
                            noOfMembers: 0,
                            link: '',
                        }}
                        validationSchema={Yup.object({
                            title: Yup.string().required('Title is required'),
                            idea: Yup.string().required('Description is required'),
                            image: Yup.string().required('Image is required'),
                            noOfMembers: Yup.number().required('Number of members is required'),
                            link: Yup.string().required('Link is required'),
                        })}

                        onSubmit={(value, action) => {
                            // add data to appwrite database
                            createNewHackathon(
                                value.title,
                                value.idea,
                                value.image,
                                value.noOfMembers,
                                value.link
                            )
                            console.log(value, 'hackathon form')
                            action.resetForm()
                        }}
                    >
                        {(formik) => (
                            <>
                                <form onSubmit={formik.handleSubmit}>
                                    <ModalBody>
                                        <Stack spacing={8} mx={'auto'} maxW={'lg'}>
                                            <Stack spacing={4}>
                                                <FormControl id="title" isInvalid={!!formik.errors.title && formik.touched.title}>
                                                    <FormLabel>Title</FormLabel>
                                                    <Input type="text"
                                                        placeholder='Hackathon Title'
                                                        {...formik.getFieldProps('title')}
                                                    />
                                                    <FormErrorMessage>{formik.errors.title}</FormErrorMessage>
                                                </FormControl>

                                                <FormControl id="idea" isInvalid={!!formik.errors.idea && formik.touched.idea}>
                                                    <FormLabel>Idea</FormLabel>
                                                    <Textarea
                                                        placeholder='Hackathon Idea'
                                                        size='sm'
                                                        {...formik.getFieldProps('idea')}
                                                    />
                                                    <FormErrorMessage>{formik.errors.idea}</FormErrorMessage>
                                                </FormControl>

                                                <FormControl id="link" isInvalid={!!formik.errors.link && formik.touched.link}>
                                                    <FormLabel>Link</FormLabel>
                                                    <Input type="text"
                                                        placeholder='Hackathon Link'
                                                        {...formik.getFieldProps('link')}
                                                    />
                                                    <FormErrorMessage>{formik.errors.link}</FormErrorMessage>
                                                </FormControl>

                                                <FormControl>
                                                    <FormLabel>Files</FormLabel>
                                                    <Input
                                                        id="uploader"
                                                        accept="image/*"
                                                        type="file"
                                                        sx={{
                                                            "::file-selector-button": {
                                                                height: 10,
                                                                padding: 0,
                                                                mr: 4,
                                                                background: "none",
                                                                border: "none",
                                                                fontWeight: "bold",
                                                            },
                                                        }}
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            formik.setFieldValue('image', file);
                                                        }}
                                                        onBlur={formik.handleBlur('image')}
                                                        isInvalid={Boolean(formik.errors.image && formik.touched.image)}
                                                    />
                                                    <FormErrorMessage>{formik.errors.image}</FormErrorMessage>
                                                    <FormHelperText>Any photo of Hackathon</FormHelperText>
                                                </FormControl>
                                                <FormControl>
                                                    <FormLabel>Number of Members</FormLabel>
                                                    <NumberInput
                                                        defaultValue={0}
                                                        max={6}
                                                        min={1}
                                                        keepWithinRange={true}
                                                        clampValueOnBlur={true}
                                                    >
                                                        <NumberInputField
                                                            {...formik.getFieldProps('noOfMembers')}
                                                        />
                                                        <NumberInputStepper>
                                                            <NumberIncrementStepper />
                                                            <NumberDecrementStepper />
                                                        </NumberInputStepper>
                                                        <FormErrorMessage>{formik.errors.noOfMembers}</FormErrorMessage>
                                                    </NumberInput>
                                                </FormControl>
                                            </Stack>
                                        </Stack>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button
                                            type="submit"
                                            isLoading={hackathonLoading}
                                            loadingText="Creating..."
                                            bg={'blue.400'}
                                            color={'white'}
                                            _hover={{
                                                bg: 'blue.500',
                                            }}>
                                            Create
                                        </Button>
                                    </ModalFooter>
                                </form>
                            </>
                        )}
                    </Formik>
                </ModalContent>
            </Modal >


            <Box bg={bgColor} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={profileDisclosure.isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={profileDisclosure.isOpen ? profileDisclosure.onClose : profileDisclosure.onOpen}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <HStack spacing="5">
                            {/* <Text as="b">HustleHub</Text> */}
                            <Link to="/"><Image
                                src="/logo.png"
                                alt="logo"
                                width="8rem"
                                height="auto"
                            /></Link>
                            <Image
                                src="/built-with-appwrite.svg"
                                alt="logo"
                                width="8rem"
                                height="auto"
                            />
                        </HStack>
                    </HStack>
                    <Flex alignItems={'center'} justifyContent={"space-around"}>
                        <HStack
                            as={'nav'}
                            spacing={4}
                            display={{ base: 'none', md: 'flex' }}
                        >
                            {pathname === "/feed" ? <NavLink linktxt={'/'}>Home</NavLink>
                                : <NavLink linktxt={'/feed'}>Feed</NavLink>
                            }
                            {data.$id ?
                                <>
                                    <Box>
                                        <Menu>
                                            <MenuButton
                                                as={Button}
                                                rounded={'full'}
                                                variant={'link'}
                                                cursor={'pointer'}
                                                minW={0}>
                                                <Avatar
                                                    size={'sm'}
                                                    name={data.name}
                                                />
                                            </MenuButton>
                                            <MenuList>
                                                <MenuItem>Logged in as: {role}</MenuItem>
                                                <Link to={`/profile/${data.$id}`}><MenuItem>Profile</MenuItem></Link>
                                                {/* <MenuItem>Link 2</MenuItem> */}
                                                <MenuDivider />
                                                <MenuItem><Button onClick={() => Logout()}>Logout</Button></MenuItem>
                                            </MenuList>
                                        </Menu>
                                    </Box>
                                    {/* new menu */}
                                    <Box>

                                        <Menu>
                                            <MenuButton
                                                as={Button}
                                                rounded={'full'}
                                                variant={'link'}
                                                cursor={'pointer'}
                                                _active={{ bg: buttoncolor }}
                                                minW={0}>
                                                <Flex bg={buttoncolor} p="12px" justifyContent={"center"} alignItems={"center"} rounded="full">
                                                    <Icon as={AddIcon} w="3" h="3" />
                                                </Flex>
                                            </MenuButton>
                                            <MenuList>
                                                <MenuItem as="button" onClick={startupDisclosure.onOpen}>Create Startup Idea</MenuItem>
                                                <MenuItem as="button" onClick={HackathonDisclosure.onOpen}>Create Hackathon Idea</MenuItem>
                                            </MenuList>
                                        </Menu>
                                    </Box>
                                </> :
                                <>
                                    <NavLink linktxt="/login">Login</NavLink>
                                    <NavLink linktxt="/register">Register</NavLink>
                                </>
                            }
                            <ToggleTheme />
                        </HStack>
                        <HStack
                            as={'nav'}
                            spacing={4}
                            display={{ base: 'flex', md: 'none' }}
                        >
                            {data.$id && <Avatar
                                size={'sm'}
                                name={data.name}
                            />}
                            <ToggleTheme />
                        </HStack>
                    </Flex>
                </Flex>

                {profileDisclosure.isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            {data.$id ?
                                <>
                                    <NavLink linktxt="/feed">Feed</NavLink>
                                    <Button onClick={() => Logout()}>Logout</Button>
                                </> :
                                <>
                                    <NavLink linktxt="/login">Login</NavLink>
                                    <NavLink linktxt="/register">Register</NavLink>
                                </>
                            }
                        </Stack>
                    </Box>
                ) : null}
            </Box>
        </>
    )
}

export default Navbar
