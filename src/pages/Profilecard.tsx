import { Avatar, Stack, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { DB } from "../appwrite/appwrite-config"

const Profilecard = (props: any) => {
    const { userId, created, details } = props
    const [user, setUser] = useState({} as any)
    useEffect(() => {
        if(userId){
            DB.getDocument('646cfa393629aedbd58f', '646edbd8de898ccf87c5', userId).then(res => {
                setUser(res)
            }
            ).catch(err => console.log(err))
        }
    }, [userId])

    if(details===false) return (
        <Avatar name={user.name} size={"sm"} />
    )
    else return (
        <Stack direction={'row'} spacing={4} align={'center'}>
            <Avatar
                // src={'https://avatars0.githubusercontent.com/u/1164541?v=4'}
                name={user.name}
            />
            <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                {created && <Text fontSize={"xs"} fontWeight={300}>Created by</Text>}
                <Text fontWeight={600}>{user.name}</Text>
                <Text color={'gray.500'}>{user.email}</Text>
            </Stack>
        </Stack>
    )
}

export default Profilecard
