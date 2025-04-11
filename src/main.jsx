import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { CookiesProvider } from 'react-cookie'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster />
    <CookiesProvider>
    <App />
    </CookiesProvider>
  </StrictMode>,
)
