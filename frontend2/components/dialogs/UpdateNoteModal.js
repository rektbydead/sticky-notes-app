function UpdateNoteModal({ note, category, isOpen, onClose, onAction }) {
	const [title, setTitle] = React.useState(note.title);
	const [content, setContent] = React.useState(note.content)

	async function handleSubmit(e) {
		e.preventDefault()
		await updateNote(note._id, title, content, category._id)
		onAction()
		onClose()
	}

	function handleClose() {
		onClose()
	}

	return (
		<>
			<Modal isOpen={isOpen} onClose={handleClose} title={`Update Note (${note.title})`}>
				<form style={styles.form} onSubmit={handleSubmit}>
					<div style={styles.inputGroup}>
						<label style={styles.label}>Note Title</label>
						<input
							placeholder="Enter note title"
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							style={styles.input}
						/>
					</div>

					<div style={styles.inputGroup}>
						<label style={styles.label}>Content</label>
						<textarea
							placeholder="Enter note content..."
							value={content}
							onChange={(e) => setContent(e.target.value)}
							style={styles.textarea}
							rows={6}
						/>
					</div>

					<div style={styles.footer}>
						<button type="button" onClick={handleClose} style={styles.cancelButton}>
							Cancel
						</button>
						<button type="submit" style={styles.submitButton}>
							Update note
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
	textarea: {
		width: '100%',
		padding: '10px 12px',
		border: '1px solid #d1d5db',
		backgroundColor: 'white',
		color: "black",
		borderRadius: '6px',
		fontSize: '14px',
		boxSizing: 'border-box',
		outline: 'none',
		resize: 'none',
		fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
		minHeight: '400px',
		maxHeight: '400px',
	}
}