import NoteCard from "../Note.jsx";
import Note from "../Note.jsx";
import CreateNewNoteNote from "../CreateNewNoteNote.jsx";
import CreateNewNoteButton from "../CreateNewNoteButton.jsx";
import NoteSearchBox from "../NoteSearchBox.jsx";
import {useState} from "react";
import RightSideBar from "./RightSideBar.jsx";

export default function CenterSideBar({title}) {
    const [searchValue, setSearchValue] = useState("");

    /* note filtering example for future*/
     const filteredNotes = [].filter((note) =>
        note.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        note.message.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <div style={styles.sidebar}>
            <div style={styles.sidebarTop}>
                <span style={styles.sidebarTopTitle}> Work Server {">"} Important Category </span>

                <div style={styles.sidebarTopCreateButton}>
                    <NoteSearchBox onSearch={setSearchValue}/>
                    <CreateNewNoteButton/>
                </div>
            </div>

            <div style={styles.sidebarBottom}>
                <div style={styles.sideBarBottomContainer}>
                    <div style={styles.notes}>
                        <Note message={"Afinal que nao ler e que gayAfinal que nao ler e que gayAfinal que nao ler e que gayAfinal que nao ler e que gayAfinal que nao ler e que gayAfinal que nao ler e que gayAfinal que nao ler e que gayAfinal que nao ler e que gayAfinal que nao ler e que gayAfinal que nao ler e que gayAfinal que nao ler e que gayAfinal que nao ler e que gay"} title={"Quem ler esta merda e gay que fode"}/>
                        <Note message={"AfiAfinuask dfhlkas dhjflkashj dfl;kash pkas dhjflkashj dfl;kas dhjflkashj dfl; kas dhjflkashj dfl;dkfgasdf ghdasfgh sdfh sdfh sdfhj sdr e que gay"} title={"Quem ler esta merda e gay que fode"}/>
                        <Note message={"AfiAfinal kas dhjflkashj dfl; kas dhjflkashj dfl;  que nao ler e que gay"} title={"Quem ler esta merda e gay que fode"}/>
                        <Note message={"AfiAfinal qkas dhjfdhjflkashj dfl; ue nao ler e que gay"} title={"Quem ler esta merda e gay que fode"}/>
                        <Note message={"AfiAfinal kas dhjflkashj dfl;kas dhjflkashj dfl; que nao ler e que gay"} title={"Shopping"}/>
                        <Note message={"AfiAfinal kas dhjflkashj dfl;kas dhjaasdfe que gay"} title={"Quem ler esta merda e gay que fode"}/>
                        <Note message={"AfiAfinal kas dhjflkashj dfl;kas dhjflkasrfy yhsdfhshj dfl; que nao ler e que gay"} title={"Quem ler esta merda e gay que fode"}/>
                        <Note message={"AfiAfinal kas dhjflkashj dfl;kas dhjflkashj dfl; que nao ler e que gay"} title={"Quem ler esta merda e gay que fode"}/>
                        <Note message={"AfiAfinal kas dhjl; que nao ler e que gay"} title={"Quem ler esta merda e gay que fode"}/>
                        <Note message={"AfiAfinj dfl; que nao ler e que gay"} title={"Quem ler esta merda e gay que fode"}/>
                        <Note message={"AfiAfinal j dfl; que nao ler e que gay"} title={"Quem ler esta merda e gay que fode"}/>
                        <Note message={"AfiAfinj dfl; que nao ler e que gay"} title={"Quem ler esta merda e gay que fode"}/>
                        <Note message={"AfiAfinal j dfl; que nao ler e que gay"} title={"Quem ler esta merda e gay que fode"}/>
                        <Note message={"AfiAfinj dfl; que nao ler e que gay"} title={"Quem ler esta merda e gay que fode"}/>
                        <Note message={"AfiAfinal j dfl; que nao ler e que gay"} title={"Quem ler esta merda e gay que fode"}/>
                        <Note message={"AfiAfinj dfl; que nao ler e que gay"} title={"Quem ler esta merda e gay que fode"}/>
                        <Note message={"AfiAfinal j dfl; que nao ler e que gay"} title={"Quem ler esta merda e gay que fode"}/>
                        <Note message={"AfiAfinal kas dhjflkashasdf sdfsadfg sdfh sdl;.k asdfhpl ashdf;klh sdfsad ;lfgjfhaspl dfghasjkl;dg hklajsdgh kljasdgh klj;asdgh kl;dgh kl;je nao ler e que gay"} title={"Quem ler esta merda e gay que fode"}/>

                        <CreateNewNoteNote/>
                    </div>
                </div>

                <RightSideBar style={styles.rightSidebar} title={"Server members"}/>
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
        columnWidth: "200px",
        columnGap: "0.5rem",
    }
}