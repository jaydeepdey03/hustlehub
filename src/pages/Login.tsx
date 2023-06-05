import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import useGlobalState from '../hooks/useGlobalState';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SDK } from '../appwrite/appwrite-config';
import { Link } from 'react-router-dom';
// import { useState } from 'react'

export default function Login() {

  const { Login, loading } = useGlobalState()
  const params = useParams()
  const toast = useToast()
  const [data, setData] = useState({} as any)

  const navigate = useNavigate()

  useEffect(() => {
    SDK.get().then((res) => {
      setData(res)
      navigate('/feed')
      toast({
        title: "You're already logged in",
        description: "You're already logged in",
        status: "success",
        duration: 9000,
        isClosable: true,
      })
    }).catch(() => {
    })
  }, [])

  // useEffect(() => {
  //   // get secret parameter from url if it exists
  //   if (params.secret) {
  //     SDK.get().then((res) => {
  //       SDK.updateVerification(res.$id, params.secret!).then(() => {
  //         // toast success email verified
  //         toast({
  //           title: "Email Verified",
  //           description: "Your email has been verified",
  //           status: "success",
  //           duration: 9000,
  //           isClosable: true,
  //         })
  //       }).catch(() => {
  //         // toast error email not verified
  //         toast({
  //           title: "Email Not Verified",
  //           description: "Your email has not been verified",
  //           status: "error",
  //           duration: 9000,
  //           isClosable: true,
  //         })
  //       })
  //     })

  //     // toast success email verified
  //   }
  // }, [params])


  return (
    <Flex
      h={'100vh'}
      w={'100vw'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>


          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={
              Yup.object({
                email: Yup.string().required("email required").email(),
                password: Yup.string().required("Password Required").min(6, "Minimum 6 Character needed")
              })
            }

            onSubmit={(value, action) => {
              Login(value.email, value.password)
              action.resetForm()
            }}
          >
            {formik => (
              <>
                <form onSubmit={formik.handleSubmit}>
                  <Stack spacing={4}>
                    <FormControl id="email" isInvalid={!!formik.errors.email && formik.touched.email}>
                      <FormLabel>Email address</FormLabel>
                      <Field as={Input}
                        name={'email'}
                        placeholder="Enter your email"
                      />
                      <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                    </FormControl>
                    <FormControl id="password" isInvalid={!!formik.errors.password && formik.touched.password}>
                      <FormLabel>Password</FormLabel>
                      <Field
                        as={Input}
                        type="password"
                        name={'password'}
                        placeholder='Enter your password'
                      />
                      <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                    </FormControl>
                    <Stack spacing={10}>
                      <Stack
                        direction={{ base: 'column', sm: 'row' }}
                        align={'start'}
                        justify={'space-between'}>
                        <Link to="/register">

                          <Text color={'blue.400'}>New User?</Text>
                        </Link>
                        <Link to="/forgotpassword">
                          <Text color={'blue.400'}>Forgot Password</Text>
                        </Link>
                      </Stack>
                      {/* submit button */}
                      <Button
                        type="submit"
                        isLoading={loading}
                        loadingText="Submitting..."
                        bg={'blue.400'}
                        color={'white'}
                        _hover={{
                          bg: 'blue.500',
                        }}>
                        Sign in
                      </Button>
                    </Stack>
                  </Stack>
                </form>
              </>
            )}
          </Formik>

          {/* form */}
        </Box>
      </Stack>
    </Flex>
  );
}