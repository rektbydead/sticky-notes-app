import ServerCategoryBar from "../ServerCategoryBar.jsx";
import ServerDisplayer from "../ServerDisplayer.jsx";
import CategoryDisplayer from "../CategoryDisplayer.jsx";

import mdiMenu from "../../assets/icon/mdiMenu.svg"
import mdiArchive from "../../assets/icon/mdiArchive.svg"

export default function LeftSideBar({title}) {
    return (
        <div style={styles.sidebar}>
            <div style={styles.sidebarTop}>

                { title }
            </div>

            <div style={styles.sidebarBottom}>

                <div style={styles.serverCategory}>
                    <ServerCategoryBar categoryName={"Personal"}/>

                    <div style={styles.serverCategoryList}>
                        <ServerDisplayer title={"Kids"} isOwner={true}/>
                        <ServerDisplayer title={"Car"} isOwner={true} />
                    </div>
                </div>

                <div style={styles.serverCategory}>
                    <ServerCategoryBar categoryName={"Servers"}/>

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
    serverCategory: {
        borderBottom: "1px solid #e0e0e0",
        display: "flex",
        flexDirection: "column",
        gap: "1rem"
    }
}