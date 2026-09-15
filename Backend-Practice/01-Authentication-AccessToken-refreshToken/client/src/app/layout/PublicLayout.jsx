import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router"

const PublicLayout = () => {
    const {accessToken}=useSelector((state)=>state.auth)
    if(accessToken)
        return <Navigate to={"/profile"}/>
  return (
    <div><Outlet/></div>
  )
}

export default PublicLayout