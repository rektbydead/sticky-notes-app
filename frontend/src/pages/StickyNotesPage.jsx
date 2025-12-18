import LeftSideBar from "../components/common/LeftSideBar.jsx";
import CenterSideBar from "../components/common/CenterSideBar.jsx";
import RightSideBar from "../components/common/RightSideBar.jsx";
import {useEffect, useState} from "react";
import {getNotesByCategory} from "../services/NoteService.js";
import {getServers} from "../services/ServerService.js";

export default function StickyNotePage() {
	const [serverList, setServerList] = useState([])
    const [selectedServer, setSelectedServer] = useState(null)
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [notes, setNotes] = useState(null)

    async function getNotes() {
        setNotes(null)
        const data = await getNotesByCategory(selectedCategory._id)
        setNotes(data)
    }

	async function getServersData() {
		try {
			const data = await getServers()
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

    useEffect(() => {
        if (selectedCategory === null) return
        getNotes()
    }, [selectedCategory])

    const title = selectedServer ? `${selectedServer?.is_personal ? "Personal" : "Server"} > ${selectedServer?.name} > ${selectedCategory?.name}` : ""

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
                refetchNotes={getNotes}
				refetchServers={getServersData}
            />
        </>
    )
}

const styles = {
    leftSidebar: {},
    rightSidebar: {
        "margin-left": "auto",
    },
}