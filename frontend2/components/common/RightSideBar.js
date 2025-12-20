function RightSideBar({title, users, owner, serverId, refetchServers, refetchNotes}) {
	const { user } = useAuthentication()

    const sortedUsers = React.useMemo(() => {
        return users?.sort((a, b) => {
            if (a._id === owner?._id) return -1;
            if (b._id === owner?._id) return 1;
            return 0;
        }) ?? []
    }, [users, owner]);

    return (
        <div style={styles.sidebar}>
            <div style={styles.sidebarTop}>

                { title }
            </div>

            <div style={styles.sidebarBottom}>
                <div style={styles.serverCategory}>
                    { sortedUsers?.map(user_to_display =>
                        <UserDisplayer
                            name={user_to_display.name}
							key={user_to_display._id}
                            description={user_to_display._id === owner._id ? "Owner" : "Member"}
                            isOwner={user_to_display._id === owner._id}
                            hasMenu={user_to_display._id !== owner._id}
							menuComponent={(isOpen, onClose, triggerRef) => (
								<ServerUserMenu
									isOpen={isOpen}
									onClose={onClose}
									triggerRef={triggerRef}
									refetchServers={refetchServers}
									refetchNotes={refetchNotes}
									serverId={serverId}
									userId={user_to_display._id}
								/>
							)}
                        />
                    )}
                </div>
            </div>

            <div style={styles.userDisplayer}>
                <InviteMembersButton serverId={serverId}/>
            </div>
        </div>
    )
}

const styles = {
    sidebar: {
        display: "flex",
        flexDirection: "column",
        minWidth: "250px",
        width: "250px",
        maxWidth: "250px",
        borderLeft: "1px solid var(--border-color)",
        color: "black",
        backgroundColor: 'var(--note-color)',
    },
    sidebarTop: {
        display: "flex",
        alignItems: "center",
        minHeight: "60px",
        maxHeight: "60px",
        borderBottom: "1px solid var(--border-color)",
        padding: "0.5rem 1rem",

        color: "#1f2937",
        lineHeight: "1.56",
        fontSize: "19px",
        fontWeight: "bold"
    },
    sidebarBottom: {
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        height: "100%",
        padding: "1.5rem 0",
        overflow: "auto"
    },
    serverCategory: {
        padding: "0 1rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem"
    },
    serverCategoryList: {
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        marginBottom: "1rem",
        overflowY: "auto",
    },
    userDisplayer: {
        padding: "0.5rem 1rem",
        marginTop: "auto",
        borderTop: "1px solid var(--border-color)",
        display: "flex",
        alignItems: "center",
        minHeight: "60px",
        maxHeight: "60px"
    }
}