import './assets/css/App.css'
import LeftSideBar from "./components/common/LeftSideBar.jsx";
import RightSideBar from "./components/common/RightSideBar.jsx";
import CenterSideBar from "./components/common/CenterSideBar.jsx";
import StickyNotePage from "./pages/StickyNotesPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";

export default function App() {

    switch (window.history.state) {
        case "stick-notes-page":
            return <StickyNotePage />;
        case "login":
            return <LoginPage />;
        case "register":
            return <LoginPage />;
        default:
            return <StickyNotePage />;
      }
}