import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Formik } from "formik";
import * as Yup from "yup";

export default function ResetPassword(): JSX.Element {
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
          Enter new password
        </Heading>
        <Formik
          initialValues={{ password: "", confirmPassword: "" }}
          validationSchema={Yup.object({
            password: Yup.string()
              .required("Required")
              .min(6, "Password is too short - should be 6 chars minimum."),
          })}
          onSubmit={(value, action) => {
            console.log(value);
            action.resetForm();
          }}
        >
          {(formik) => (
            <>
              <form onSubmit={formik.handleSubmit}>
                <FormControl
                  id="password"
                  isRequired
                  isInvalid={
                    !!formik.errors.password && formik.touched.password
                  }
                >
                  <FormLabel>Password</FormLabel>
                  <Input
                    placeholder="your-email@example.com"
                    _placeholder={{ color: "gray.500" }}
                    type="password"
                  />
                  <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                </FormControl>
                <FormControl id="confirmpassword" isRequired>
                  <FormLabel>Confirm Password</FormLabel>
                  <Input type="password" />
                </FormControl>
                <Stack spacing={6}>
                  <Button
                    type="submit"
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                  >
                    Submit
                  </Button>
                </Stack>
              </form>
            </>
          )}
        </Formik>
      </Stack>
    </Flex>
  );
}
