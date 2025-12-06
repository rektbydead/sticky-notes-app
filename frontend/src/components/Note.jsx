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