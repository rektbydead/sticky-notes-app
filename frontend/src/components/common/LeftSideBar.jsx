import ServerCategoryBar from "../ServerCategoryBar.jsx";
import ServerDisplayer from "../ServerDisplayer.jsx";
import CategoryDisplayer from "../CategoryDisplayer.jsx";

import mdiMenu from "../../assets/icon/mdiMenu.svg"
import mdiArchive from "../../assets/icon/mdiArchive.svg"
import UserDisplayer from "../UserDisplayer.jsx";
import LoggedUserMenu from "../menus/LoggedUserMenu.jsx";
import ServerUserMenu from "../menus/ServerUserMenu.jsx";
import ServerCategoryMenu from "../menus/ServerCategoryMenu.jsx";
import PersonalCategoryMenu from "../menus/PersonalCategoryMenu.jsx";

export default function LeftSideBar({title}) {
    return (
        <div style={styles.sidebar}>
            <div style={styles.sidebarTop}>
                <img style={styles.sidebarTopIcon}
                    src="../../../public/pageIcon.png"
                    alt="Icon"
                />

                <span> { title } </span>
            </div>

            <div style={styles.sidebarBottom}>

                <div style={styles.serverCategory}>
                    <ServerCategoryBar
                        categoryName={"Personal"}
                        menuComponent={(isOpen, onClose, triggerRef) => (
                            <PersonalCategoryMenu isOpen={isOpen} onClose={onClose} triggerRef={triggerRef}/>
                        )}
                    />

                    <div style={styles.serverCategoryList}>
                        <ServerDisplayer title={"Kids"} isOwner={true}/>
                        <ServerDisplayer title={"Car"} isOwner={true} />
                    </div>
                </div>

                <div style={styles.serverCategory}>
                    <ServerCategoryBar
                        categoryName={"Server"}
                        menuComponent={(isOpen, onClose, triggerRef) => (
                            <ServerCategoryMenu isOpen={isOpen} onClose={onClose} triggerRef={triggerRef}/>
                        )}
                    />

                    <div style={styles.serverCategoryList}>
                        <ServerDisplayer title={"Familia"} isOwner={true} isSelected={true}/>
                        <ServerDisplayer title={"Parkour Coimbra"} />
                    </div>
                </div>

                <div style={styles.serverCategory}>
                    <ServerCategoryBar categoryName={"Categories"}/>

                    <div style={styles.serverCategoryList}>
                        <CategoryDisplayer title={"General"} icon={mdiMenu}/>
                        <CategoryDisplayer title={"Archived"} icon={mdiArchive}/>
                    </div>

                    <div style={styles.serverCategoryList}>
                        <CategoryDisplayer title={"Projeto 1"} icon={mdiMenu} isOwner={true}/>
                        <CategoryDisplayer title={"Projeto 2"} icon={mdiMenu} isOwner={true}/>
                    </div>
                </div>
            </div>

            <div style={styles.userDisplayer}>
                <UserDisplayer
                    name={"Ruben Lousada"}
                    description={"rlousada123456@gmail.com"}
                    isOwner={true}
                    menuComponent={(isOpen, onClose, triggerRef) => (
                        <LoggedUserMenu isOpen={isOpen} onClose={onClose} triggerRef={triggerRef}/>
                    )}
                />
            </div>
        </div>
    )
}

const styles = {
    sidebar: {
        display: "flex",
        flexDirection: "column",
        "min-width": "250px",
        borderRight: "1px solid var(--border-color)",
        color: "black",
        backgroundColor: "var(--outside-color)",
    },
    sidebarTop: {
        display: "flex",
        alignItems: "center",
        minHeight: "70px",
        height: "70px",
        maxHeight: "70px",
        borderBottom: "1px solid var(--border-color)",
        padding: "0.5rem 1rem",
        gap: "1rem",

        color: "#1f2937",
        lineHeight: "1.56",
        fontSize: "19px",
        fontWeight: "bold"
    },
    sidebarTopIcon: {
        width: "40px",
        height: "40px",
    },
    sidebarBottom: {
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        height: "100%",
        padding: "1.5rem 0",
        overflow: "auto",
        overflowX: "hidden"
    },
    serverCategory: {
        padding: "0 1rem",
        borderBottom: "1px solid var(--border-color)",
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
        borderTop: "1px solid var(--border-color)",
        display: "flex",
        flexGrow: 1,
        alignItems: "center",
        minHeight: "60px",
        maxHeight: "60px"
    }
}