import { useState } from 'react';
import Sidebar from './Sidebar';
import styles from './AppLayout.module.css';

export default function AppLayout({ children, activePage }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={styles.shell}>
      <Sidebar
        activePage={activePage}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      {sidebarOpen && (
        <div className={styles.overlay} onClick={() => setSidebarOpen(false)} />
      )}
      <button className={styles.mobileToggle} onClick={() => setSidebarOpen((v) => !v)}>
        <span /><span /><span />
      </button>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
