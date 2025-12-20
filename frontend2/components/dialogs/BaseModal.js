function Modal({ title, isOpen, onClose, children, maxWidth = '500px' }) {
	if (!isOpen) return null

	const styles = {
		modalOverlay: {
			position: 'fixed',
			inset: 0,
			zIndex: 9999,
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			padding: '16px'
		},
		backdrop: {
			position: 'absolute',
			inset: 0,
			backgroundColor: 'rgba(0, 0, 0, 0.5)',
		},
		modalContent: {
			position: 'relative',
			backgroundColor: 'white',
			borderRadius: '8px',
			boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
			width: '100%',
			maxWidth: '600px',
		},
		header: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-between',
			padding: '20px',
			borderBottom: '1px solid #e5e7eb'
		},
		title: {
			fontSize: '20px',
			fontWeight: '600',
			margin: 0,
			color: '#111827'
		},
		closeButton: {
			backgroundColor: 'transparent',
			border: 'none',
			fontSize: '24px',
			color: '#6b7280',
			cursor: 'pointer',
			padding: '0',
			lineHeight: '1'
		},
		footer: {
			display: 'flex',
			gap: '12px',
			marginTop: '20px'
		},
		cancelButton: {
			flex: 1,
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
			flex: 1,
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
		<div style={styles.modalOverlay}>
			<div style={styles.backdrop} onClick={onClose} />
			<div style={styles.modalContent}>
				<div style={styles.header}>
					<h2 style={styles.title}> { title } </h2>
					<button onClick={onClose} style={styles.closeButton}>
						✕
					</button>
				</div>
				{children}
			</div>
		</div>
	)
}