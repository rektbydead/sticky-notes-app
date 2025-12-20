function ServerCategoryBar({categoryName, menuComponent}) {
    const [menuOpen, setMenuOpen] = React.useState(false)
    const triggerRef = React.useRef(null)

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
                        src="../assets/icon/mdiPlus.svg"
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