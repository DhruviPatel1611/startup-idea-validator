// import { useEffect, useRef } from 'react';
// import Spinner from './Spinner';
// import styles from './ResultCard.module.css';

// const TEAM_GRADIENTS = [
//   'linear-gradient(135deg,#6C63FF,#9B8AFF)',
//   'linear-gradient(135deg,#10D9A0,#38BDF8)',
//   'linear-gradient(135deg,#F5A623,#FF5C7A)',
//   'linear-gradient(135deg,#38BDF8,#6C63FF)',
//   'linear-gradient(135deg,#FF5C7A,#F5A623)',
//   'linear-gradient(135deg,#9B8AFF,#10D9A0)',
// ];
// const TEAM_INITIALS = ['AJ', 'KL', 'MS', 'TR', 'PW', 'CD'];

// function ProgressBar({ confidence }) {
//   const fillRef = useRef(null);

//   useEffect(() => {
//     const t = setTimeout(() => {
//       if (fillRef.current) fillRef.current.style.width = confidence + '%';
//     }, 100);
//     return () => clearTimeout(t);
//   }, [confidence]);

//   return (
//     <div className={styles.progressWrap}>
//       <div className={styles.progressLabel}>
//         <span>AI Confidence Score</span>
//         <span className={styles.confValue}>{confidence}%</span>
//       </div>
//       <div className={styles.progressBar}>
//         <div ref={fillRef} className={styles.progressFill} style={{ width: '0%' }} />
//       </div>
//     </div>
//   );
// }

// export default function ResultCard({ result, loading, sector }) {

//   // ✅ SAFE mapping from backend → frontend
//   const risk = result?.risk || "Low";
//   const confidence = result?.confidence ? Math.round(result.confidence * 100) : 0;
//   const team = result?.team_size || "N/A";
//   const insight = result?.message || "No insights available";
//   const funding = result?.funding_complexity || "N/A";

//   const riskColors = { Low: 'var(--emerald)', Medium: 'var(--amber)', High: 'var(--rose)' };
//   const riskClass = { Low: styles.riskLow, Medium: styles.riskMedium, High: styles.riskHigh };
//   const riskEmoji = { Low: '🟢', Medium: '🟡', High: '🔴' };

//   return (
//     <div className={styles.card}>
//       <div className={styles.titleRow}>
//         <div className={styles.title}>Validation Report</div>
//         <div className={styles.status}>
//           {loading ? 'Processing...' : result ? 'Updated just now' : 'Awaiting input'}
//         </div>
//       </div>

//       {loading ? (
//         <div className={styles.loader}>
//           <Spinner size="lg" />
//           <p>Running AI analysis...</p>
//         </div>
//       ) : result ? (
//         <div className={styles.resultBody}>
          
//           <div className={`${styles.riskBadge} ${riskClass[risk]}`}>
//             {riskEmoji[risk]} {risk} Risk
//           </div>

//           <div className={styles.metaLine}>
//             {sector} · {funding}
//           </div>

//           <ProgressBar confidence={confidence} />
//           <br />

//           <div className={styles.metricRow}>
//             <div className={styles.metric}>
//               <div className={styles.metricLabel}>Risk Level</div>
//               <div className={styles.metricValue} style={{ color: riskColors[risk] }}>
//                 {risk}
//               </div>
//             </div>

//             <div className={styles.metric}>
//               <div className={styles.metricLabel}>Recommended Team</div>
//               <div className={styles.metricValue}>
//                 {team}
//               </div>
//             </div>
//           </div>

//           <br />

//           <div className={styles.insightBox}>
//             💡 {insight}
//           </div>

//         </div>
//       ) : (
//         <div className={styles.placeholder}>
//           <div className={styles.placeholderIcon}>⚡</div>
//           <p>Fill in the form and click "Analyze Idea" to get your validation report</p>
//         </div>
//       )}
//     </div>
//   );
// }


// import { useEffect, useRef } from 'react';
// import Spinner from './Spinner';
// import styles from './ResultCard.module.css';

// const TEAM_GRADIENTS = [
//   'linear-gradient(135deg,#6C63FF,#9B8AFF)',
//   'linear-gradient(135deg,#10D9A0,#38BDF8)',
//   'linear-gradient(135deg,#F5A623,#FF5C7A)',
//   'linear-gradient(135deg,#38BDF8,#6C63FF)',
//   'linear-gradient(135deg,#FF5C7A,#F5A623)',
//   'linear-gradient(135deg,#9B8AFF,#10D9A0)',
// ];

// function ProgressBar({ confidence }) {
//   const fillRef = useRef(null);

//   useEffect(() => {
//     const t = setTimeout(() => {
//       if (fillRef.current) fillRef.current.style.width = confidence + '%';
//     }, 100);
//     return () => clearTimeout(t);
//   }, [confidence]);

//   return (
//     <div className={styles.progressWrap}>
//       <div className={styles.progressLabel}>
//         <span>AI Confidence Score</span>
//         <span className={styles.confValue}>{confidence}%</span>
//       </div>
//       <div className={styles.progressBar}>
//         <div ref={fillRef} className={styles.progressFill} style={{ width: '0%' }} />
//       </div>
//     </div>
//   );
// }

// export default function ResultCard({ result, loading, sector }) {

