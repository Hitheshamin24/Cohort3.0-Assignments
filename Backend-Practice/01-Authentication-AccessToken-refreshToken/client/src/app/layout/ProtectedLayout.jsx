import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router"

const ProtectedLayout = () => {
    const { accessToken } = useSelector((state) => state.auth)
    if (!accessToken)
        return <Navigate to={"/"} />
    return (
        <div><Outlet/></div>
    )
}

export default ProtectedLayout