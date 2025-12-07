import LeftSideBar from "../components/common/LeftSideBar.jsx";
import CenterSideBar from "../components/common/CenterSideBar.jsx";
import RightSideBar from "../components/common/RightSideBar.jsx";

export default function StickyNotePage() {
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