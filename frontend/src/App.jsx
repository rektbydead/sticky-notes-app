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

    if (isAuthenticated && (page === 'login' || page === 'register')) {
        navigate('stick-notes', null, '/stick-notes')
        return null
    }

    if (!isAuthenticated && !(page === 'login' || page === 'register')) {
        navigate('login', null, '/login')
        return null
    }

    switch (page) {
        case 'stick-notes':
            return <StickyNotePage />
        case 'login':
            return <LoginPage />
        case 'register':
            return <RegisterPage />
    }
}