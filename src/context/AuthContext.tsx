import { createContext, ReactNode, useState } from 'react'
import { SDK } from '../appwrite/appwrite-config';
import { AppwriteException, ID } from 'appwrite'
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

interface AuthContextProps {
    Login: (email: string, password: string) => void,
    Register: (firstName: string, lastName: string, email: string, password: string) => void,
    ForgotPassword: (email: string) => void,
    Logout: () => void,
    loading: boolean,
}
export const Context = createContext<AuthContextProps>({
    Login: () => { },
    Register: () => { },
    ForgotPassword: () => { },
    Logout: () => { },
    loading: false,
})



const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const toast = useToast()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    

    const Login = (email: string, password: string) => {
        setLoading(true)
        SDK.createEmailSession(email, password).then(() => {
            toast({
                title: "Login Successful",
                description: "Logged in",
                status: "success",
                duration: 9000,
                isClosable: true,
            })
            navigate('/feed')
            setLoading(false)
        }).catch((err: unknown) => {
            const appwriteexception = err as AppwriteException
            toast({
                title: "An error occurred.",
                description: appwriteexception.message,
                status: "error",
                duration: 9000,
                isClosable: true,
            })
            console.log(appwriteexception.message)
            setLoading(false)
        }).finally(() => {
            setLoading(false)
        })
    }

    const Register = async (firstName: string, lastName: string, email: string, password: string) => {
        setLoading(true)
        try {
            const name = `${firstName} ${lastName}`
            const data = await SDK.create(ID.unique(), email, password, name);

            // can't do this no smtp server
            SDK.createVerification('http://localhost:5173/login').then((res) => {
                toast({
                    title: "Verification email sent.",
                    description: "We've sent you a verification email.",
                    status: "success",
                    duration: 9000,
                })
                console.log(res)
            }).catch(err => {
                toast({
                    title: "An error occurred.",
                    description: err.message,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                })
            })
            navigate('/login')
            // toast({
            //     title: "Registration Successful",
            //     description: "Registered",
            //     status: "success",
            //     duration: 9000,
            //     isClosable: true,
            // })
            setLoading(false)
        } catch (err: unknown) {
            const appwriteexception = err as AppwriteException
            toast({
                title: "An error occurred.",
                description: appwriteexception.message,
                status: "error",
                duration: 9000,
                isClosable: true,
            })
            console.log(appwriteexception.message)
            setLoading(false)
        }
    }


    // can't implement no smtp server
    const ForgotPassword = async (email: string) => {
        SDK.createRecovery(email, "http://localhost:5173/reset").then(() => {

        }).catch((err: unknown) => {
            const appwriteexception = err as AppwriteException
            toast({
                title: "An error occurred.",
                description: appwriteexception.message,
                status: "error",
                duration: 9000,
                isClosable: true,
            })
            console.log(appwriteexception.message)
        })
    }

    // logout
    const Logout = () => {
        SDK.deleteSession('current').then(() => {
            toast({
                title: "Logout Successful",
                description: "Logged out",
                status: "success",
                duration: 9000,
                isClosable: true,
            })
            setLoading(false)
            navigate('/login')
        }).catch((err: unknown) => {
            const appwriteexception = err as AppwriteException
            toast({
                title: "An error occurred.",
                description: appwriteexception.message,
                status: "error",
                duration: 9000,
                isClosable: true,
            })
            console.log(appwriteexception.message)
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <Context.Provider value={{ loading, Login, Register, ForgotPassword, Logout }}>
            {children}
        </Context.Provider>
    )
}

export default AuthContextProvider
