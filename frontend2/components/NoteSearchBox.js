function NoteSearchBox({ onSearch }) {

	const styles = {
		wrapper: {
			display: "flex",
			alignItems: "center",
			gap: "8px",
			padding: "6px 8px",
			borderRadius: "6px",
			border: "1px solid var(--border-color)",
			backgroundColor: "var(--inside-color)",
			color: "black",
		},
		icon: {
			width: "18px",
			height: "18px",
			opacity: 0.6,
		},
		input: {
			border: "none",
			outline: "none",
			width: "100%",
			fontSize: "14px",
			color: "black",
			backgroundColor: "var(--inside-color)",
		},
	};


	return (
        <div style={styles.wrapper} className="search-expand">
            <img src="../assets/icon/mdiMagnify.svg" alt="Search" style={styles.icon} />

            <input
                type="text"
                placeholder="Search notes..."
                style={styles.input}
                onChange={(e) => onSearch(e.target.value)}
            />
        </div>
    );
}