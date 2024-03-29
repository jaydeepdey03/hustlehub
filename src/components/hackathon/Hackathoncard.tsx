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
} from "@chakra-ui/react";
import Profilecard from "../../pages/Profilecard";
import { Link } from "react-router-dom";
import { AuthUser, HackathonInterface } from "../../types/MyData";
interface HackathoncardProps {
  document: HackathonInterface;
  details: AuthUser;
}

const Hackathoncard = (props: HackathoncardProps) => {
  const { document } = props;
  console.log(document, "doc, props");
  const hackathonDisclosure = useDisclosure();
  const participantsBorder = useColorModeValue("gray", "white");
  const headingColor = useColorModeValue("gray.700", "white");

  return (
    <>
      <Center py={6}>
        <Stack
          direction={{ base: "column", md: "row" }}
          maxW={"5xl"}
          w={"5xl"}
          minH={{ base: "100%", lg: "350px" }}
          bg={useColorModeValue("white", "gray.900")}
          // border
          border={"2px solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          rounded={"md"}
          overflow={"hidden"}
        >
          <Image
            // width={'30%'}
            width={{ base: "100%", md: "30%" }}
            p="3"
            src={
              document.image
                ? document.image
                : "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            }
            // fill
            objectFit={"contain"}
          />
          <Stack p="6" spacing={6} w="100%">
            <Stack>
              <Heading
                color={headingColor}
                fontSize={"2xl"}
                fontFamily={"body"}
              >
                {document.title}
              </Heading>
              <Box minH="7rem" minW={{ base: "xs", md: "lg" }}>
                <Box alignItems={"center"}>
                  <Text fontSize={"sm"}>Hackathon Idea</Text>
                  <Text>{document.idea}</Text>
                </Box>
              </Box>
            </Stack>
            <Profilecard
              userId={document.creator}
              created={true}
              details={true}
            />
            <Flex justifyContent={"space-between"}>
              <Stack spacing={3}>
                <Text fontWeight={600} fontSize="xs">
                  Participants{" "}
                  <chakra.span fontWeight={"normal"}>
                    (Max: {document.noOfMembers})
                  </chakra.span>
                </Text>

                <AvatarGroup size="sm" max={3}>
                  {document.members.length !== 0 ? (
                    <>
                      {document?.members?.map((member: string) => (
                        <Profilecard
                          userId={member}
                          created={false}
                          details={false}
                          key={member}
                        />
                      ))}
                    </>
                  ) : (
                    <Text fontSize="sm" color={participantsBorder}>
                      No Participants yet
                    </Text>
                  )}
                </AvatarGroup>
              </Stack>
              {/* Button */}
              <HStack mt="6" alignItems={"center"}>
                <Button
                  colorScheme="telegram"
                  size={"sm"}
                  as={Link}
                  to={`/hackathon/${document.$id}`}
                  state={{ documentId: document.$id }}
                >
                  Check out
                </Button>
              </HStack>
            </Flex>
          </Stack>
        </Stack>
      </Center>

      <Modal
        onClose={hackathonDisclosure.onClose}
        size={"xl"}
        isOpen={hackathonDisclosure.isOpen}
        isCentered
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Startup Name</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <Stack>
                <Text fontWeight={"bold"} fontSize={"md"}>
                  {document.title}
                </Text>
                <Text>{document.idea}</Text>
              </Stack>
              <HStack spacing={"4"} pl="4">
                <Box>
                  <Heading mb="3" size="sm">
                    Founder <span>{}</span>{" "}
                  </Heading>
                  <HStack>
                    <Avatar
                      size={"sm"}
                      name={"Dan Abramov"}
                      src={"https://bit.ly/dan-abramov"}
                    />
                    <Text
                      fontSize={"sm"}
                      color={useColorModeValue("gray", "white")}
                    ></Text>
                  </HStack>
                </Box>
              </HStack>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={hackathonDisclosure.onClose}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Hackathoncard;
