import { useEffect, useRef } from 'react';
import Spinner from './Spinner';
import styles from './ResultCard.module.css';

const TEAM_GRADIENTS = [
  'linear-gradient(135deg,#6C63FF,#9B8AFF)',
  'linear-gradient(135deg,#10D9A0,#38BDF8)',
  'linear-gradient(135deg,#F5A623,#FF5C7A)',
  'linear-gradient(135deg,#38BDF8,#6C63FF)',
  'linear-gradient(135deg,#FF5C7A,#F5A623)',
  'linear-gradient(135deg,#9B8AFF,#10D9A0)',
];
const TEAM_INITIALS = ['AJ', 'KL', 'MS', 'TR', 'PW', 'CD'];

function ProgressBar({ confidence }) {
  const fillRef = useRef(null);
  useEffect(() => {
    const t = setTimeout(() => {
      if (fillRef.current) fillRef.current.style.width = confidence + '%';
    }, 100);
    return () => clearTimeout(t);
  }, [confidence]);

  return (
    <div className={styles.progressWrap}>
      <div className={styles.progressLabel}>
        <span>AI Confidence Score</span>
        <span className={styles.confValue}>{confidence}%</span>
      </div>
      <div className={styles.progressBar}>
        <div ref={fillRef} className={styles.progressFill} style={{ width: '0%' }} />
      </div>
    </div>
  );
}

export default function ResultCard({ result, loading, sector }) {
  const riskColors = { Low: 'var(--emerald)', Medium: 'var(--amber)', High: 'var(--rose)' };
  const riskClass = { Low: styles.riskLow, Medium: styles.riskMedium, High: styles.riskHigh };
  const riskEmoji = { Low: '🟢', Medium: '🟡', High: '🔴' };

  return (
    <div className={styles.card}>
      <div className={styles.titleRow}>
        <div className={styles.title}>Validation Report</div>
        <div className={styles.status}>
          {loading ? 'Processing...' : result ? 'Updated just now' : 'Awaiting input'}
        </div>
      </div>

      {loading ? (
        <div className={styles.loader}>
          <Spinner size="lg" />
          <p>Running AI analysis...</p>
        </div>
      ) : result ? (
        <div className={styles.resultBody}>
          <div className={`${styles.riskBadge} ${riskClass[result.risk]}`}>
            {riskEmoji[result.risk]} {result.risk} Risk
          </div>

          <div className={styles.metaLine}>
            {sector} · {result.funding}
          </div>

          <ProgressBar confidence={result.confidence} />
          <br />

          <div className={styles.metricRow}>
            <div className={styles.metric}>
              <div className={styles.metricLabel}>Risk Level</div>
              <div className={styles.metricValue} style={{ color: riskColors[result.risk] }}>
                {result.risk}
              </div>
            </div>
            <div className={styles.metric}>
              <div className={styles.metricLabel}>Recommended Team</div>
              <div className={styles.metricValue}>
                {result.team} <span className={styles.metricUnit}>people</span>
              </div>
            </div>
          </div>
          <br />

          <div className={styles.insightBox}>
            💡 <span dangerouslySetInnerHTML={{ __html: result.insight }} />
          </div>

          {/* <div className={styles.teamSection}>
            <div className={styles.teamLabel}>Suggested Team</div>
            <div className={styles.teamRow}>
              {Array.from({ length: Math.min(result.team, 6) }).map((_, i) => (
                <div
                  key={i}
                  className={styles.teamAvatar}
                  style={{ background: TEAM_GRADIENTS[i] }}
                >
                  {TEAM_INITIALS[i]}
                </div>
              ))}
              {result.team > 6 && (
                <div className={`${styles.teamAvatar} ${styles.teamExtra}`}>
                  +{result.team - 6}
                </div>
              )}
            </div>
            <div className={styles.teamMeta}>{result.team} core team members recommended</div>
          </div> */}
        </div>
      ) : (
        <div className={styles.placeholder}>
          <div className={styles.placeholderIcon}>⚡</div>
          <p>Fill in the form and click "Analyze Idea" to get your validation report</p>
        </div>
      )}
    </div>
  );
}
