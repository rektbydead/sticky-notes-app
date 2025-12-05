import './assets/App.css'
import LeftSideBar from "./components/common/LeftSideBar.jsx";
import RightSideBar from "./components/common/RightSideBar.jsx";
import CenterSideBar from "./components/common/CenterSideBar.jsx";

export default function App() {

    return (
        <>
            <LeftSideBar style={styles.leftSidebar} title={"Sticky notes"}/>
            <CenterSideBar title={""}/>
            <RightSideBar style={styles.rightSidebar} title={"Server members"}/>
        </>
    )
}

const styles = {
    leftSidebar: {

    },
    rightSidebar: {
        "margin-left": "auto",
    },
}