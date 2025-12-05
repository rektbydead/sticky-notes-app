export default function CenterSideBar({title}) {
    return (
        <div style={styles.sidebar}>
            <div style={styles.sidebarTop}>
                Work Server {">"} Important Category
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
        "flex-grow": "1",
        padding: "1rem 0.5rem",
        background: "#f3f4f6"
    }
}