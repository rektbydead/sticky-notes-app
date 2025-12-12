import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {NavigationProvider} from "./NavigateContext.jsx";

createRoot(document.getElementById('root')).render(
  <NavigationProvider>
    <App />
  </NavigationProvider>,
)
