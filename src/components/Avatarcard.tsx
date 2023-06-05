import { useEffect } from "react"
import { SDK } from "../appwrite/appwrite-config"

interface AvatarProps {
    id: string
}

const Avatarcard = ({ id }: AvatarProps) => {
    useEffect(() => {
        SDK.get().then(res => {

        }).catch(err => console.log(err))
    }, [])
    return (
        <div>

        </div>
    )
}

export default Avatarcard
