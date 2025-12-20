function CreateNewNoteNote({ onClick }) {

	const styles = {
		card: {
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			justifyContent: "center",
			breakInside: "avoid",

			width: "100%",
			aspectRatio: "1/1",
			border: "1px solid var(--border-color)",
			borderRadius: "8px",
			color: "#6b7280",
			backgroundColor: "white"
		},
		icon: {
			width: "40px",
			height: "40px",
		}
	}

	return (
        <div style={styles.card} className="create-card clickable-icon" onClick={onClick}>
            <img
                style={styles.icon}
                src="../assets/icon/mdiPlus.svg"
                alt="Plus"
            />
            <span> Create new note</span>
        </div>
    )
}
