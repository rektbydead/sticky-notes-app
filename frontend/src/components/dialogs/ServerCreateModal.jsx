import {useState} from "react";
import Modal from "./BaseModal.jsx";
import {createServer} from "../../services/ServerService.js";
import animatedLoadingSvg from "../../assets/icon/mdiServer.svg";
import mdiPlug from "../../assets/icon/mdiPlug.svg";


export default function ServerCreateModal({ isOpen, onClose, onServerCreated }) {
	const [name, setName] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [error, setError] = useState('')

	async function handleSubmit(e) {
		e.preventDefault()
		setError('')

		if (name.length === 0) {
			setError('Name cannot be empty')
			return
		}

		if (password.length === 0) {
			setError('Password cannot be empty')
			return
		}

		if (password !== confirmPassword) {
			setError('Passwords do not match')
			return
		}

		try {
			await createServer(name, password, false)
			await onServerCreated()
			onClose()
		} catch(e) {
			console.log(e)
			setError('Something went wrong.')
		}
	}

	function handleClose() {
		onClose()
	}

	return (
		<>
			<Modal isOpen={isOpen} onClose={handleClose} title={"Create personal server"}>
				<div style={styles.iconContainer}>
					<div style={styles.iconWrapper}>
						<img src={animatedLoadingSvg} style={{ height: "50px" }} alt="loading image" />
					</div>
				</div>

				<form style={styles.form} onSubmit={handleSubmit}>
					<div style={styles.inputGroup}>
						<label style={styles.label}>Server Name</label>
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder={"Enter server name"}
							style={styles.input}
						/>
					</div>

					<div style={styles.inputGroup}>
						<label style={styles.label}>Password</label>
						<input
							type="text"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder={"Enter server password"}
							style={styles.input}
						/>
					</div>

					<div style={styles.inputGroup}>
						<label style={styles.label}>Confirm Password</label>
						<input
							type="text"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							placeholder={"Enter server password"}
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
							<img src={mdiPlug} style={{ width: "20px" }} alt="loading image" />
							Create server
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
		backgroundColor: 'transparent',
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
		border: '1px solid #f1f2f3',
		backgroundColor: 'transparent',
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
	iconContainer: {
		marginTop: '16px',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	iconWrapper: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',

		width: '75px',
		height: '75px',

		backgroundColor: 'var(--inside-color)',
		borderRadius: '8px',
	}
}