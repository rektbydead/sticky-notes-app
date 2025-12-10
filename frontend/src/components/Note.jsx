import "../assets/css/ClickableIcon.css"
import mdiClock from "../assets/icon/mdiClock.svg"
import mdiTrash from "../assets/icon/mdiTrash.svg"
import mdiArchive from "../assets/icon/mdiArchive.svg";


export default function Note({title, message, hour, personName}) {
    return (
        <div style={styles.card} className="clickable-icon">
            <div style={styles.header}>
                <h3 style={styles.title}>{title}</h3>

                <div style={styles.actions}>
                    <img
                        src={mdiArchive}
                        alt="Archive"
                        className="clickable-icon"
                        style={styles.footerIcon}
                    />

                    <img
                        src={mdiTrash}
                        alt="Trash"
                        className="clickable-icon"
                        style={styles.footerIcon}
                    />
                </div>
            </div>

            <p style={styles.bodyText}>
                {message}
            </p>

            <div style={styles.footer}>
                <img
                    src={mdiClock}
                    alt="Trash"
                    style={styles.footerIcon}
                />

                <span style={styles.footerText}>
                    {hour} <strong>{personName}</strong>
                </span>
            </div>
        </div>
    )
}

const styles = {
    card: {
        display: "flex",
        flexDirection: "column",
        gap: "1rem",

        width: "100%",
        breakInside: "avoid",

        marginBottom: "0.5rem",
        background: "#d1d5db",
        borderRadius: "8px",
        padding: "1rem",
    },
    header: {
        display: "flex",
        position: "relative",
        justifyContent: "space-between",
    },
    title: {
        margin: 0,
        fontSize: "15px",
        fontWeight: 700,
    },
    actions: {
        position: "absolute",
        top: -13,
        right: -13,

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.20rem",
    },
    iconBtn: {
        cursor: "pointer",
    },
    bodyText: {
        margin: 0,
        fontSize: "14px",
        lineHeight: 1.4,
        wordBreak: "break-word",
    },
    footer: {
        display: "flex",
        alignItems: "center",
        gap: "0.35rem",
    },
    footerIcon: {
      width: "20px",
      height: "20px"
    },
    footerText: {
        fontSize: "12px",
        color: "#6b7280",
    },
};