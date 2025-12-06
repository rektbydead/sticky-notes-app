import NoteCard from "../Note.jsx";
import Note from "../Note.jsx";
import CreateNewNoteNote from "../CreateNewNoteNote.jsx";
import CreateNewNoteButton from "../CreateNewNoteButton.jsx";

export default function CenterSideBar({title}) {
    return (
        <div style={styles.sidebar}>
            <div style={styles.sidebarTop}>
                Work Server {">"} Important Category

                <div style={styles.sidebarTopCreateButton}>
                    <CreateNewNoteButton/>
                </div>
            </div>

            <div style={styles.sidebarBottom}>
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
                <Note message={"AfiAfinal kas dhjflkashasdf sdfsadfg sdfh sdl;.k asdfhpl ashdf;klh sdfsad ;lfgjfhaspl dfghasjkl;dg hklajsdgh kljasdgh klj;asdgh kl;dgh kl;je nao ler e que gay"} title={"Quem ler esta merda e gay que fode"}/>

                <CreateNewNoteNote/>
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
        borderBottom: "1px solid #e0e0e0",
        padding: "0.5rem",

        color: "#374151",
        lineHeight: "1.50",
        fontSize: "16px",
        fontWeight: "bold",
    },
    sidebarTopCreateButton: {
        marginLeft: "auto",
    },
    sidebarBottom: {
        padding: "1rem",
        overflowY: "auto",
        columnWidth: "200px",
        columnGap: "0.5rem",
    }
}