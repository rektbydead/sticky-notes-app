function DeleteAllNotesModal({ isOpen, onClose, onConfirm, serverId, userId }) {
	const [showToast, setShowToast] = React.useState(false)

	async function handleSubmit(e) {
		e.preventDefault()
		await onConfirm(serverId, userId);
		setShowToast(true)
		onClose()
	}

	if (!isOpen) return null;

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
		footer: {
			display: 'flex',
			justifyContent: "end",
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
			justifyContent: 'center',
			padding: '10px 16px',
			fontSize: '14px',
			fontWeight: '500',
			color: 'white',
			backgroundColor: '#3b82f6',
			border: 'none',
			borderRadius: '6px',
			cursor: 'pointer'
		},
	};

	if (!isOpen) return null;

	return (
		<>
			{showToast &&
				<Toast
					message={`All Notes deleted successfully.`}
					onClose={() => setShowToast(false)}
				/>
			}

			<div onMouseDown={(e) => e.stopPropagation()}>
				<Modal isOpen={isOpen} onClose={handleClose} title="Delete all notes">
					<form style={styles.form} onSubmit={handleSubmit}>
						<div style={styles.inputGroup}>
							Are you sure you want to permanently delete <strong>all notes</strong> from this user?
							<br />
							<span style={{ color: 'red' }}> This action cannot be undone.</span>
						</div>

						<div style={styles.footer}>
							<button type="submit" style={styles.cancelButton}>
								Delete all notes
							</button>
							<button type="button" onClick={handleClose} style={styles.submitButton}>
								Cancel
							</button>
						</div>
					</form>
				</Modal>
			</div>
		</>
	);
}