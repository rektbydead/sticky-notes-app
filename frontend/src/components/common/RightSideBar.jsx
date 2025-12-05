export default function RightSideBar({title}) {
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
        "min-width": "250px",
        height: "100vh",
        "border-left": "1px solid #e0e0e0",
        color: "black",
    },
    sidebarTop: {
        display: "flex",
        alignItems: "center",
        margin: "auto",
        minHeight: "70px",
        maxHeight: "70px",
        borderBottom: "1px solid #e0e0e0",
        padding: "0.5rem",

        color: "#374151",
        lineHeight: "1.50",
        fontSize: "16px",
    },
    sidebarBottom: {
       padding: "1rem 0.5rem",
    }
}