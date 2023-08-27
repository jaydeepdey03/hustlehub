import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Textarea,
  UseDisclosureReturn,
} from "@chakra-ui/react";
import { Formik } from "formik";
import * as Yup from "yup";
import { HackathonInterface } from "../types/MyData";

interface UpdateHackathonModalProps {
  hackathon: HackathonInterface;
  updateHackathonDisclosure: UseDisclosureReturn;
  UpdateHackathon: (
    title: string,
    description: string,
    image: File | string,
    noOfMembers: number,
    link: string,
    docId: string,
  ) => void;
  UpdateHackathonLoading: boolean;
}

const UpdateHackathonModal = (props: UpdateHackathonModalProps) => {
  const {
    hackathon,
    updateHackathonDisclosure,
    UpdateHackathon,
    UpdateHackathonLoading,
  } = props;
  console.log(hackathon, "hackathon from modal");
  return (
    <Modal
      onClose={updateHackathonDisclosure.onClose}
      size={"xl"}
      isOpen={updateHackathonDisclosure.isOpen}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Hackathon Idea</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={{
            title: hackathon.title || "",
            idea: hackathon.idea || "",
            image: "",
            noOfMembers: hackathon.noOfMembers || 0,
            link: hackathon.link || "",
          }}
          validationSchema={Yup.object({
            title: Yup.string().required("Title is required"),
            idea: Yup.string().required("Description is required"),
            image: Yup.string().required("Image is required"),
            noOfMembers: Yup.number().required("Number of members is required"),
            link: Yup.string().required("Link is required"),
          })}
          onSubmit={(value) => {
            // add data to appwrite database
            UpdateHackathon(
              value.title,
              value.idea,
              value.image,
              value.noOfMembers,
              value.link,
              hackathon?.$id,
            );
            console.log(value, "hackathon form");
            // action.resetForm()
          }}
        >
          {(formik) => (
            <>
              <form onSubmit={formik.handleSubmit}>
                <ModalBody>
                  <Stack spacing={8} mx={"auto"} maxW={"lg"}>
                    <Stack spacing={4}>
                      <FormControl
                        id="title"
                        isInvalid={Boolean(
                          !!formik.errors.title && formik.touched.title,
                        )}
                      >
                        <FormLabel>Title</FormLabel>
                        <Input
                          type="text"
                          placeholder="Hackathon Title"
                          {...formik.getFieldProps("title")}
                        />
                        <FormErrorMessage>
                          {String(formik.errors.title)}
                        </FormErrorMessage>
                      </FormControl>

                      <FormControl
                        id="idea"
                        isInvalid={Boolean(
                          !!formik.errors.idea && formik.touched.idea,
                        )}
                      >
                        <FormLabel>Idea</FormLabel>
                        <Textarea
                          placeholder="Hackathon Idea"
                          size="sm"
                          {...formik.getFieldProps("idea")}
                        />
                        <FormErrorMessage>
                          {String(formik.errors.idea)}
                        </FormErrorMessage>
                      </FormControl>

                      <FormControl
                        id="link"
                        isInvalid={Boolean(
                          !!formik.errors.link && formik.touched.link,
                        )}
                      >
                        <FormLabel>Link</FormLabel>
                        <Input
                          type="text"
                          placeholder="Hackathon Link"
                          {...formik.getFieldProps("link")}
                        />
                        <FormErrorMessage>
                          {String(formik.errors.link)}
                        </FormErrorMessage>
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
                            formik.setFieldValue("image", file);
                          }}
                          onBlur={formik.handleBlur("image")}
                          isInvalid={Boolean(
                            formik.errors.image && formik.touched.image,
                          )}
                        />
                        <FormErrorMessage>
                          {formik.errors.image}
                        </FormErrorMessage>
                        <FormHelperText>Any photo of Hackathon</FormHelperText>
                      </FormControl>
                      <FormControl>
                        <FormLabel>Number of Members</FormLabel>
                        <NumberInput
                          value={formik.values.noOfMembers}
                          max={6}
                          min={1}
                          keepWithinRange={true}
                          clampValueOnBlur={true}
                          onChange={(value) =>
                            formik.setFieldValue("noOfMembers", value)
                          }
                        >
                          <NumberInputField
                            {...formik.getFieldProps("noOfMembers")}
                          />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                          <FormErrorMessage>
                            {String(formik.errors.noOfMembers)}
                          </FormErrorMessage>
                        </NumberInput>
                      </FormControl>
                    </Stack>
                  </Stack>
                </ModalBody>
                <ModalFooter>
                  <Button
                    type="submit"
                    isLoading={UpdateHackathonLoading}
                    loadingText="Updating..."
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                  >
                    Create
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
};

export default UpdateHackathonModal;
