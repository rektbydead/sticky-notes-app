import './assets/css/App.css'
import LeftSideBar from "./components/common/LeftSideBar.jsx";
import RightSideBar from "./components/common/RightSideBar.jsx";
import CenterSideBar from "./components/common/CenterSideBar.jsx";
import StickyNotePage from "./pages/StickyNotesPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import {useNavigation} from "./context/NavigateContext.jsx";
import {useAuthentication} from "./context/AuthenticationContext.jsx";

export default function App() {
    const { page, navigate } = useNavigation()
    const { isAuthenticated } = useAuthentication()

    // If not authenticated, only allow login/register pages
    if (!isAuthenticated && page !== 'login' && page !== 'register') {
        console.log(isAuthenticated, page)
        return null;
    }

    switch (page) {
        case 'login':
            return <LoginPage />;
        case 'register':
            return <RegisterPage />;
        case 'stick-notes':
            return isAuthenticated ? <StickyNotePage /> : <LoginPage />;
        default:
            return <LoginPage />;
    }
}