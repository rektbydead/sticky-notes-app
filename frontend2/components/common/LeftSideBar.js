function LeftSideBar({title, selectedCategory, onSelectCategory, selectedServer, onSelectServer, serverList, getData}) {
    const { user } = useAuthentication()

	const [serverCreateModelOpen, setServerCreateModelOpen] = React.useState(false);
	const [joinServerModelOpen, setJoinServerModelOpen] = React.useState(false);

	React.useEffect(() => {
        getData()
    }, []);

	React.useEffect(() => {
        if (selectedServer === null) return
        onSelectCategory(selectedServer?.categories.find(category => category.name.toLowerCase() === "general") ?? null)
    }, [selectedServer])

    const personalServers = serverList.filter(server => server.is_personal)
    const communityServers = serverList.filter(server => !server.is_personal)

    const generalCategory = selectedServer?.categories.find(category => category.name.toLowerCase() === "general")
    const archivedCategory = selectedServer?.categories.find(category => category.name.toLowerCase() === "archived")

    const otherCategories = selectedServer?.categories.filter(category => !category.is_default)

	const styles = {
		sidebar: {
			display: "flex",
			flexDirection: "column",
			minWidth: "250px",
			borderRight: "1px solid var(--border-color)",
			color: "black",
			backgroundColor: "var(--outside-color)",
		},
		sidebarTop: {
			display: "flex",
			alignItems: "center",
			minHeight: "70px",
			height: "70px",
			maxHeight: "70px",
			borderBottom: "1px solid var(--border-color)",
			padding: "0.5rem 1rem",
			gap: "1rem",

			color: "#1f2937",
			lineHeight: "1.56",
			fontSize: "19px",
			fontWeight: "bold"
		},
		sidebarTopIcon: {
			width: "40px",
			height: "40px",
		},
		sidebarBottom: {
			display: "flex",
			flexDirection: "column",
			gap: "1rem",
			height: "100%",
			padding: "1.5rem 0",
			overflow: "auto",
			overflowX: "hidden"
		},
		serverCategory: {
			padding: "0 1rem",
			borderBottom: "1px solid var(--border-color)",
			display: "flex",
			flexDirection: "column",
			gap: "1rem"
		},
		serverCategoryList: {
			display: "flex",
			flexDirection: "column",
			gap: "0.5rem",
			marginBottom: "1rem"
		},
		userDisplayer: {
			padding: "0.5rem 1rem",
			marginTop: "auto",
			borderTop: "1px solid var(--border-color)",
			display: "flex",
			flexGrow: 1,
			alignItems: "center",
			minHeight: "60px",
			maxHeight: "60px"
		},
		dontHave: {
			textAlign: "center"
		}
	}

    return (
		<>
			{ serverCreateModelOpen &&
				<ServerCreateModal isOpen={serverCreateModelOpen} onClose={() => setServerCreateModelOpen(false)} onServerCreated={getData} />
			}

			{ joinServerModelOpen &&
				<ServerJoinModal isOpen={joinServerModelOpen} onClose={() => setJoinServerModelOpen(false)} onServerCreated={getData} />
			}

			<div style={styles.sidebar}>
				<div style={styles.sidebarTop}>
					<img style={styles.sidebarTopIcon}
						src="../../assets/pageIcon.png"
						alt="Icon"
					/>

					<span> { title } </span>
				</div>

				<div style={styles.sidebarBottom}>

					<div style={styles.serverCategory}>
						<ServerCategoryBar
							categoryName={"Personal"}
							menuComponent={(isOpen, onClose, triggerRef) => (
								<PersonalServerCreateModal isOpen={isOpen} onClose={onClose} onServerCreated={getData}/>
							)}
						/>

						<div style={styles.serverCategoryList}>
							{personalServers.length > 0
								? personalServers.map(server => (
                                    <ServerDisplayer
										key={server._id}
										title={server.name}
										isOwner={true}
										isSelected={selectedServer?._id === server._id}
										onClick={() => onSelectServer(server)}
										server={server}
										onDelete={getData}
									/>
								))
								: <span style={styles.dontHave}> You do not have personal spaces. </span>
							}
						</div>
					</div>

					<div style={styles.serverCategory}>
						<ServerCategoryBar
							categoryName={"Server"}
							menuComponent={(isOpen, onClose, triggerRef) => (
								<ServerCategoryMenu
									isOpen={isOpen}
									onClose={onClose}
									setServerCreateModelOpen={setServerCreateModelOpen}
									setJoinServerModelOpen={setJoinServerModelOpen}
								/>
							)}
						/>

						<div style={styles.serverCategoryList}>
							{communityServers.length > 0
								? communityServers.map(server => (
									<ServerDisplayer
										key={server._id}
										title={server.name}
										isOwner={server.server_creator._id === user._id}
										isSelected={selectedServer?._id === server._id}
										onClick={() => onSelectServer(server)}
										server={server}
										onDelete={getData}
									/>
								))
								: <span style={styles.dontHave}> You do not belong to any servers. </span>
							}
						</div>
					</div>

					<div style={styles.serverCategory}>
						<ServerCategoryBar
							categoryName={"Categories"}
							menuComponent={(isOpen, onClose, triggerRef) => (
								<CategoryCreateModal
									isOpen={isOpen}
									onClose={onClose}
									serverId={selectedServer?._id}
									onCategoryCreated={getData}
								/>
							)}
						/>

						<div style={styles.serverCategoryList}>
							{ selectedServer &&
								<CategoryDisplayer category={generalCategory} icon="../../assets/icon/mdiNote.svg" onClick={() => onSelectCategory(generalCategory)} isSelected={selectedCategory?._id === generalCategory._id}/>
							}

							{ selectedServer &&
								<CategoryDisplayer category={archivedCategory} icon="../../assets/icon/mdiArchive.svg" onClick={() => onSelectCategory(archivedCategory)} isSelected={selectedCategory?._id === archivedCategory._id}/>
							}

							{
								otherCategories?.map(category => (
									<CategoryDisplayer
										category={category}
										key={category._id}
										icon="../../assets/icon/mdiMenu.svg"
										onClick={() => onSelectCategory(category)}
										isOwner={selectedServer.server_creator._id === user._id}
										isSelected={selectedCategory?._id === category._id}
										onDelete={getData}
									/>
								))
							}
						</div>
					</div>
				</div>

				<div style={styles.userDisplayer}>
					<UserDisplayer
						name={user.name}
						description={user.email}
						isOwner={true}
						menuComponent={(isOpen, onClose, triggerRef) => (
							<LoggedUserMenu isOpen={isOpen} onClose={onClose} triggerRef={triggerRef}/>
						)}
					/>
				</div>
			</div>
		</>
    )
}