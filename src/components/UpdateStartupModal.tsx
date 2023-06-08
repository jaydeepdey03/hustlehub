import { AddIcon, CloseIcon } from "@chakra-ui/icons"
import { Box, Button, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Textarea, useDisclosure } from "@chakra-ui/react"
import { Field, FieldArray, Formik } from "formik"
import * as Yup from 'yup'

const UpdateStartupModal = (props:any) => {
    const { document, updateDisclosure } = props
    return (
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
                            // UpdateStartup(
                            //     value.title,
                            //     value.description,
                            //     value.image,
                            //     value.milestone
                            // )
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
    )
}

export default UpdateStartupModal
