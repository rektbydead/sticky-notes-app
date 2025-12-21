function UserDisplayer({name, description, isOwner, onClick, hasMenu = true, menuComponent}) {
    const [menuOpen, setMenuOpen] = React.useState(false)
    const triggerRef = React.useRef(null)
    const firstLetter = name?.trim()?.charAt(0)?.toUpperCase() || ""

    const handleMenuClick = (e) => {
        e.stopPropagation();
        setMenuOpen(!menuOpen);
    }

	const styles = {
		container: {
			display: "flex",
			flexGrow: 1,
			flexDirection: "row",
			alignItems: "center",

			justifyContent: "space-between",
			gap: "0.5rem",
			paddingLeft: "0.25rem",
			paddingTop: "0.25rem",
			paddingBottom: "0.25rem",
		},
		titleContainer: {
			display: "flex",
			alignItems: "center",
			gap: "0.5rem"
		},
		avatar: {
			width: "32px",
			height: "32px",
			borderRadius: "50%",
			background: "#22c55e",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			color: "white",
			fontWeight: 700,
			fontSize: "0.9rem",
		},
		menuIcon: {
			position: 'relative',
			width: "20px",
			height: "20px"
		},
		title: {
			display: "flex",
			flexDirection: "column",
			lineHeight: "1.25",
			textOverflow: "ellipsis",
			overflow: "hidden",
			maxWidth: "140px",
		},
		name: {
			fontSize: "14px",
			color: "#1f2937",
		},
		email: {
			fontSize: "10px",
			color: "#6b7280",
		}
	}

    return (
        <div style={styles.container} onClick={onClick}>
            <div style={styles.titleContainer}>
                <div style={{...styles.avatar, background: isOwner ? "#6366f1" : "#22c55e"}}>
                    {firstLetter}
                </div>

                <div style={styles.title}>
                    <span className='name' data-oldname={name} style={styles.name}>{name}</span>
                    <span style={styles.email}>{description}</span>
                </div>
            </div>

            {hasMenu && menuComponent && (
                <div style={styles.menuIcon}>
                    <img
                        ref={triggerRef}
                        src="../assets/icon/mdiDotsVertical.svg"
                        alt="Menu"
                        className="clickable-icon"
                        onClick={handleMenuClick}
                    />

                    {menuComponent(menuOpen, () => setMenuOpen(false), triggerRef)}
                </div>
            )}
        </div>
    );
}