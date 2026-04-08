import { useApp } from '../context/AppContext';
import styles from './Toast.module.css';

const ICONS = { success: '✓', error: '✕', info: 'ℹ' };

export default function ToastContainer() {
  const { toasts } = useApp();
  return (
    <div className={styles.container}>
      {toasts.map((t) => (
        <div key={t.id} className={`${styles.toast} ${styles[t.type]}`}>
          <span className={styles.icon}>{ICONS[t.type]}</span>
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
}
