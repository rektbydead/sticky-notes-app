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
        "align-items": "center",
        margin: "auto",
        "min-height": "60px",
        "max-height": "60px",
        "border-bottom": "1px solid #e0e0e0",
        padding: "0.5rem",
    },
    sidebarBottom: {
       padding: "1rem 0.5rem",
    }
}