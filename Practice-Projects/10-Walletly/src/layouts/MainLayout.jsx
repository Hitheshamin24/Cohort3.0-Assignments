import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import { Outlet } from "react-router"

const MainLayout = () => {
  return (
    <div className="flex h-screen bg-bg overflow-hidden">

      <Sidebar />

      <div className="flex flex-col flex-1 min-w-0">
        <Navbar />

        <main className="flex-1 overflow-y-auto p-6 min-h-0">
          <Outlet />
        </main>
      </div>

    </div>
  )
}

export default MainLayout
