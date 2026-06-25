import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import{GoogleOAuthProvider} from '@react-oauth/google'
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID
const cliendID="888222132863-4qsri9farnjk3nunbla6f29jkrqpg0n4.apps.googleusercontent.com";

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <GoogleOAuthProvider clientId={cliendID}>
     <BrowserRouter>
    
     <App />
     
     </BrowserRouter>
     </GoogleOAuthProvider>
    
  </StrictMode>,
)
