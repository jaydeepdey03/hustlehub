import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SDK } from '../appwrite/appwrite-config';

export default function ResetPassword(): JSX.Element {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const location = useLocation();
    const recoveryToken = new URLSearchParams(location.search).get('token');


    const handleResetPassword = async () => {

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // SDK.updateRecovery()
    };

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack
                spacing={4}
                w={'full'}
                maxW={'md'}
                bg={useColorModeValue('white', 'gray.700')}
                rounded={'xl'}
                boxShadow={'lg'}
                p={6}
                my={12}>
                <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
                    Enter new password
                </Heading>
                <Formik
                    initialValues={{ password: '', confirmPassword: '' }}
                    validationSchema={Yup.object({
                        password: Yup.string().required('Required').min(6, 'Password is too short - should be 6 chars minimum.'),
                    })}
                    onSubmit={
                        (value, action) => {

                        }
                    }
                >
                    {formik => (
                        <>
                            <FormControl id="password" isRequired>
                                <FormLabel>Password</FormLabel>
                                <Input
                                    placeholder="your-email@example.com"
                                    _placeholder={{ color: 'gray.500' }}
                                    type="password"
                                />
                            </FormControl>
                            <FormControl id="confirmpassword" isRequired>
                                <FormLabel>Confirm Password</FormLabel>
                                <Input type="password" />
                            </FormControl>
                            <Stack spacing={6}>
                                <Button
                                    type="submit"
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}>
                                    Submit
                                </Button>
                            </Stack>
                        </>
                    )}
                </Formik>

            </Stack>
        </Flex>
    );
}