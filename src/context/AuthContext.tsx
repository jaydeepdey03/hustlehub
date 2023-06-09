import { createContext, ReactNode, useState } from 'react'
import { DB, SDK } from '../appwrite/appwrite-config';
import { AppwriteException } from 'appwrite'
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

interface AuthContextProps {
    Login: (email: string, password: string) => void,
    Register: (firstName: string, lastName: string, email: string, password: string) => void,
    ForgotPassword: (email: string) => void,
    Logout: () => void,
    loading: boolean,
    hasCreated: boolean,
    setHasCreated: (updateFunction: (prevHasCreated: boolean) => boolean) => void;
}
export const Context = createContext<AuthContextProps>({
    Login: () => {
        console.log("login")
    },
    Register: () => {
        console.log("register")
    },
    ForgotPassword: () => {
        console.log("forgot password")
    },
    Logout: () => {
        console.log("logout")
    },
    loading: false,
    hasCreated: false,
    setHasCreated: () => {
        console.log("set has created")
    }
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

    function generateUniqueId() {
        const timestamp = new Date().getTime().toString(36);
        const randomString = Math.random().toString(36).substring(2, 15);
        const uniqueId = timestamp + randomString;
        return uniqueId;
    }


    const Register = async (firstName: string, lastName: string, email: string, password: string) => {
        setLoading(true)
        try {
            const name = `${firstName} ${lastName}`
            const userid = generateUniqueId()
            const data = await SDK.create(userid, email, password, name);
            DB.createDocument('646cfa393629aedbd58f', '646edbd8de898ccf87c5', userid, {
                name: data.name,
                email: data.email,
                id: userid,
                role: 'user',
            }).then(res => console.log(res)).catch(err => console.error(err))

            // can't do this no smtp server
            // SDK.createVerification('http://localhost:5173/login').then((res) => {
            //     toast({
            //         title: "Verification email sent.",
            //         description: "We've sent you a verification email.",
            //         status: "success",
            //         duration: 9000,
            //     })
            //     console.log(res)
            // }).catch(err => {
            //     toast({
            //         title: "An error occurred.",
            //         description: err.message,
            //         status: "error",
            //         duration: 9000,
            //         isClosable: true,
            //     })
            // })
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
            toast({
                title: "Recovery email sent.",
                description: "We've sent you a recovery email.",
                status: "success",
                duration: 9000,
                isClosable: true,
            })
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

    const [hasCreated, setHasCreated] = useState(false)

    return (
        <Context.Provider value={{ loading, Login, Register, ForgotPassword, Logout, hasCreated, setHasCreated }}>
            {children}
        </Context.Provider>
    )
}

export default AuthContextProvider
