import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { URLProvider } from './context/urlContext.jsx'

createRoot(document.getElementById('root')).render(
  <URLProvider>
    <App />
  </URLProvider>
)
