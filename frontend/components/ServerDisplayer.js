function ServerDisplayer({title, isSelected, isOwner, onClick, server, onDelete}) {
    const firstLetter = title?.trim()?.charAt(0)?.toUpperCase() || "";
	const [open, setOpen] = React.useState(false);

	const styles = {
		container: {
			display: "flex",
			flexDirection: "row",
			alignItems: "center",

			justifyContent: "space-between",
			gap: "0.5rem",
			paddingLeft: "0.25rem",
			paddingTop: "0.25rem",
			paddingBottom: "0.25rem"
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
		title: {
			fontSize: "16px",
			color: "#1f2937",

			textOverflow: "ellipsis",
			overflow: "hidden",
			display: "block",
			maxWidth: "140px",
		},
		trash: {
			display: "flex",
			alignItems: "center",
			height: "22.5px",
			width: "20px"
		}
	}

    return (
		<>
			{ open &&
				<DeleteServerModal
					isOpen={open}
					onClose={() => setOpen(false)}
					isSelected={isSelected}
					server={server}
					onDelete={onDelete}
				/>
			}

			<div style={styles.container}
				 className={`server-container ${isSelected ? "selected" : ""}`}
				 onClick={onClick}
			>
				<div style={styles.titleContainer}>
					<div style={{...styles.avatar, background: isOwner ? "#3b82f6" : "#22c55e"}}>
						{firstLetter}
					</div>

					<div style={styles.title}>
						{title}
					</div>
				</div>

				{isOwner ?
					(<div style={styles.trash}>
						<img
							src="../assets/icon/mdiTrash.svg"
							alt="Trash"
							className="clickable-icon"
							onClick={(e) => {
								e.stopPropagation();
								setOpen(true);
								console.log("Trash clicked!");
							}}
						/>
					</div>)
					: null
				}
			</div>
		</>
    )
}