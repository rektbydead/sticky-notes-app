import { createContext, useContext, useEffect, useState } from 'react'
import {getMe} from "../services/AuthenticationService.js";

const AuthenticationContext = createContext(null)

export function AuthenticationProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)

    async function checkAuth() {
        try {
            await getMe()
            setIsAuthenticated(true)
        } catch {
            setIsAuthenticated(false)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        checkAuth()
    }, [])

    return (
        <AuthenticationContext.Provider value={{ isAuthenticated, loading, setIsAuthenticated }}>
            {children}
        </AuthenticationContext.Provider>
    )
}

export function useAuthentication() {
    return useContext(AuthenticationContext)
}