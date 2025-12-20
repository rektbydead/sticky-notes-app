const NavigationContext = React.createContext(null)

function NavigationProvider({ children }) {
    const [page, setPage] = React.useState(
        window.history.state?.page || 'login'
    )

	React.useEffect(() => {
        const handlePopState = (event) => {
            setPage(event.state?.page || 'login')
        }

        window.addEventListener('popstate', handlePopState)
        return () => window.removeEventListener('popstate', handlePopState)
    }, [])

    const navigate = (page, data, path) => {
        window.history.pushState({ page, data }, '')
        setPage(page)
    }

    return (
        <NavigationContext.Provider value={{ page, navigate }}>
            {children}
        </NavigationContext.Provider>
    )
}

function useNavigation() {
    return React.useContext(NavigationContext)
}