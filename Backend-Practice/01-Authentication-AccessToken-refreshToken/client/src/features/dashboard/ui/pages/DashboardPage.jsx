import { useSelector } from "react-redux"
import { useAuthHook } from "../../../auth/hooks/useAuthHook"
import { useEffect } from "react"

const DashboardPage = () => {
    const user = useSelector((state) => state.auth)
    console.log(user)
    const { fetchProfile } = useAuthHook()
    useEffect(() => {
        fetchProfile()

    }, [user.accessToken])
    return (
        <div><h1>Hello {"  "}
            <span className="text-blue-950 font-bold">{user.user?.userName[0].toUpperCase() + user.user?.userName.slice(1).toLowerCase()}</span>

        </h1></div>
    )
}

export default DashboardPage