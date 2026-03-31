import styles from './IdeaForm.module.css';

const SECTORS = [
  'SaaS / B2B Software', 'FinTech', 'HealthTech', 'EdTech',
  'E-Commerce', 'AI / ML', 'CleanTech', 'MarTech', 'PropTech', 'Deep Tech',
];

const BoltIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

export default function IdeaForm({ formData, onChange, onAnalyze, loading }) {
  const { desc, sector, saturation, tech, funding } = formData;

  const setField = (key, val) => onChange({ ...formData, [key]: val });

  return (
    <div className={styles.card}>
      <div className={styles.titleRow}>
        <div className={styles.title}>Idea Parameters</div>
        <div className={styles.badge}>AI Powered</div>
      </div>

      <div className={styles.field}>
        <label>Idea Description</label>
        <textarea
          value={desc}
          onChange={(e) => setField('desc', e.target.value)}
          placeholder="Describe your startup idea in detail — the problem you're solving, target audience, and your unique approach..."
          rows={5}
        />
      </div>

      <div className={styles.field}>
        <label>Sector</label>
        <select value={sector} onChange={(e) => setField('sector', e.target.value)}>
          {SECTORS.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      <div className={styles.field}>
        <label>Market Saturation</label>
        <div className={styles.segControl}>
          {['Low', 'Medium', 'High'].map((opt) => (
            <label key={opt} className={saturation === opt ? styles.segActive : ''}>
              <input type="radio" name="saturation" value={opt} checked={saturation === opt} onChange={() => setField('saturation', opt)} />
              {opt}
            </label>
          ))}
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.field}>
          <label>Tech Complexity</label>
          <div className={styles.segControl}>
            {['Low', 'Medium', 'High'].map((opt) => (
              <label key={opt} className={tech === opt ? styles.segActive : ''}>
                <input type="radio" name="tech" value={opt} checked={tech === opt} onChange={() => setField('tech', opt)} />
                {opt === 'Medium' ? 'Med' : opt}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.field}>
          <label>Funding Stage</label>
          <select value={funding} onChange={(e) => setField('funding', e.target.value)}>
            {['Bootstrapped', 'Pre-Seed', 'Seed', 'Series A', 'Series B+'].map((f) => (
              <option key={f}>{f}</option>
            ))}
          </select>
        </div>
      </div>

      <button className={styles.analyzeBtn} onClick={onAnalyze} disabled={loading}>
        {loading ? (
          <><div className={styles.spinner} />Analyzing...</>
        ) : (
          <><BoltIcon />Analyze Idea</>
        )}
      </button>
    </div>
  );
}
