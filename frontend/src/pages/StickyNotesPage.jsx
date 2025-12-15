import LeftSideBar from "../components/common/LeftSideBar.jsx";
import CenterSideBar from "../components/common/CenterSideBar.jsx";
import RightSideBar from "../components/common/RightSideBar.jsx";
import {useEffect, useState} from "react";
import {getNotesByCategory} from "../services/CategoryService.js";

export default function StickyNotePage() {
    const [selectedServer, setSelectedServer] = useState(null)
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [notes, setNotes] = useState(null)

    async function getNotes() {
        setNotes(null)
        const data = await getNotesByCategory(selectedCategory._id)
        setNotes(data)
    }

    useEffect(() => {
        if (selectedCategory === null) return
        getNotes()
    }, [selectedCategory])

    const title = selectedServer ? `${selectedServer?.is_personal ? "Personal" : "Server"} > ${selectedServer?.name} > ${selectedCategory?.name}` : ""

    return (
        <>
            <LeftSideBar style={styles.leftSidebar} title={"Sticky notes"}
                 selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory}
                 selectedServer={selectedServer} onSelectServer={setSelectedServer}
            />
            <CenterSideBar title={title} notes={notes} server={selectedServer}/>
        </>
    )
}

const styles = {
    leftSidebar: {},
    rightSidebar: {
        "margin-left": "auto",
    },
}