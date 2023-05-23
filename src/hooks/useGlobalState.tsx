import { Context } from "../context/AuthContext"
import { useContext } from "react"
const useGlobalState = () => {
    return useContext(Context)
}

export default useGlobalState
