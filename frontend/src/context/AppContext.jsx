import { createContext, useContext, useState, useEffect } from 'react';

const INITIAL_HISTORY = [
  { id: 1, title: 'AI-Powered Landing Page Optimizer', sector: 'MarTech', risk: 'low', conf: 82, date: 'Mar 28, 2026' },
  { id: 2, title: 'Decentralized Freelance Marketplace', sector: 'FinTech', risk: 'high', conf: 51, date: 'Mar 25, 2026' },
  { id: 3, title: 'B2B SaaS for Restaurant Inventory', sector: 'SaaS / B2B', risk: 'medium', conf: 67, date: 'Mar 22, 2026' },
  { id: 4, title: 'Carbon Credit Trading Platform', sector: 'CleanTech', risk: 'medium', conf: 71, date: 'Mar 18, 2026' },
  { id: 5, title: 'EdTech for Vocational Training', sector: 'EdTech', risk: 'low', conf: 88, date: 'Mar 14, 2026' },
  { id: 6, title: 'Telemedicine for Rural India', sector: 'HealthTech', risk: 'low', conf: 79, date: 'Mar 10, 2026' },
  { id: 7, title: 'NFT-based Loyalty Program', sector: 'E-Commerce', risk: 'high', conf: 34, date: 'Mar 6, 2026' },
];

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [page, setPage] = useState('login');
  const [history, setHistory] = useState(INITIAL_HISTORY);
  const [toasts, setToasts] = useState([]);

  // 🔥 FIX: CHECK TOKEN ON LOAD
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setPage("dashboard");   // ✅ stay logged in
    } else {
      setPage("login");       // ✅ go to login
    }
  }, []);

  const navigate = (p) => setPage(p);

  const addToHistory = (item) => {
    setHistory((prev) => [item, ...prev]);
  };

  const showToast = (type, message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, message }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  return (
    <AppContext.Provider
      value={{ page, navigate, history, addToHistory, toasts, showToast }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}