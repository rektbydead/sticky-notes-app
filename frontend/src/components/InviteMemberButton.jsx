import mdiPlus from "../assets/icon/mdiPlus.svg"
import "../assets/css/ClickableIcon.css"
import {useState} from "react";
import Toast from "./Toast.jsx";


export default function InviteMembersButton() {
    const [showToast, setShowToast] = useState(false)

    function handleClick() {
        navigator.clipboard.writeText("Your invitation link here")
        setShowToast(true)
    }


    return (
        <>
            {showToast && (
                <Toast
                    message="The invitation has been copied to the clipboard!"
                    onClose={() => setShowToast(false)}
                />
            )}

            <button style={styles.button} className="clickable-icon" onClick={handleClick}>
                <img
                    style={styles.icon}
                    src={mdiPlus}
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
        backgroundColor: "#f3f4f6",
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