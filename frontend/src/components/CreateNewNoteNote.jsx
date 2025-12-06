import mdiPlus from "../assets/icon/mdiPlus.svg";
import "../assets/css/CreateNewNoteNote.css"
import "../assets/css/ClickableIcon.css"


export default function CreateNewNoteNote() {
    return (
        <div style={styles.card} className="create-card clickable-icon">
            <img
                style={styles.icon}
                src={mdiPlus}
                alt="Plus"
            />
            <span> Create new note</span>
        </div>
    )
}

const styles = {
    card: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        breakInside: "avoid",

        width: "100%",
        aspectRatio: "1/1",
        border: "1px solid #6b7280",
        borderRadius: "8px",
        color: "#6b7280",
        boxShadow: "0 3px 8px rgba(0,0,0,0.30)"
    },
    icon: {
        width: "40px",
        height: "40px",
    }
}