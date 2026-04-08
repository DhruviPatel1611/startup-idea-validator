import { useApp } from '../context/AppContext';
import styles from './HistoryTable.module.css';

const RISK_CONFIG = {
  low:    { label: 'Low',    cls: styles.riskLow,    dot: styles.dotGreen },
  medium: { label: 'Medium', cls: styles.riskMedium, dot: styles.dotYellow },
  high:   { label: 'High',   cls: styles.riskHigh,   dot: styles.dotRed },
};

export default function HistoryTable({ data }) {
  const { navigate, showToast } = useApp();

  const handleView = (item) => {
    showToast('info', `Loading analysis for "${item.title.substring(0, 30)}..."`);
    setTimeout(() => navigate('dashboard'), 600);
  };

  if (!data.length) {
    return (
      <tr>
        <td colSpan={5} className={styles.empty}>
          No validations yet. Start by analyzing an idea!
        </td>
      </tr>
    );
  }

  return data.map((item) => {
    const rc = RISK_CONFIG[item.risk];
    return (
      <tr key={item.id} className={styles.row}>
        <td>
          <div className={styles.ideaTitle}>{item.title}</div>
          <div className={styles.ideaSector}>{item.sector}</div>
        </td>
        <td>
          <span className={`${styles.riskPill} ${rc.cls}`}>
            <span className={`${styles.dot} ${rc.dot}`} />
            {rc.label}
          </span>
        </td>
        <td>
          <div className={styles.confRow}>
            <div className={styles.confBarWrap}>
              <div className={styles.confBarFill} style={{ width: `${item.conf}%` }} />
            </div>
            <span className={styles.confPct}>{item.conf}%</span>
          </div>
        </td>
        <td className={styles.dateCell}>{item.date}</td>
        {/* <td>
          <button className={styles.actionBtn} onClick={() => handleView(item)}>
            View →
          </button>
        </td> */}
      </tr>
    );
  });
}
