import mdiPlus from "../assets/icon/mdiPlus.svg"
import "../assets/css/ClickableIcon.css"
import {useRef, useState} from "react";

export default function ServerCategoryBar({categoryName, menuComponent}) {
    const [menuOpen, setMenuOpen] = useState(false)
    const triggerRef = useRef(null)

    const handleMenuClick = (e) => {
        e.stopPropagation();
        setMenuOpen(!menuOpen);
    };

    return (
        <div style={styles.container}>
            <span style={styles.title}> {categoryName} </span>

            { menuComponent && (
                <div style={styles.add}>
                    <img
                        ref={triggerRef}
                        src={mdiPlus}
                        alt="Plus"
                        className="clickable-icon"
                        onClick={handleMenuClick}
                    />

                    {menuComponent(menuOpen, () => setMenuOpen(false), triggerRef)}
                </div>
            )}
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
        position: "relative",
        height: "20px",
        width: "20px"
    }

}