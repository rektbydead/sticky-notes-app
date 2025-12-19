import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {NavigationProvider} from "./context/NavigateContext.jsx";
import {AuthenticationProvider} from "./context/AuthenticationContext.jsx";

createRoot(document.getElementById('root')).render(
    <AuthenticationProvider>
        <NavigationProvider>
            <App />
        </NavigationProvider>
    </AuthenticationProvider>
)
