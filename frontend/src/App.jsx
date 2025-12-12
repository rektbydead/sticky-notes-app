import './assets/css/App.css'
import LeftSideBar from "./components/common/LeftSideBar.jsx";
import RightSideBar from "./components/common/RightSideBar.jsx";
import CenterSideBar from "./components/common/CenterSideBar.jsx";
import StickyNotePage from "./pages/StickyNotesPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import {useNavigation} from "./NavigateContext.jsx";

export default function App() {
    const { page } = useNavigation()

    switch (page) {
        case 'stick-notes':
            return <StickyNotePage />
        case 'login':
            return <LoginPage />
        case 'register':
        default:
            return <RegisterPage />
    }
}