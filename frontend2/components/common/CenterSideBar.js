function CenterSideBar({title, server, category, notes, refetchNotes, refetchServers}) {
	const [openCreateNoteModal, setOpenCreateNoteModal] = React.useState(false)
	const [searchValue, setSearchValue] = React.useState("")
    const [now, setNow] = React.useState(Date.now())

	const isArchivedCategory = category?.name === "Archived" && category?.is_default

    /* note filtering example for future*/
    const filteredNotes = notes?.filter((note) => searchValue.trim().length === 0
        || note.title.toLowerCase().includes(searchValue.toLowerCase())
        || note.content.toLowerCase().includes(searchValue.toLowerCase())
    ) ?? []

    React.useEffect(() => {
        const interval = setInterval(() => {
            setNow(Date.now())
        }, 1000)

        return () => clearInterval(interval);
    }, []);

    return (
		<>
			{ openCreateNoteModal &&
				<>
					<CreateNoteModal
						isOpen={openCreateNoteModal}
						onClose={() => setOpenCreateNoteModal(false)}
						server={server}
						category={category}
						onAction={refetchNotes}
					/>
				</>
			}

			<div style={styles.sidebar}>
				<div style={styles.sidebarTop}>
					<span style={styles.sidebarTopTitle}> {title} </span>

					<div style={styles.sidebarTopCreateButton}>
						{isArchivedCategory === false &&
							<CreateNewNoteButton
								server={server}
								category={category}
								onAction={refetchNotes}
								onClick={() => {
									setOpenCreateNoteModal(true)
								}}
							/>
						}
						<NoteSearchBox onSearch={setSearchValue}/>
					</div>
				</div>

				<div style={styles.sidebarBottom}>
					<div style={styles.sideBarBottomContainer}>

							{notes !== null ? (
								<>
									<div style={styles.notes}>
										{filteredNotes.map(note => (
											<Note
												key={note._id}
												note={note}
												category={category}
												onAction={() => {
													refetchNotes()
												}}
											/>
										))}
										{isArchivedCategory === false &&
											<CreateNewNoteNote
												onClick={() => {
													setOpenCreateNoteModal(true)
												}}
											/>
										}
									</div>
								</>
							) :
								<div style={styles.loadingContainer}>
									Loading...
									<img src="../../assets/icon/animatedLoadingSvg.svg" style={styles.loadingIcon} alt="loading image" />
								</div>
							}
					</div>

					{
						server?.is_personal === false &&
						<RightSideBar
							style={styles.rightSidebar}
							refetchServers={refetchServers}
							refetchNotes={refetchNotes}
							title={"Server members"}
							users={server?.joined_users}
							owner={server?.server_creator}
							serverId={server._id}
						/>
					}
				</div>
			</div>
		</>
    )
}

const styles = {
    sidebar: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100vh",
        color: "black",
        overflow: "hidden",
    },
    sidebarTop: {
        display: "flex",
        alignItems: "center",
        minHeight: "70px",
        maxHeight: "70px",
        borderBottom: "1px solid var(--border-color)",
        backgroundColor: "var(--outside-color)",
        padding: "0.5rem 1rem",
        gap: "5rem",

        color: "#1f2937",
        lineHeight: "1.50",
        fontSize: "16px",
        fontWeight: "bold",
    },
    sidebarTopTitle: {
        flexShrink: "0",
    },
    sidebarTopCreateButton: {
        display: "flex",
        justifyContent: "end",
        width: "100%",

        gap: "0.5rem",
        marginLeft: "auto",
    },
    sidebarBottom: {
        display: "flex",

        backgroundColor: "var(--inside-color)",
        height: "100%",
        overflowY: "auto",
    },
    sideBarBottomContainer: {
        width: "100%",
        overflowY: "auto",
    },
    notes: {
        padding: "1rem",
        overflowY: "auto",
        columnWidth: "250px",
        columnGap: "0.5rem",
    },
    loadingContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
        width: "100%",
        height: "100%",
    },
    loadingIcon: {
        width: "50px",
    }
}