import mdiPlus from "../assets/icon/mdiPlus.svg"
import "../assets/css/ClickableIcon.css"
import "../assets/css/CreateNewNoteButton.css"


export default function CreateNewNoteButton() {

    return (
        <button style={styles.button} className="create-note-button" data-tooltip="Create new note">
            <img
                style={styles.icon}
                src={mdiPlus}
                alt="Plus"
            />
        </button>
    );
}

const styles = {
    button: {
        display: "inline-flex",
        alignItems: "center",
        padding: "6px",
        backgroundColor: "transparent",
        borderRadius: "6px",
        fontSize: "14px",
        cursor: "pointer",
        height: "32px",
        color: "black",
        justifyContent: "center",
    },
    icon: {
        width: "20px",
        height: "20px",
        flexShrink: 0,
    },
};
