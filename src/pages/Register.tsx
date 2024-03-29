import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import useGlobalState from "../hooks/useGlobalState";
import { SDK } from "../appwrite/appwrite-config";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const { Register, loading } = useGlobalState();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    SDK.get()
      .then(() => {
        navigate("/feed");
        toast({
          title: "You're already logged in",
          description: "You're already logged in",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch(() => {
        console.log("Not logged in");
      });
  }, [navigate, toast]);

  return (
    <Flex
      h={"100vh"}
      overflowX={"hidden"}
      w={"100vw"}
      // mt="32"
      alignItems={"center"}
      justifyContent={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Heading textAlign={"center"} fontSize={"4xl"}>
          Sign up for an account
        </Heading>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              twitterLink: "",
              linkedinLink: "",
            }}
            validationSchema={Yup.object({
              firstName: Yup.string().required("First name is required"),
              lastName: Yup.string().required("Last name is required"),
              email: Yup.string()
                .email("Invalid email address")
                .required("Email is required"),
              password: Yup.string()
                .required("Password is required")
                .min(6, "Password is too short - should be 6 chars minimum"),
              twitterLink: Yup.string().url("Invalid URL"),
              linkedinLink: Yup.string().url("Invalid URL"),
            })}
            onSubmit={(value, action) => {
              Register(
                value.firstName,
                value.lastName,
                value.email,
                value.password,
                value.twitterLink,
                value.linkedinLink,
              );
              action.resetForm();
            }}
          >
            {(formik) => (
              <form onSubmit={formik.handleSubmit}>
                <Stack spacing={4}>
                  <HStack>
                    <Box>
                      <FormControl
                        id="firstName"
                        isRequired
                        isInvalid={
                          !!formik.errors.firstName && formik.touched.firstName
                        }
                      >
                        <FormLabel>First Name</FormLabel>
                        <Field
                          as={Input}
                          type="text"
                          name="firstName"
                          placeholder="First Name"
                        />
                        <FormErrorMessage>
                          {formik.errors.firstName}
                        </FormErrorMessage>
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl
                        id="lastName"
                        isInvalid={
                          !!formik.errors.lastName && formik.touched.lastName
                        }
                      >
                        <FormLabel>Last Name</FormLabel>
                        <Field
                          as={Input}
                          type="text"
                          name="lastName"
                          placeholder="Last Name"
                        />
                        <FormErrorMessage>
                          {formik.errors.lastName}
                        </FormErrorMessage>
                      </FormControl>
                    </Box>
                  </HStack>
                  <FormControl
                    id="email"
                    isRequired
                    isInvalid={!!formik.errors.email && formik.touched.email}
                  >
                    <FormLabel>Email address</FormLabel>
                    <Field
                      type="email"
                      as={Input}
                      name="email"
                      placeholder="Email"
                    />
                    <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                  </FormControl>
                  <FormControl
                    id="password"
                    isRequired
                    isInvalid={
                      !!formik.errors.password && formik.touched.password
                    }
                  >
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                      <Input
                        placeholder="Password"
                        type={showPassword ? "text" : "password"}
                        {...formik.getFieldProps("password")}
                      />
                      <InputRightElement h={"full"}>
                        <Button
                          variant={"ghost"}
                          onClick={() =>
                            setShowPassword((showPassword) => !showPassword)
                          }
                        >
                          {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {formik.errors.password}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    id="twitterLink"
                    isRequired
                    isInvalid={
                      !!formik.errors.twitterLink && formik.touched.twitterLink
                    }
                  >
                    <FormLabel>Your Twitter Profile</FormLabel>
                    <Field
                      type="text"
                      as={Input}
                      name="twitterLink"
                      placeholder="your twitter link.."
                    />
                    <FormErrorMessage>
                      {formik.errors.twitterLink}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    id="email"
                    isRequired
                    isInvalid={
                      !!formik.errors.linkedinLink &&
                      formik.touched.linkedinLink
                    }
                  >
                    <FormLabel>Your Linkedin Profile</FormLabel>
                    <Field
                      type="text"
                      as={Input}
                      name="linkedinLink"
                      placeholder="your linkedin link.."
                    />
                    <FormErrorMessage>
                      {formik.errors.linkedinLink}
                    </FormErrorMessage>
                  </FormControl>
                  <Stack spacing={10} pt={2}>
                    <Button
                      type="submit"
                      isLoading={loading}
                      loadingText="Submitting..."
                      size="lg"
                      bg={"blue.400"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500",
                      }}
                    >
                      Sign up
                    </Button>
                  </Stack>
                  <Stack pt={6}>
                    <Text align={"center"}>
                      Already a user?{" "}
                      <Link to="/login">
                        <Text color={"blue.400"}>Login</Text>
                      </Link>
                    </Text>
                  </Stack>
                </Stack>
              </form>
            )}
          </Formik>
        </Box>
      </Stack>
    </Flex>
  );
}
