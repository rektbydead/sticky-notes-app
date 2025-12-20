function StickyNotePage() {
	const { user } = useAuthentication()
	const [serverList, setServerList] = React.useState([])
	const [selectedServer, setSelectedServer] = React.useState(null)
	const [selectedCategory, setSelectedCategory] = React.useState(null)
	const [notes, setNotes] = React.useState(null)

	async function getNotes() {
		setNotes(null)
		const data = await getNotesByCategory(selectedCategory._id)
		setNotes(data)
	}

	async function getServersData() {
		try {
			const data = await getServers(user._id)
			setServerList(data)

			if (data.length > 0) {
				const currentServer = data.find((server) => server._id === selectedServer?._id)
				// console.log(currentServer, selectedServer)
				if (currentServer) {
					setSelectedServer(currentServer)
				} else {
					setSelectedServer(data[0])
				}
			}
		} catch (e) {
			alert("Error loading servers... " + e)
		}
	}

	React.useEffect(() => {
		if (selectedCategory === null) return
		getNotes()
	}, [selectedCategory])

	const title = selectedServer ? `${selectedServer?.is_personal ? "Personal" : "Server"} > ${selectedServer?.name} > ${selectedCategory?.name}` : ""

	const styles = {
		leftSidebar: {},
		rightSidebar: {
			"margin-left": "auto",
		},
	}

	return (
		<>
			<LeftSideBar style={styles.leftSidebar} title={"Sticky notes"}
						 serverList={serverList}
						 getData={getServersData}
						 selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory}
						 selectedServer={selectedServer} onSelectServer={setSelectedServer}
			/>
			<CenterSideBar
				title={title}
				notes={notes}
				server={selectedServer}
				category={selectedCategory}
				refetchNotes={getNotes}
				refetchServers={getServersData}
			/>
		</>
	)
}