import mdiPlus from "../assets/icon/mdiPlus.svg"
import "../assets/css/ClickableIcon.css"
import "../assets/css/CreateNewNoteButton.css"


export default function CreateNewNoteButton() {

    return (
        <button style={styles.button} className="expand-button clickable-icon">
            <img
                style={styles.icon}
                src={mdiPlus}
                alt="Plus"
            />

            <span className="expand-text">Create note</span>
        </button>
    );
}

const styles = {
    button: {
        display: "inline-flex",
        alignItems: "center",
        padding: "6px",
        backgroundColor: "#f3f4f6",
        borderRadius: "6px",
        border: "1px solid #e0e0e0",
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
