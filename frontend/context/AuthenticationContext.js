const AuthenticationContext = React.createContext(null)

function AuthenticationProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
	const [user, setUser] = React.useState(null)

	React.useEffect(() => {
		const userItem = JSON.parse(localStorage.getItem('user'))
		console.log(userItem)
		setUser(userItem ?? null)
	}, [])

	React.useEffect(() => {
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

function useAuthentication() {
    return React.useContext(AuthenticationContext)
}