//   // ✅ SAFE mapping from backend response
//   const risk = result?.risk || "Low";
//   const confidence = result?.confidence ? Math.round(result.confidence * 100) : 0;
//   const team = result?.team_size || "N/A";
//   const insight = result?.message || "No insights available";
//   const funding = result?.funding_complexity || "N/A";
//   const competitors = result?.competitors || "N/A";
//   const competitorsRange = result?.competitors_range || "N/A";
//   const tech = result?.tech_complexity || "N/A";
//   const market = result?.market_saturation || "N/A";

//   const riskColors = { Low: 'var(--emerald)', Medium: 'var(--amber)', High: 'var(--rose)' };
//   const riskClass = { Low: styles.riskLow, Medium: styles.riskMedium, High: styles.riskHigh };
//   const riskEmoji = { Low: '🟢', Medium: '🟡', High: '🔴' };

//   return (
//     <div className={styles.card}>
//       <div className={styles.titleRow}>
//         <div className={styles.title}>Validation Report</div>
//         <div className={styles.status}>
//           {loading ? 'Processing...' : result ? 'Updated just now' : 'Awaiting input'}
//         </div>
//       </div>

//       {loading ? (
//         <div className={styles.loader}>
//           <Spinner size="lg" />
//           <p>Running AI analysis...</p>
//         </div>
//       ) : result ? (
//         <div className={styles.resultBody}>

//           {/* RISK BADGE */}
//           <div className={`${styles.riskBadge} ${riskClass[risk]}`}>
//             {riskEmoji[risk]} {risk} Risk
//           </div>

//           {/* META */}
//           <div className={styles.metaLine}>
//             {sector} · {funding}
//           </div>

//           {/* PROGRESS */}
//           <ProgressBar confidence={confidence} />
//           <br />

//           {/* MAIN METRICS */}
//           <div className={styles.metricRow}>
//             <div className={styles.metric}>
//               <div className={styles.metricLabel}>Risk Level</div>
//               <div className={styles.metricValue} style={{ color: riskColors[risk] }}>
//                 {risk}
//               </div>
//             </div>

//             <div className={styles.metric}>
//               <div className={styles.metricLabel}>Recommended Team</div>
//               <div className={styles.metricValue}>
//                 {team}
//               </div>
//             </div>
//           </div>

//           {/* NEW METRICS (FROM YOUR API) */}
//           <div className={styles.metricRow}>
//             <div className={styles.metric}>
//               <div className={styles.metricLabel}>Competitors</div>
//               <div className={styles.metricValue}>
//                 {competitors} ({competitorsRange})
//               </div>
//             </div>

//             <div className={styles.metric}>
//               <div className={styles.metricLabel}>Market Saturation</div>
//               <div className={styles.metricValue}>
//                 {market}
//               </div>
//             </div>
//           </div>

//           <div className={styles.metricRow}>
//             <div className={styles.metric}>
//               <div className={styles.metricLabel}>Tech Complexity</div>
//               <div className={styles.metricValue}>
//                 {tech}
//               </div>
//             </div>
//           </div>

//           <br />

//           {/* INSIGHT */}
//           <div className={styles.insightBox}>
//             💡 {insight}
//           </div>

//         </div>
//       ) : (
//         <div className={styles.placeholder}>
//           <div className={styles.placeholderIcon}>⚡</div>
//           <p>Fill in the form and click "Analyze Idea" to get your validation report</p>
//         </div>
//       )}
//     </div>
//   );
// }

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

  // ✅ SAFE mapping from backend response
  const risk = result?.risk || "Low";
  const confidence = result?.confidence ? Math.round(result.confidence * 100) : 0;
  const team = result?.team_size || "N/A";
  const insight = result?.message || "No insights available";
  const funding = result?.funding_complexity || "N/A";
  const competitors = result?.competitors || "N/A";
  const competitorsRange = result?.competitors_range || "N/A";
  const tech = result?.tech_complexity || "N/A";
  const market = result?.market_saturation || "N/A";

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

          {/* RISK BADGE */}
          <div className={`${styles.riskBadge} ${riskClass[risk]}`}>
            {riskEmoji[risk]} {risk} Risk
          </div>

          {/* META */}
          <div className={styles.metaLine}>
            {sector} · {funding}
          </div>

          {/* PROGRESS */}
          <ProgressBar confidence={confidence} />
          <br />

          {/* MAIN METRICS */}
          <div className={styles.metricRow}>
            <div className={styles.metric}>
              <div className={styles.metricLabel}>Risk Level</div>
              <div className={styles.metricValue} style={{ color: riskColors[risk] }}>
                {risk}
              </div>
            </div>

            <div className={styles.metric}>
              <div className={styles.metricLabel}>Recommended Team</div>
              <div className={styles.metricValue}>
                {team}
              </div>
            </div>
          </div>

          {/* ✅ UPDATED: Market Competition */}
          <div className={styles.metricRow}>
            <div className={styles.metric}>
              <div className={styles.metricLabel}>Market Competition</div>
              <div className={styles.metricValue}>
                {competitors} • {competitorsRange}
              </div>
            </div>

            <div className={styles.metric}>
              <div className={styles.metricLabel}>Market Saturation</div>
              <div className={styles.metricValue}>
                {market}
              </div>
            </div>
          </div>

          <div className={styles.metricRow}>
            <div className={styles.metric}>
              <div className={styles.metricLabel}>Tech Complexity</div>
              <div className={styles.metricValue}>
                {tech}
              </div>
            </div>
          </div>

          <br />

          {/* INSIGHT */}
          <div className={styles.insightBox}>
            💡 {insight}
          </div>

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