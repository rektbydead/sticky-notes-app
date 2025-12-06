import mdiDotsVertical from "../assets/icon/mdiDotsVertical.svg"

import "../assets/css/ClickableIcon.css"

export default function UserDisplayer({name, email, isOwner, onClick}) {
    const firstLetter = name?.trim()?.charAt(0)?.toUpperCase() || "";

    return (
        <div style={styles.container}
             onClick={onClick}
        >
            <div style={styles.titleContainer}>
                <div style={{...styles.avatar, background: isOwner ? "#6366f1" : "#22c55e"}}>
                    {firstLetter}
                </div>

                <div style={styles.title}>
                    <span style={styles.name}> {name} </span>
                    <span style={styles.email}> {email} </span>
                </div>
            </div>

            {isOwner ?
                (<div style={styles.menuIcon}>
                    <img
                        src={mdiDotsVertical}
                        alt="Menu"
                        className="clickable-icon"
                        onClick={(e) => {
                            e.stopPropagation();
                            console.log("Trash clicked!");
                        }}
                    />
                </div>)
                : null
            }
        </div>
    )
}

const styles = {
    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",

        justifyContent: "space-between",
        gap: "0.5rem",
        paddingLeft: "0.25rem",
        paddingTop: "0.25rem",
        paddingBottom: "0.25rem",
    },
    titleContainer: {
        display: "flex",
        alignItems: "center",
        gap: "0.5rem"
    },
    avatar: {
        width: "32px",
        height: "32px",
        borderRadius: "50%",
        background: "#22c55e",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontWeight: 700,
        fontSize: "0.9rem",
    },
    menuIcon: {
        width: "20px",
        height: "20px"
    },
    title: {
        lineHeight: "1",
        textOverflow: "ellipsis",
        overflow: "hidden",
        display: "block",
        maxWidth: "140px",
    },
    name: {
        fontSize: "14px",
        color: "#1f2937",
    },
    email: {
        fontSize: "10px",
        color: "#6b7280",
    }
}