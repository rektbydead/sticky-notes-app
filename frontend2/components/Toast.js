function Toast({ message, onClose }) {
    const [visible, setVisible] = React.useState(false);

	React.useEffect(() => {
        setVisible(true)

        const timeout = setTimeout(() => {
            setVisible(false)
            setTimeout(onClose, 300)
        }, 1500)

        return () => clearTimeout(timeout);
    }, [])

    return (
        <div
            style={{
                ...styles.toast,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(10px)",
            }}
        >
            <span style={styles.icon}>✔</span>
            {message}
        </div>
    )
}

const styles = {
    toast: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        backgroundColor: "#e6f9ee",
        border: "1px solid #34a853",
        color: "#166f3e",
        padding: "10px 16px",
        borderRadius: "4px",
        position: "fixed",
        bottom: "30px",
        right: "125px",
        minWidth: "260px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
        fontSize: "14px",
        zIndex: 9999,

        opacity: 0,
        transform: "translateY(10px)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
    },
    icon: {
        color: "#34a853",
        fontWeight: "bold",
    },
};