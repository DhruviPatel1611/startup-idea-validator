import { useApp } from '../context/AppContext';
import styles from './Sidebar.module.css';
import { useEffect, useState } from 'react';
import API from '../api';

const DashIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" />
  </svg>
);

const HistoryIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);

const LogoutIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

export default function Sidebar({ activePage, isOpen, onClose }) {
  const { navigate, showToast } = useApp();

  const [user, setUser] = useState({
  name: "",
  email: ""
});
useEffect(() => {
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return; 

      const res = await API.get("/user");

      setUser(res.data);

    } catch (err) {
      console.log(err.response?.data);
    }
  };

  fetchUser();
}, []); 

  const handleLogout = () => {
    localStorage.removeItem("token")

    showToast('info', 'Logged out. See you soon!')

    setTimeout(()=> navigate('login'),700)
  }

  return (
    <>
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>🔮</div>
          <div className={styles.logoText}>
            Startup<span> Idea Validator</span>
          </div>
        </div>

        <div className={styles.navSection}>Main</div>

        <button
          className={`${styles.navItem} ${activePage === "dashboard" ? styles.active : ""}`}
          onClick={() => {
            navigate("dashboard");
            onClose?.();
          }}
        >
          <DashIcon /> Dashboard
        </button>

        <button
          className={`${styles.navItem} ${activePage === "history" ? styles.active : ""}`}
          onClick={() => {
            navigate("history");
            onClose?.();
          }}
        >
          <HistoryIcon /> History
        </button>

        <div className={styles.spacer} />

        <div className={styles.userRow}>
          <div className={styles.avatar}>
            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
          <div>
            <div className={styles.userName}>{user.name || "User"}</div>
          
            <div className={styles.userRole}>{user.email || "Loading..."}</div>
          </div>
        </div>

        <button className={styles.logout} onClick={handleLogout}>
          <LogoutIcon /> Logout
        </button>
      </aside>
    </>
  );
}
