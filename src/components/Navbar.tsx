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
    Text,
} from '@chakra-ui/react';
import {
    HamburgerIcon,
    CloseIcon,
    AddIcon,
    // AddIcon
} from '@chakra-ui/icons';
import ToggleTheme from './Toggletheme';
import useGlobalState from '../hooks/useGlobalState';
import { DB, SDK } from '../appwrite/appwrite-config';
import { Link, useLocation } from 'react-router-dom';
import { Field, FieldArray, Formik } from 'formik';
import * as Yup from 'yup';
import { AppwriteException, ID, Permission, Role } from 'appwrite';

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
    const [loading, setLoading] = useState(false)
    const { Logout } = useGlobalState()
    const { pathname } = useLocation()
    const [data, setData] = useState({} as any)
    const profileDisclosure = useDisclosure();
    const startupDisclosure = useDisclosure();
    const HackathonDisclosure = useDisclosure();
    // console.log(location, 'location')
    const [role, setRole] = useState('' as any)
    const [startupLoading, setStartupLoading] = useState(false)

    useEffect(() => {
        SDK.get().then((res) => {
            // fetch the user using logged in user id
            DB.getDocument('646cfa393629aedbd58f', '646edbd8de898ccf87c5', res.$id).then(result => {
                setRole(result.role)
            }).catch(err => console.log(err))
            setData(res)
        }).catch(() => {
        })
    }, [])

    const AddNewStartup = async (title: string, description: string, milestones: string[] | any) => {
        setStartupLoading(true)
        DB.createDocument("646cfa393629aedbd58f", "646cfa7aa01148c42ebf", ID.unique(), {
            title: title,
            idea: description,
            // image: image,
            founder: data.$id,
        }).then(res => {
            DB.listDocuments("646cfa393629aedbd58f", "646cfa7aa01148c42ebf")
                .then((res) => {
                    // Update the startup collection state with the fetched data
                    // setStartupCollection(res.documents);
                })
                .catch((err) => {
                    console.log(err);
                    startupDisclosure.onClose()
                });
        }).catch((err: unknown) => {
            const appwriteexception = err as AppwriteException
            console.log(appwriteexception.message)
        }).finally(() => {
            setStartupLoading(false)
        })
    }

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
                                image: Yup.string().required('Image is required'),
                            })}

                            onSubmit={(value, action) => {
                                // add data to appwrite database
                                // AddNewStartup(
                                //     value.title,
                                //     value.description,
                                // )
                                console.log(value, 'startup form')
                                action.resetForm()
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
                                                    {...formik.getFieldProps('image')}
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
                                            loadingText="Submitting..."
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
                        }}
                        validationSchema={Yup.object({
                            title: Yup.string().required('Title is required'),
                            idea: Yup.string().required('Description is required'),
                            image: Yup.string().required('Image is required'),
                            noOfMembers: Yup.number().required('Number of members is required'),
                        })}

                        onSubmit={(value, action) => {
                            // add data to appwrite database
                            setLoading(true);

                            setTimeout(() => {
                                setLoading(false);
                                HackathonDisclosure.onClose();
                            }, 2000);

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

                                                    <Textarea
                                                        placeholder='Hackathon Idea'
                                                        size='sm'
                                                        {...formik.getFieldProps('idea')}
                                                    />
                                                    <FormErrorMessage>{formik.errors.idea}</FormErrorMessage>
                                                </FormControl>
                                                <FormControl>
                                                    <FormLabel>Files</FormLabel>
                                                    <Input
                                                        type="file"
                                                        multiple
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
                                                        {...formik.getFieldProps('image')}
                                                    />
                                                    <FormErrorMessage>{formik.errors.image}</FormErrorMessage>
                                                    <FormHelperText>Any photo of Hackathon</FormHelperText>
                                                </FormControl>
                                                <FormControl>
                                                    <FormLabel>Number of Members</FormLabel>
                                                    <NumberInput
                                                        defaultValue={0}
                                                        max={6}
                                                        keepWithinRange={false}
                                                        clampValueOnBlur={false}
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
                                            isLoading={loading}
                                            loadingText="Submitting..."
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


            <Box bg={useColorModeValue('gray.50', 'gray.900')} shadow={"xs"} px={4}>
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
                            <Text as="b">HustleHub</Text>
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
                                                <MenuItem><Link to={`/profile/${data.$id}`}>Profile</Link></MenuItem>
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
                                                _active={{ bg: useColorModeValue("gray.100", "gray.500") }}
                                                minW={0}>
                                                <Flex bg={useColorModeValue("gray.100", "gray.500")} p="12px" justifyContent={"center"} alignItems={"center"} rounded="full">
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
