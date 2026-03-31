import { useApp } from './context/AppContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import HistoryPage from './pages/HistoryPage';
import ToastContainer from './components/Toast';

export default function App() {
  const { page } = useApp();

  const renderPage = () => {
    switch (page) {
      case 'login':     return <LoginPage />;
      case 'register':  return <RegisterPage />;
      case 'dashboard': return <DashboardPage />;
      case 'history':   return <HistoryPage />;
      default:          return <LoginPage />;
    }
  };

  return (
    <>
      {renderPage()}
      <ToastContainer />
    </>
  );
}
