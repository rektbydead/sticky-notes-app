function DeleteNoteModal ({ isOpen, onClose, children, maxWidth = '500px', note, onDelete }) {
	const [showToast, setShowToast] = React.useState(false)

	async function handleSubmit(e) {
		e.preventDefault()
		await deleteNote(note?._id)
		setShowToast(true)
		onDelete()
		onClose()
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
			backgroundColor: '#f9fafb',
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
	}

	return (
		<>
			{showToast &&
				<Toast
					message={`Note ${note?.title} deleted successfully.`}
					onClose={() => setShowToast(false)}
				/>
			}

			<Modal isOpen={isOpen} onClose={handleClose} title={`Delete note "${note?.title}"`}>
				<form style={styles.form} onSubmit={handleSubmit}>
					<div style={styles.inputGroup}>
						Are you sure you want to permanently delete the {note?.title} Note?
						<br/>
						<span style={{color: "red"}}> This action cannot be undone.</span>
					</div>

					<div style={styles.footer}>
                        <div style={{display: "flex", marginBottom: "0.5rem", justifyContent: "end", flexDirection: "column", gap: "0.5rem"}}>
                            <button type="submit" style={styles.cancelButton}>
                                Delete note
                            </button>
                            <button type="button" onClick={handleClose} style={styles.submitButton}>
                                Cancel
                            </button>
                        </div>

                        <div style={{ maxWidth:'450px', minWidth:'450px'  }}>
                            <Note note={note} showIcons={false} style={{height: "100%"}} isBeingDeleted={true}/>
                        </div>
					</div>
				</form>
			</Modal>
		</>
	)
}