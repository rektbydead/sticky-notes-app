import ServerCategoryBar from "../ServerCategoryBar.jsx";

export default function LeftSideBar({title}) {
    return (
        <div style={styles.sidebar}>
            <div style={styles.sidebarTop}>

                { title }
            </div>

            <div style={styles.sidebarBottom}>
                <ServerCategoryBar/>
            </div>
        </div>
    )
}

const styles = {
    sidebar: {
        "min-width": "250px",
        height: "100vh",
        "border-right": "1px solid #e0e0e0",
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

        color: "#1f2937",
        lineHeight: "1.56",
        fontSize: "19px",
        fontWeight: "bold"
    },
    sidebarBottom: {
       padding: "1.5rem 1rem",
    }
}