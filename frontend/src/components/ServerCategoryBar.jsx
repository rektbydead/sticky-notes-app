import mdiPlus from "../assets/icon/mdiPlus.svg"
import "../assets/css/ServerCategoryBar.css"

export default function ServerCategoryBar() {
    return (
        <div style={styles.container}>
            <span style={styles.title}> Personal </span>

            <div style={styles.add}>
                <img
                    src={mdiPlus}
                    alt="Plus"
                    className="clickable-icon"
                    onClick={() => console.log("Clicked!")}
                />
            </div>
        </div>
    )
}

const styles = {
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    title: {
        color: "#1f2937",
        lineHeight: "1.56",
        fontSize: "16px",
        fontWeight: "600"
    },
    add: {
        height: "20px",
        width: "20px"
    }

}