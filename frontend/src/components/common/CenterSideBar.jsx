export default function CenterSideBar({title}) {
    return (
        <div style={styles.sidebar}>
            <div style={styles.sidebarTop}>
                { title }
            </div>

            <div style={styles.sidebarBottom}>
                asd
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
    },
    sidebarTop: {
        display: "flex",
        "align-items": "center",
        "min-height": "60px",
        "max-height": "60px",
        "border-bottom": "thin solid #e0e0e0",
        padding: "0.5rem",
    },
    sidebarBottom: {
        display: "flex",
        "flex-grow": "1",
        padding: "1rem 0.5rem",
        background: "#f3f4f6"
    }
}