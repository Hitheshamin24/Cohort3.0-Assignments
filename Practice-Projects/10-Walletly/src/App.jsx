import { BrowserRouter } from "react-router"
import AppRoutes from "./routes/AppRoutes"
import useLocalStorageSync from "./hooks/useLocalStorageSync"

// hook yahan call — puri app ke liye ek baar
const AppContent = () => {
  useLocalStorageSync()
  return <AppRoutes />
}

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
