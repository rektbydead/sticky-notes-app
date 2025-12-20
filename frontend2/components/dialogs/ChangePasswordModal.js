function ChangePasswordDialog ({ isOpen, onClose, children, maxWidth = '500px' }) {
	const { user } = useAuthentication()
	const [oldPassword, setOldPassword] = React.useState('')
	const [newPassword, setNewPassword] = React.useState('')
	const [confirmPassword, setConfirmPassword] = React.useState('')
	const [error, setError] = React.useState('')
	const [showToast, setShowToast] = React.useState(false)

	async function handleSubmit(e) {
		e.preventDefault()
		setError('')

		if (newPassword !== confirmPassword) {
			setError('Passwords do not match')
			return
		}

		try {
			await changePassword(oldPassword, newPassword, user._id)
			setShowToast(true)
			onClose()
		} catch(e) {
			setError('Current password is wrong.')
		}
	}

	function handleClose() {
		onClose()
	}

	return (
		<>
			{showToast && (
				<Toast
					message="Password changed successfully."
					onClose={() => setShowToast(false)}
				/>
			)}

			<Modal isOpen={isOpen} onClose={handleClose} title={"Change Password"}>
				<form style={styles.form} onSubmit={handleSubmit}>
					<div style={styles.inputGroup}>
						<label style={styles.label}>Current Password</label>
						<input
							type="password"
							placeholder={"Current Password ..."}
							value={oldPassword}
							onChange={(e) => setOldPassword(e.target.value)}
							style={styles.input}
						/>
					</div>

					<div style={styles.inputGroup}>
						<label style={styles.label}>New Password</label>
						<input
							type="password"
							placeholder={"New Password ..."}
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
							style={styles.input}
						/>
					</div>

					<div style={styles.inputGroup}>
						<label style={styles.label}>Confirm New Password</label>
						<input
							type="password"
							placeholder={"Confirm New Password ..."}
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							style={styles.input}
						/>
					</div>

					{error && (
						<p style={styles.error}>{error}</p>
					)}

					<div style={styles.footer}>
						<button type="button" onClick={handleClose} style={styles.cancelButton}>
							Cancel
						</button>
						<button type="submit" style={styles.submitButton}>
							Change Password
						</button>
					</div>
				</form>
			</Modal>
		</>
	)
}

const styles = {
	form: {
		padding: '20px'
	},
	inputGroup: {
		marginBottom: '16px'
	},
	label: {
		display: 'block',
		fontSize: '14px',
		fontWeight: '500',
		color: '#111827',
		marginBottom: '6px'
	},
	input: {
		width: '100%',
		padding: '10px 12px',
		fontSize: '14px',
		border: '1px solid #d1d5db',
		borderRadius: '6px',
		backgroundColor: 'white',
		boxSizing: 'border-box',
		outline: 'none',
		color: "black"
	},
	error: {
		color: 'red',
		fontSize: '14px',
		margin: '0 0 16px 0'
	},
	footer: {
		display: 'flex',
		justifyContent: 'end',
		gap: '12px',
		marginTop: '20px',
	},
	cancelButton: {
		padding: '10px 16px',
		fontSize: '14px',
		fontWeight: '500',
		color: '#374151',
		backgroundColor: '#f3f4f6',
		border: 'none',
		borderRadius: '6px',
		cursor: 'pointer'
	},
	submitButton: {
		display: 'flex',
		flexDirection: 'row',
		padding: '10px 16px',
		fontSize: '14px',
		fontWeight: '500',
		color: 'white',
		backgroundColor: '#3b82f6',
		border: 'none',
		borderRadius: '6px',
		cursor: 'pointer'
	},
}