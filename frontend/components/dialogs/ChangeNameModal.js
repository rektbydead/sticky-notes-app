function ChangeNameDialog({ isOpen, onClose, children, maxWidth = '500px' }) {
	const { user, setUserLocalStore } = useAuthentication()
	const [newName, setNewName] = React.useState(user.name)
	const [showToast, setShowToast] = React.useState(false)

	async function handleSubmit(e) {
		e.preventDefault()
		const oldName = user.name
		const data = await changeName(newName, user.email)
		setUserLocalStore(data)
		setShowToast(true)
		setTimeout(() => { changeServerUserName(oldName, newName), 500 })
		onClose()
	}

	async function changeServerUserName(oldName, newName) {
		const element = document.querySelector(`.name[data-oldname="${oldName}"]`);
		if (element) {
			element.textContent = newName;
			element.dataset.oldname = newName;
		}
	}

	function handleClose() {
		onClose()
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

	return (
		<>
			{showToast && (
				<Toast
					message="Name changed successfully."
					onClose={() => setShowToast(false)}
				/>
			)}

			<Modal isOpen={isOpen} onClose={handleClose} title={"Change Name"}>
				<form style={styles.form} onSubmit={handleSubmit}>
					<div style={styles.inputGroup}>
						<label style={styles.label}>Name</label>
						<input
							type="text"
							placeholder={"Name ..."}
							value={newName}
							onChange={(e) => setNewName(e.target.value)}
							style={styles.input}
						/>
					</div>

					<div style={styles.footer}>
						<button type="button" onClick={handleClose} style={styles.cancelButton}>
							Cancel
						</button>
						<button type="submit" style={styles.submitButton}>
							Change Name
						</button>
					</div>
				</form>
			</Modal>
		</>
	)
}