import NoteCard from "../Note.jsx";
import Note from "../Note.jsx";

export default function CenterSideBar({title}) {
    return (
        <div style={styles.sidebar}>
            <div style={styles.sidebarTop}>
                Work Server {">"} Important Category
            </div>

            <div style={styles.sidebarBottom}>
                <Note message={"Afinal que nao ler e que gayAfinal que nao ler e que gayAfinal que nao ler e que gayAfinal que nao ler e que gayAfinal que nao ler e que gayAfinal que nao ler e que gayAfinal que nao ler e que gayAfinal que nao ler e que gayAfinal que nao ler e que gayAfinal que nao ler e que gayAfinal que nao ler e que gayAfinal que nao ler e que gay"} title={"Quem ler esta merda e gay que fode"}/>
                <Note message={"AfiAfinal que nao ler e que gay"} title={"Quem ler esta merda e gay que fode"}/>
                <Note message={"AfiAfinal que nao ler e que gay"} title={"Quem ler esta merda e gay que fode"}/>
                <Note message={"AfiAfinal que nao ler e que gay"} title={"Quem ler esta merda e gay que fode"}/>
                <Note message={"AfiAfinal que nao ler e que gay"} title={"Quem ler esta merda e gay que fode"}/>
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
        fontWeight: "bold"
    },
    sidebarBottom: {
        display: "flex",
        flexGrow: "1",
        flexWrap: "wrap",
        padding: "1rem 1rem",
        background: "#f3f4f6",
        alignItems: "flex-start",
        overflowY: "auto",
        gap: "1rem"
    }
}