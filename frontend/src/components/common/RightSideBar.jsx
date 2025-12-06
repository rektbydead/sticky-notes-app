import UserDisplayer from "../UserDisplayer.jsx";
import InviteMembersButton from "../InviteMemberButton.jsx";

export default function RightSideBar({title}) {
    return (
        <div style={styles.sidebar}>
            <div style={styles.sidebarTop}>

                { title }
            </div>

            <div style={styles.sidebarBottom}>
                <div style={styles.serverCategory}>
                    <UserDisplayer
                        name={"Ruben Lousada"}
                        description={true ? "Owner" : "Member"}
                        isOwner={true}
                        hasMenu={false}
                    />

                    <UserDisplayer
                        name={"Judeus Martim"}
                        description={false ? "Owner" : "Member"}
                        isOwner={false}
                    />

                    <UserDisplayer
                        name={"Merdeu Fodar"}
                        description={false ? "Owner" : "Member"}
                        isOwner={false}
                    />

                    <UserDisplayer
                        name={"Quem ler é gay"}
                        description={false ? "Owner" : "Member"}
                        isOwner={false}
                    />
                </div>
            </div>

            <div style={styles.userDisplayer}>
                <InviteMembersButton/>
            </div>
        </div>
    )
}

const styles = {
    sidebar: {
        display: "flex",
        flexDirection: "column",
        "min-width": "250px",
        borderLeft: "1px solid #e0e0e0",
        color: "black",
    },
    sidebarTop: {
        display: "flex",
        alignItems: "center",
        minHeight: "70px",
        height: "70px",
        maxHeight: "70px",
        borderBottom: "1px solid #e0e0e0",
        padding: "0.5rem",

        color: "#1f2937",
        lineHeight: "1.56",
        fontSize: "19px",
        fontWeight: "bold"
    },
    sidebarBottom: {
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        height: "100%",
        padding: "1.5rem 0",
        overflow: "auto"
    },
    serverCategory: {
        padding: "0 1rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem"
    },
    serverCategoryList: {
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        marginBottom: "1rem"
    },
    userDisplayer: {
        padding: "0.5rem 1rem",
        marginTop: "auto",
        borderTop: "1px solid #e0e0e0",
        display: "flex",
        alignItems: "center",
        minHeight: "60px",
        maxHeight: "60px"
    }
}