import { useEffect, useState } from 'react';
import AppLayout from '../components/AppLayout';
import HistoryTable from '../components/HistoryTable';
import { useApp } from '../context/AppContext';
import API from '../api';
import styles from './HistoryPage.module.css';

export default function HistoryPage() {
  const { showToast } = useApp();

  const [history, setHistory] = useState([]);
  const [filter, setFilter] = useState('all');

  // ✅ FETCH FROM BACKEND
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await API.get("/history");

        console.log("HISTORY:", res.data);

        // 🔥 transform backend → frontend
        const formatted = res.data.map((item, index) => ({
          id: index + 1,
          title: item.idea,
          sector: item.sector,
          risk: item.risk.toLowerCase(),
          conf: Math.round(item.confidence * 100),
          date: new Date(item.created_at).toLocaleDateString()
        }));

        setHistory(formatted);

      } catch (err) {
        console.log(err.response?.data);
        showToast('error', 'Failed to load history');
      }
    };

    fetchHistory();
  }, []);

  // ✅ FILTER
  const filtered =
    filter === 'all'
      ? history
      : history.filter((i) => i.risk === filter);

  // ✅ STATS
  const totalCount = history.length;

  const lowCount = history.filter((i) => i.risk === 'low').length;

  const avgConf =
    history.length > 0
      ? Math.round(history.reduce((a, b) => a + b.conf, 0) / history.length)
      : 0;

  return (
    <AppLayout activePage="history">
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Validation History</h1>
        <p className={styles.pageSub}>
          Review and track all your past idea analyses
        </p>
      </div>

      {/* Stats */}
      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <div className={styles.statBar} style={{ background: 'linear-gradient(90deg, var(--accent), transparent)' }} />
          <div className={styles.statLabel}>Total Analyses</div>
          <div className={`${styles.statValue} ${styles.accent}`}>{totalCount}</div>
          <div className={styles.statSub}>Live data</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statBar} style={{ background: 'linear-gradient(90deg, var(--emerald), transparent)' }} />
          <div className={styles.statLabel}>Low Risk</div>
          <div className={`${styles.statValue} ${styles.green}`}>{lowCount}</div>
          <div className={styles.statSub}>
            {totalCount ? Math.round((lowCount / totalCount) * 100) : 0}% of total
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statBar} style={{ background: 'linear-gradient(90deg, var(--amber), transparent)' }} />
          <div className={styles.statLabel}>Avg. Confidence</div>
          <div className={`${styles.statValue} ${styles.amber}`}>{avgConf}%</div>
          <div className={styles.statSub}>Across all ideas</div>
        </div>
      </div>

      {/* Table */}
      <div className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <div className={styles.tableTitle}>Recent Validations</div>

          <div className={styles.filterGroup}>
            {[
              { key: 'all', label: 'All' },
              { key: 'low', label: 'Low Risk' },
              { key: 'high', label: 'High Risk' },
            ].map(({ key, label }) => (
              <button
                key={key}
                className={`${styles.filterBtn} ${filter === key ? styles.filterActive : ''}`}
                onClick={() => setFilter(key)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Idea</th>
                <th>Risk Level</th>
                <th>Confidence</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              <HistoryTable data={filtered} />
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}