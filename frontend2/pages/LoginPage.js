// import google from "../assets/icon/google.svg"
// import {login, register} from "../services/AuthenticationService.js";

function LoginPage() {
	const { navigate } = useNavigation()
	const { setUserLocalStore } = useAuthentication()

	const [email, setEmail] = React.useState('')
	const [password, setPassword] = React.useState('')
	const [loading, setLoading] = React.useState(false)
	const [error, setError] = React.useState(null)

	const handleSubmit = async (e) => {
		e.preventDefault()
		setError(null)
		setLoading(true)

		try {
			const data = await login(email, password)
			setUserLocalStore(data)
			//setAuthenticationLoading(false)
			console.log("deu login", data)

			navigate('stick-notes', {}, '/stick-notes')
		} catch (e) {
			setError("Login failed")
		} finally {
			setLoading(false)
		}
	}

	return (
		<div style={styles.container}>
			<div style={styles.card}>
				<div style={styles.avatarContainer}>
					<div style={styles.avatar}></div>
				</div>

				<h1 style={styles.title}>Welcome Back</h1>
				<p style={styles.subtitle}>Please sign in to your account</p>

				<form style={styles.form} onSubmit={handleSubmit}>
					<div style={styles.inputGroup}>
						<label style={styles.label}>Email Address</label>
						<input
							type="email"
							placeholder="Enter your email"
							style={styles.input}
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>

					<div style={styles.inputGroup}>
						<input
							type="password"
							placeholder="Enter your password"
							style={styles.input}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>

					{error && (
						<p style={{ color: 'red', fontSize: '14px' }}>
							{error}
						</p>
					)}

					<button
						type="submit"
						style={styles.submitButton}
						disabled={loading}
					>
						{loading ? 'Signing in...' : 'Sign In'}
					</button>
				</form>

				<div style={styles.divider}>
					<span style={styles.dividerText}>Or continue with</span>
				</div>

				<button style={styles.socialButton}>
					<img src="../assets/icon/google.svg" alt="Google Icon" style={styles.icon} />
					Continue with Google
				</button>

				<p style={styles.footer}>
					Don't have an account?{' '}
					<a
						href="/register"
						style={styles.signupLink}
						onClick={(e) => {
							e.preventDefault()
							navigate('register', '/register')
						}}
					>
						Sign up
					</a>
				</p>
			</div>
		</div>
	)
}

const styles = {
	container: {
		width: '100vw',
		height: '100vh',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#f5f5f5',
		padding: '20px',
	},
	card: {
		backgroundColor: 'white',
		borderRadius: '12px',
		padding: '40px 30px',
		width: '100%',
		maxWidth: '400px',
		boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
	},
	avatarContainer: {
		display: 'flex',
		justifyContent: 'center',
		marginBottom: '24px',
	},
	avatar: {
		width: '80px',
		height: '80px',
		borderRadius: '50%',
		backgroundColor: '#cbd5e0',
	},
	title: {
		fontSize: '24px',
		fontWeight: '600',
		textAlign: 'center',
		margin: '0 0 8px 0',
		color: '#1a202c',
	},
	subtitle: {
		fontSize: '14px',
		textAlign: 'center',
		color: '#718096',
		margin: '0 0 32px 0',
	},
	form: {
		display: 'flex',
		flexDirection: 'column',
		gap: '16px',
	},
	inputGroup: {
		display: 'flex',
		flexDirection: 'column',
		gap: '8px',
	},
	label: {
		fontSize: '14px',
		fontWeight: '500',
		color: '#1a202c',
	},
	input: {
		width: '100%',
		padding: '12px 16px',
		border: '1px solid #e2e8f0',
		borderRadius: '8px',
		fontSize: '14px',
		outline: 'none',
		boxSizing: 'border-box',
		transition: 'border-color 0.2s',
		backgroundColor: "#f5f5f5",
		color: "black"
	},
	checkboxRow: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: '4px',
	},
	checkboxLabel: {
		display: 'flex',
		alignItems: 'center',
		gap: '8px',
		cursor: 'pointer',
	},
	checkbox: {
		width: '18px',
		height: '18px',
		cursor: 'pointer',
	},
	checkboxText: {
		fontSize: '14px',
		color: '#1a202c',
	},
	forgotLink: {
		fontSize: '14px',
		color: '#718096',
		textDecoration: 'none',
	},
	submitButton: {
		width: '100%',
		padding: '14px',
		backgroundColor: '#1a202c',
		color: 'white',
		border: 'none',
		borderRadius: '8px',
		fontSize: '15px',
		fontWeight: '500',
		cursor: 'pointer',
		marginTop: '8px',
	},
	divider: {
		display: 'flex',
		alignItems: 'center',
		margin: '24px 0',
		textAlign: 'center',
	},
	dividerText: {
		padding: '0 16px',
		fontSize: '13px',
		color: '#718096',
		backgroundColor: 'white',
		position: 'relative',
		zIndex: 1,
		margin: '0 auto',
	},
	socialButton: {
		width: '100%',
		padding: '12px',
		border: '1px solid #e2e8f0',
		borderRadius: '8px',
		backgroundColor: 'white',
		fontSize: '14px',
		fontWeight: '500',
		color: '#1a202c',
		cursor: 'pointer',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		gap: '10px',
		marginBottom: '12px',
	},
	facebookButton: {
		marginBottom: '0',
	},
	icon: {
		width: '20px',
		height: '20px',
	},
	footer: {
		textAlign: 'center',
		fontSize: '14px',
		color: '#718096',
		marginTop: '24px',
	},
	signupLink: {
		color: '#1a202c',
		textDecoration: 'none',
		fontWeight: '500',
	},
};