import NoteCard from "../Note.jsx";
import Note from "../Note.jsx";
import CreateNewNoteNote from "../CreateNewNoteNote.jsx";
import CreateNewNoteButton from "../CreateNewNoteButton.jsx";
import NoteSearchBox from "../NoteSearchBox.jsx";
import {useEffect, useState} from "react";
import animatedLoadingSvg from "../../assets/icon/animatedLoadingSvg.svg"
import RightSideBar from "./RightSideBar.jsx";
import {getNotesByCategory} from "../../services/NoteService.js";
import ServerDisplayer from "../ServerDisplayer.jsx";

export default function CenterSideBar({title, server, notes, refetchNotes}) {
    const [searchValue, setSearchValue] = useState("")
    const [now, setNow] = useState(Date.now())

    /* note filtering example for future*/
    const filteredNotes = notes?.filter((note) => searchValue.trim().length === 0
        || note.title.toLowerCase().includes(searchValue.toLowerCase())
        || note.content.toLowerCase().includes(searchValue.toLowerCase())
    ) ?? []

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(Date.now())
        }, 1000)

        return () => clearInterval(interval);
    }, []);

    return (
        <div style={styles.sidebar}>
            <div style={styles.sidebarTop}>
                <span style={styles.sidebarTopTitle}> {title} </span>

                <div style={styles.sidebarTopCreateButton}>
                    <NoteSearchBox onSearch={setSearchValue}/>
                    <CreateNewNoteButton/>
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
                                            onAction={() => {
                                                refetchNotes()
                                            }}
                                        />
                                    ))}
                                    <CreateNewNoteNote/>
                                </div>
                            </>
                        ) :
                            <div style={styles.loadingContainer}>
                                Loading...
                                <img src={animatedLoadingSvg} style={styles.loadingIcon} alt="loading image" />
                            </div>
                        }
                </div>

                {
                    server?.is_personal === false && <RightSideBar style={styles.rightSidebar} title={"Server members"} users={server?.joined_users} owner={server?.server_creator} serverId={server._id}/>
                }
            </div>
        </div>
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
        gap: "30%",

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