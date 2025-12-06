import "../assets/css/ClickableIcon.css"
import mdiClock from "../assets/icon/mdiClock.svg";


export default function Note({title, message, hour, personName}) {
    return (
        <div style={styles.card}>
            <div style={styles.header}>
                <h3 style={styles.title}>{title}</h3>

                <div style={styles.actions}>
                    <span> a </span>
                    <span> b </span>
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
        background: "#d1d5db",
        padding: "1rem",
        borderRadius: "8px",
        width: "300px",

        height: "auto",
        flexGrow: 0,
        flexShrink: 0,

        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",

        border: "1px solid red"

    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    title: {
        margin: 0,
        fontSize: "15px",
        fontWeight: 700,
    },
    actions: {
        display: "flex",
        gap: "0.25rem",
    },
    iconBtn: {
        cursor: "pointer",
    },
    bodyText: {
        margin: 0,
        fontSize: "14px",
        lineHeight: 1.4,
    },
    footer: {
        display: "flex",
        alignItems: "center",
        gap: "0.35rem",
    },
    footerIcon: {
      width: "15px",
      height: "15px"
    },
    footerText: {
        fontSize: "12px",
        color: "#6b7280",
    },
};