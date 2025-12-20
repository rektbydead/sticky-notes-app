function CreateNewNoteButton({ onClick }) {

	const styles = {
		button: {
			display: "inline-flex",
			alignItems: "center",
			padding: "6px",
			backgroundColor: "transparent",
			borderRadius: "6px",
			fontSize: "14px",
			cursor: "pointer",
			height: "32px",
			color: "black",
			justifyContent: "center",
		},
		icon: {
			width: "20px",
			height: "20px",
			flexShrink: 0,
		},
	};


	return (
        <button style={styles.button} className="create-note-button" data-tooltip="Create new note" onClick={onClick}>
            <img
                style={styles.icon}
                src="../assets/icon/mdiPlus.svg"
                alt="Plus"
            />
        </button>
    );
}