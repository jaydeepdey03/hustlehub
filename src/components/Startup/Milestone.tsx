import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import {
  VStack,
  Heading,
  Box,
  BoxProps,
  Circle,
  Flex,
  useColorModeValue,
  Text,
  Icon,
  Center,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  ModalContent,
  useDisclosure,
  Stack,
  FormControl,
  FormLabel,
  Input,
  IconButton,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { Field, FieldArray, Formik } from "formik";
import * as Yup from "yup";
import { AuthUser, StartupInterface } from "../../types/MyData";
import { useParams } from "react-router-dom";
import { DB } from "../../appwrite/appwrite-config";
import useGlobalState from "../../hooks/useGlobalState";
import { useState } from "react";

interface MilestoneProps {
  milestoneArray: string[];
  startup: StartupInterface;
  user: AuthUser;
}

const Milestones = (props: MilestoneProps) => {
  const { milestoneArray, startup, user } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { id } = useParams();
  const toast = useToast();
  const { setHasCreated } = useGlobalState();
  const [updateMilestoneLoading, setUpdateMilestoneLoading] = useState(false);

  const UpdateMilestone = (milestone: string[]) => {
    setUpdateMilestoneLoading(true);
    if (id) {
      DB.updateDocument("646cfa393629aedbd58f", "646cfa7aa01148c42ebf", id, {
        milestones: milestone,
      })
        .then(() => {
          setHasCreated((prev) => !prev);
        })
        .catch(() => {
          toast({
            title: "Error",
            description: "Error in updating milestone",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        })
        .finally(() => {
          setUpdateMilestoneLoading(false);
          onClose();
        });
    } else {
      console.log("no id");
    }
  };

  // console.log('check', )

  return (
    <>
      <VStack textAlign="start" align="start" mb={5}>
        <Box zIndex={5} w="100%">
          <Heading fontSize="xl" fontWeight="600" mb={10} textAlign={"left"}>
            Milestones achieved so far
          </Heading>
          <Box>
            {milestoneArray && milestoneArray.length === 0 && (
              <Box
                w="100%"
                h="100px"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Text
                  color={"gray.500"}
                  fontSize={"md"}
                  fontWeight={"normal"}
                  textAlign={"center"}
                >
                  No milestones achieved yet
                </Text>
              </Box>
            )}
            {/* milestone is array of string */}
            {milestoneArray &&
              milestoneArray.map((milestone: string) => (
                <MilestoneItem
                  key={milestone}
                  // add skiptrain when index is last
                  skipTrail={
                    milestoneArray.indexOf(milestone) ===
                    milestoneArray.length - 1
                  }
                >
                  <Box mt="1px">{milestone}</Box>
                </MilestoneItem>
              ))}

            {user &&
              startup &&
              (user?.$id === startup?.cofounder ||
                user?.$id === startup?.founder) && (
                <Box
                  w="100%"
                  h="50px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Center
                    h="8"
                    w="8"
                    rounded="full"
                    border={"1px dotted"}
                    onClick={onOpen}
                    cursor={"pointer"}
                  >
                    <Icon as={AddIcon} w={4} h={4} color={"gray.500"} />
                  </Center>
                  <Text
                    color={"gray.500"}
                    fontSize={"md"}
                    fontWeight={"normal"}
                    ml={2}
                  >
                    Add Milestones
                  </Text>
                </Box>
              )}
          </Box>
        </Box>
      </VStack>

      <Modal onClose={onClose} size={"xl"} isCentered isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Milestones</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{ milestone: startup.milestones || [] }}
              validationSchema={Yup.object({
                milestone: Yup.array().of(Yup.string().required("Required")),
              })}
              onSubmit={(values) => {
                UpdateMilestone(values.milestone);
                console.log(values);
              }}
            >
              {(formik) => (
                <form onSubmit={formik.handleSubmit}>
                  <FieldArray name="milestone">
                    {({ push, remove }) => (
                      <>
                        <Stack spacing={4}>
                          {formik.values.milestone.map(
                            (_: string, index: number) => (
                              <Box key={index} display="flex">
                                <FormControl>
                                  <FormLabel>Milestone {index + 1}</FormLabel>
                                  <Flex>
                                    <Field
                                      type="text"
                                      placeholder={`Milestone ${index + 1}`}
                                      as={Input}
                                      {...formik.getFieldProps(
                                        `milestone[${index}]`,
                                      )}
                                    />
                                    <IconButton
                                      aria-label="Remove"
                                      icon={<CloseIcon />}
                                      onClick={() => remove(index)}
                                      ml={2}
                                    />
                                  </Flex>
                                  <FormErrorMessage>
                                    {formik.errors.milestone?.[index]}
                                  </FormErrorMessage>
                                </FormControl>
                              </Box>
                            ),
                          )}
                        </Stack>
                        <Button
                          mt={4}
                          w="full"
                          leftIcon={<AddIcon />}
                          onClick={() => push("")}
                        >
                          Add Milestone
                        </Button>
                      </>
                    )}
                  </FieldArray>
                  <Button
                    colorScheme="messenger"
                    mt={4}
                    w="full"
                    type="submit"
                    isLoading={updateMilestoneLoading}
                  >
                    Update Milestone
                  </Button>
                </form>
              )}
            </Formik>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

interface MilestoneItemProps extends BoxProps {
  boxProps?: BoxProps;
  skipTrail?: boolean;
}

const MilestoneItem: React.FC<MilestoneItemProps> = ({
  boxProps = {},
  skipTrail = false,
  children,
  ...props
}) => {
  const color = useColorModeValue("gray.400", "gray.500");
  return (
    <Flex minH={20} {...props}>
      <Flex flexDir="column" alignItems="center" mr={4} mt="8px" pos="relative">
        <Circle
          size={3}
          bg={useColorModeValue("gray.600", "gray.500")}
          opacity={useColorModeValue(0.07, 0.15)}
        />
        <Box color={color} pos="absolute" left="0.875rem" top="0.875rem" />
        {!skipTrail && <Box w="1px" flex={1} bg={color} />}
      </Flex>
      <Box {...boxProps}>{children}</Box>
    </Flex>
  );
};

export default Milestones;
