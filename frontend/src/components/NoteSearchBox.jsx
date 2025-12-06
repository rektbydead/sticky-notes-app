import "../assets/css/ClickableIcon.css"
import "../assets/css/NoteSearchBox.css"
import mdiMagnify from "../assets/icon/mdiMagnify.svg";


export default function SearchBox() {
    return (
        <div style={styles.wrapper} className="search-expand">
            <img src={mdiMagnify} alt="Search" style={styles.icon} />

            <input
                type="text"
                placeholder="Search notes..."
                style={styles.input}
            />
        </div>
    );
}

const styles = {
    wrapper: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "6px 8px",
        borderRadius: "6px",
        border: "1px solid #d1d5db",
        backgroundColor: "transparent",
        color: "black",
    },
    icon: {
        width: "18px",
        height: "18px",
        opacity: 0.6,
    },
    input: {
        border: "none",
        outline: "none",
        width: "100%",
        fontSize: "14px",
        color: "black",
        backgroundColor: "transparent",
    },
};
