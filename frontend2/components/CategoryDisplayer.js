function CategoryDisplayer({category, isSelected, isOwner, onClick, icon, onDelete}) {
    /*
        width: "32px",
        height: "32px",
    */
	const [isOpen, setIsOpen] = React.useState(false)

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
		title: {
			fontSize: "16px",
			color: "#1f2937",

			textOverflow: "ellipsis",
			overflow: "hidden",
			display: "block",
			maxWidth: "140px",
		},
		categoryIcon: {
			height: "20px",
			width: "20px"
		},
		trash: {
			display: "flex",
			alignItems: "center",
			height: "20px",
			width: "20px"
		}
	}

    return (
		<>
			{ isOpen &&
				<DeleteCategoryModal
					category={category}
					isOpen={isOpen}
					onDelete={onDelete}
					onClose={() => setIsOpen(false)}
				/>
			}

			<div style={styles.container}
				 className={`server-container ${isSelected ? "selected" : ""}`}
				 onClick={onClick}
			>
				<div style={styles.titleContainer}>
					<img
						src={icon}
						alt="categoryIcon"
						style={styles.categoryIcon}
					/>

					<div style={styles.title}>
						{category.name}
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
								console.log("Trash clicked!");
								setIsOpen(true)
							}}
						/>
					</div>)
					: null
				}
			</div>
		</>
    )
}