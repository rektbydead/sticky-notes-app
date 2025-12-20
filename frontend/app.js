function App() {
    const { page, navigate } = useNavigation()
    const { isAuthenticated } = useAuthentication()

    // If not authenticated, only allow login/register pages
    if (!isAuthenticated && page !== 'login' && page !== 'register') {
        console.log(isAuthenticated, page)
        return null;
    }

    switch (page) {
        case 'login':
            return <LoginPage />;
        case 'register':
            return <RegisterPage />;
        case 'stick-notes':
            return isAuthenticated ? <StickyNotePage /> : <LoginPage />;
        default:
            return <LoginPage />;
    }
}

ReactDOM.createRoot(document.getElementById('root')).render(
	<AuthenticationProvider>
		<NavigationProvider>
			<App />
		</NavigationProvider>
	</AuthenticationProvider>
)
