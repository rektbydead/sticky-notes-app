import ServerCategoryBar from "../ServerCategoryBar.jsx";
import ServerDisplayer from "../ServerDisplayer.jsx";
import CategoryDisplayer from "../CategoryDisplayer.jsx";

import mdiNote from "../../assets/icon/mdiNote.svg"
import mdiMenu from "../../assets/icon/mdiMenu.svg"
import mdiArchive from "../../assets/icon/mdiArchive.svg"
import UserDisplayer from "../UserDisplayer.jsx";
import LoggedUserMenu from "../menus/LoggedUserMenu.jsx";
import ServerUserMenu from "../menus/ServerUserMenu.jsx";
import ServerCategoryMenu from "../menus/ServerCategoryMenu.jsx";
import PersonalCategoryMenu from "../menus/PersonalCategoryMenu.jsx";
import {useEffect, useState} from "react";
import {getServers} from "../../services/ServerService.js";
import {useAuthentication} from "../../context/AuthenticationContext.jsx";
import PersonalServerCreateModal from "../dialogs/PersonalServerCreateModal.jsx";

export default function LeftSideBar({title, selectedCategory, onSelectCategory, selectedServer, onSelectServer}) {
    const { user } = useAuthentication()
	const [serverList, setServerList] = useState([])

	async function getData() {
		try {
			const data = await getServers()
			setServerList(data)

			if (data.length > 0) {
				const currentServer = data.find((server) => server._id === selectedServer?._id)
				if (currentServer) return
				onSelectServer(data[0])
			}
		} catch (e) {
			alert("Error loading servers... " + e)
		}
	}

    useEffect(() => {
        getData()
    }, []);

    useEffect(() => {
        if (selectedServer === null) return
        onSelectCategory(selectedServer?.categories.find(category => category.name.toLowerCase() === "general") ?? null)
    }, [selectedServer])

    const personalServers = serverList.filter(server => server.is_personal)
    const communityServers = serverList.filter(server => !server.is_personal)

    const generalCategory = selectedServer?.categories.find(category => category.name.toLowerCase() === "general")
    const archivedCategory = selectedServer?.categories.find(category => category.name.toLowerCase() === "archived")

    const otherCategories = selectedServer?.categories.filter(category => !category.is_default)

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
                            <PersonalServerCreateModal isOpen={isOpen} onClose={onClose} onServerCreated={getData}/>
                        )}
                    />

                    <div style={styles.serverCategoryList}>
                        {personalServers.length > 0
                            ? personalServers.map(server => (
                                <ServerDisplayer
                                    key={server._id}
                                    title={server.name}
                                    isOwner={true}
                                    isSelected={selectedServer?._id === server._id}
                                    onClick={() => onSelectServer(server)}
                                />
                            ))
                            : <span style={styles.dontHave}> You do not have personal spaces. </span>
                        }
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
                        {communityServers.length > 0
                            ? communityServers.map(server => (
                                <ServerDisplayer
                                    key={server._id}
                                    title={server.name}
                                    isOwner={server.is_owner}
                                    isSelected={selectedServer?._id === server._id}
                                    onClick={() => onSelectServer(server)}
                                />
                            ))
                            : <span style={styles.dontHave}> You do not belong to any servers. </span>
                        }
                    </div>
                </div>

                <div style={styles.serverCategory}>
                    <ServerCategoryBar categoryName={"Categories"}/>

                    <div style={styles.serverCategoryList}>
                        { selectedServer &&
                            <CategoryDisplayer title="General" icon={mdiNote} onClick={() => onSelectCategory(generalCategory)} isSelected={selectedCategory?._id === generalCategory._id}/>
                        }

                        { selectedServer &&
                            <CategoryDisplayer title="Archived" icon={mdiArchive} onClick={() => onSelectCategory(archivedCategory)} isSelected={selectedCategory?._id === archivedCategory._id}/>
                        }

                        {
                            otherCategories?.map(category => {
                                <CategoryDisplayer title={category.title} icon={mdiMenu} onClick={() => onSelectCategory(category)}  isSelected={selectedCategory?._id === category._id}/>
                            })
                        }
                    </div>
                </div>
            </div>

            <div style={styles.userDisplayer}>
                <UserDisplayer
                    name={user.name}
                    description={user.email}
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
        minWidth: "250px",
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
    },
    dontHave: {
        textAlign: "center"
    }
}