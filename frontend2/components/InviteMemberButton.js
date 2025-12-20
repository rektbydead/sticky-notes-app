function InviteMembersButton({serverId}) {
    const [showToast, setShowToast] = React.useState(false)

    function handleClick() {
        navigator.clipboard.writeText(serverId)
        setShowToast(true)
    }


    return (
        <>
            {showToast && (
                <Toast
                    message="The server id has been copied to the clipboard!"
                    onClose={() => setShowToast(false)}
                />
            )}

            <button style={styles.button} className="invite-button" onClick={handleClick}>
                <img
                    style={styles.icon}
                    src="../assets/icon/mdiUserPlus.svg"
                    alt="Plus"
                />

                Invite Members
            </button>
        </>
    );
}

const styles = {
    button: {
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "6px 14px",
        backgroundColor: "transparent",
        borderRadius: "6px",
        fontSize: "14px",
        cursor: "pointer",
        width: "100%",
        height: "100%",
        color: "black",
        justifyContent: "center"
    },
    icon: {
        width: "20px",
        height: "20px",
    },
}