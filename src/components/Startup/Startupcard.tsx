import { Avatar, Box, Button, Card, CardBody, CardFooter, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, HStack, Heading, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, Textarea, useColorModeValue, useDisclosure } from "@chakra-ui/react"
import Milestones from "./Milestone"
import { Field, FieldArray, Formik } from 'formik';
import * as Yup from 'yup';
import { useRef } from "react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import { DB, storage } from "../../appwrite/appwrite-config";
import { ID } from "appwrite";
import { Link } from "react-router-dom";
import Profilecard from "../../pages/Profilecard";

const Startupcard = (props: any) => {
    const { document, details, role, joinStartup, index, joinLoading } = props
    const learnMoreDisclosure = useDisclosure()
    const updateDisclosure = useDisclosure()
    const fileRef = useRef<HTMLInputElement | null>(null);

    const uploadImage = async (fileObj: any) => {
        try {
            console.log(fileObj, 'fileObj')
            const res = await storage.createFile("647a464fabf94fdc2ebf", ID.unique(), fileObj)
            return res;
        } catch (err) {
            console.log(err)
        }
    }

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

    // console.log(document, 'startup card')

    return (
        <>
            <Box key={index}>
                <Modal onClose={learnMoreDisclosure.onClose} size={"xl"} isOpen={learnMoreDisclosure.isOpen} isCentered scrollBehavior="inside">
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
                                        <Heading mb='3' size='sm'>Founder </Heading>
                                        <HStack>
                                            <Avatar size={"sm"} name={"Dan Abramov"} src={"https://bit.ly/dan-abramov"} />
                                            <Text fontSize={"sm"} color={useColorModeValue('gray',
                                                'white')}>
                                                {/* put user name */}
                                                {document.founder} {document.founder === details.$id && '(You)'}</Text>
                                        </HStack>
                                    </Box>
                                    {document.cofounder !== null && <Box>
                                        <Heading mb='3' size='sm'>Co-Founder</Heading>
                                        <HStack>
                                            <Avatar size="sm" name='Ryan Florence' src='https://bit.ly/ryan-florence' />
                                            <Text fontSize={"sm"} color={useColorModeValue('gray', 'white')}>{
                                                document.cofounder
                                            }</Text>
                                        </HStack>
                                    </Box>}
                                </HStack>

                                <Stack spacing={"5"}>
                                    <Text m="1" fontWeight={"semibold"} fontSize={"md"}>Milestones</Text>
                                    <Milestones milestoneArray={document.milestones} />
                                </Stack>
                            </Stack>
                        </ModalBody>
                        <ModalFooter justifyContent={"space-between"}>


                        </ModalFooter>
                    </ModalContent>
                </Modal>
                <Card
                    direction={{ base: 'column', xl: 'row' }}
                    overflow='hidden'
                    variant='outline'
                >
                    <Image
                        objectFit='cover'
                        maxW={{ base: '100%', xl: '200px' }}
                        maxH={{ base: '200px', xl: '100%' }}
                        m="4"
                        src={document.image != null ? document.image : 'https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'}
                        alt='Caffe Latte'
                    />

                    <Stack w="full">
                        <CardBody>
                            <Stack>
                                <Heading size='md'>{document.title}</Heading>
                                <Box minH="7rem" minW={{ base: "xs", md: "lg" }}>
                                    <Box alignItems={"center"}>
                                        <Text fontSize={"sm"}>Startup Idea</Text>
                                        <Text fontSize="md" noOfLines={4} minW={{ base: "xs", md: "lg" }}>
                                            {document.idea}
                                        </Text>
                                    </Box>
                                </Box>
                            </Stack>
                        </CardBody>
                        <Stack direction={{ base: "column", lg: "row" }} spacing={"10"} pl='4'>
                            <Box>
                                <Heading mb='3' size='sm' fontWeight={"semibold"}>Founder </Heading>
                                <Profilecard userId={document.founder} created={false} details={true} />
                            </Box>
                            {document.cofounder !== null && <Box>
                                <Heading mb='3' size='sm' fontWeight={"semibold"}>Co-Founder</Heading>
                                <Profilecard userId={document.cofounder} created={false} details={true} />
                            </Box>}
                        </Stack>

                        <CardFooter justifyContent={"space-between"}>
                            <Flex direction={"column"}>
                                <Text fontSize={"xs"} color={useColorModeValue('gray.800', 'gray.400')}>
                                    Created at
                                </Text>
                                <Text
                                    fontSize={"sm"}
                                    color={useColorModeValue('gray.800', 'gray.400')}
                                >
                                    {new Date(document.$createdAt).toLocaleDateString('en-us', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })  
                                    }
                                </Text>
                            </Flex>
                            {/* {role === 'investor' && <Button colorScheme="telegram">Fund</Button>} */}
                            <Button
                                // onClick={learnMoreDisclosure.onOpen}
                                as={Link}
                                state={{ documentId: document.$id, role: role }}
                                to={`/startup/${document.$id}`}
                                variant='solid' colorScheme='telegram' size="sm">
                                Learn More
                            </Button>
                        </CardFooter>

                    </Stack>
                </Card>
            </Box>

            <Modal onClose={updateDisclosure.onClose} size={"xl"} isOpen={updateDisclosure.isOpen}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Startup</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Formik
                            initialValues={{
                                title: document.title || '',
                                description: document.idea || '',
                                image: document.image || '',
                                milestone: document.milestones || [],
                            }}
                            validationSchema={Yup.object({
                                title: Yup.string().required('Title is required'),
                                description: Yup.string().required('Description is required'),
                                image: Yup.string().required('Image is required'),
                                milestone: Yup.array().of(Yup.string().required('Milestone is required')),
                            })}

                            onSubmit={(value, action) => {
                                // add data to appwrite database
                                UpdateStartup(
                                    value.title,
                                    value.description,
                                    value.image,
                                    value.milestone
                                )
                                console.log(value, 'updated form')
                                action.resetForm()
                            }}
                        >
                            {(formik) => (
                                <form onSubmit={formik.handleSubmit}>
                                    <Stack spacing={8} mx={'auto'} maxW={'lg'}>
                                        <Stack spacing={4}>
                                            <FormControl
                                                id="title"
                                                isInvalid={Boolean(formik.errors.title && formik.touched.title)}
                                            >
                                                <FormLabel>Title</FormLabel>
                                                <Field
                                                    type="text"
                                                    placeholder='Startup Title'
                                                    as={Input}
                                                    {...formik.getFieldProps('title')}
                                                />
                                                <FormErrorMessage>{String(formik.errors.title)}</FormErrorMessage>
                                            </FormControl>
                                            <FormControl
                                                id="description"
                                                isInvalid={Boolean(formik.errors.description && formik.touched.description)}
                                            >
                                                <FormLabel>Description</FormLabel>
                                                <Field
                                                    as={Textarea}
                                                    placeholder='Startup Description'
                                                    size='sm'
                                                    {...formik.getFieldProps('description')}
                                                />
                                                <FormErrorMessage>{String(formik.errors.description)}</FormErrorMessage>
                                            </FormControl>
                                            <FormControl
                                                id="image"
                                                isInvalid={Boolean(formik.errors.image && formik.touched.image)}
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
                                                <FormErrorMessage>{String(formik.errors.image)}</FormErrorMessage>

                                                <FormHelperText>Any logo of startup</FormHelperText>
                                            </FormControl>
                                            <FieldArray name="milestone">
                                                {({ push, remove }) => (
                                                    <>
                                                        <Stack spacing={4}>
                                                            {formik.values.milestone.map((data: string, index: number) => (
                                                                <Box key={index} display="flex">
                                                                    <FormControl
                                                                        isInvalid={formik.errors.milestone?.[index] && formik.touched.milestone?.[index]}
                                                                    >
                                                                        <FormLabel>Milestone {index + 1}</FormLabel>
                                                                        <Flex>
                                                                            <Field
                                                                                type="text"
                                                                                placeholder={`Milestone ${index + 1}`}
                                                                                as={Input}
                                                                                {...formik.getFieldProps(`milestone[${index}]`)}
                                                                            />
                                                                            <IconButton
                                                                                aria-label="Remove"
                                                                                icon={<CloseIcon />}
                                                                                onClick={() => remove(index)}
                                                                                ml={2}
                                                                            />
                                                                        </Flex>
                                                                        <FormErrorMessage>{formik.errors.milestone?.[index]}</FormErrorMessage>
                                                                    </FormControl>
                                                                </Box>
                                                            ))}
                                                        </Stack>
                                                        <Button mt={4} leftIcon={<AddIcon />} onClick={() => push('')}>
                                                            Add Milestone
                                                        </Button>
                                                    </>
                                                )}
                                            </FieldArray>

                                        </Stack>
                                    </Stack>
                                    <ModalFooter pr="0">
                                        <Button
                                            // isLoading={startupLoading}
                                            loadingText="Submitting..."
                                            colorScheme='linkedin' type="submit">Submit</Button>
                                    </ModalFooter>
                                </form>
                            )}

                        </Formik>
                    </ModalBody>

                </ModalContent>
            </Modal >
        </>
    )
}

export default Startupcard
