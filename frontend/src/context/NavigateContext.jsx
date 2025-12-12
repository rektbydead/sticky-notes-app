import { createContext, useContext, useEffect, useState } from 'react'

const NavigationContext = createContext(null)

export function NavigationProvider({ children }) {
    const [page, setPage] = useState(
        window.history.state?.page || 'login'
    )

    useEffect(() => {
        const handlePopState = (event) => {
            setPage(event.state?.page || 'login')
        }

        window.addEventListener('popstate', handlePopState)
        return () => window.removeEventListener('popstate', handlePopState)
    }, [])

    const navigate = (page, data, path) => {
        window.history.pushState({ page, data }, '', path)
        setPage(page)
    }

    return (
        <NavigationContext.Provider value={{ page, navigate }}>
            {children}
        </NavigationContext.Provider>
    )
}

export function useNavigation() {
    return useContext(NavigationContext)
}