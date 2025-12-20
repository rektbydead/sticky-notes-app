import { createContext, useContext, useEffect, useState } from 'react'

const AuthenticationContext = createContext(null)

export function AuthenticationProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(false)
	const [user, setUser] = useState(null)

    // async function checkAuth() {
    //     try {
    //         const { user } = await getMe()
	// 		setUser(user)
    //         setIsAuthenticated(true)
    //     } catch {
    //         setIsAuthenticated(false)
    //     } finally {
    //         setLoading(false)
    //     }
    // }

	useEffect(() => {
		const userItem = JSON.parse(localStorage.getItem('user'))
		console.log(userItem)
		setUser(userItem ?? null)
	}, [])

	useEffect(() => {
		setIsAuthenticated(user !== null)
	}, [user])

	function setUserLocalStore(user) {
		setUser(user)
		localStorage.setItem('user', JSON.stringify(user))
	}

	function logout() {
		localStorage.setItem('user', null)
		setUser(null)
	}

    if (loading) {
        return null
    }

    return (
        <AuthenticationContext.Provider value={{ logout, isAuthenticated, loading, setLoading, setIsAuthenticated, setUserLocalStore, user }}>
            {children}
        </AuthenticationContext.Provider>
    )
}

export function useAuthentication() {
    return useContext(AuthenticationContext)
}