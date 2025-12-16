import { createContext, useContext, useEffect, useState } from 'react'
import {getMe} from "../services/AuthenticationService.js";

const AuthenticationContext = createContext(null)

export function AuthenticationProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)
	const [user, setUser] = useState(true)

    async function checkAuth() {
        try {
            const { user } = await getMe()
			setUser(user)
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

    if (loading) {
        return null
    }

    return (
        <AuthenticationContext.Provider value={{ isAuthenticated, loading, setIsAuthenticated, checkAuth, user }}>
            {children}
        </AuthenticationContext.Provider>
    )
}

export function useAuthentication() {
    return useContext(AuthenticationContext)
}