// import styles from './IdeaForm.module.css';

// const SECTORS = [
//   // Software & Tech
//   'SaaS / B2B Software',
//   'AI / ML',
//   'Deep Tech',
//   'Cybersecurity',
//   'Telecom & Connectivity',

//   // Finance & Insurance
//   'FinTech',
//   'InsurTech',

//   // Health & Life Sciences
//   'HealthTech',
//   'BioTech & Life Sciences',
//   'FitnessTech & Wellness',

//   // Education
//   'EdTech',

//   // Commerce & Retail
//   'E-Commerce',
//   'Fashion & Apparel',
//   'Beauty & Personal Care',

//   // Marketing & Media
//   'MarTech',
//   'CreatorTech & Media',
//   'Gaming & Entertainment',

//   // Real Estate & Infrastructure
//   'PropTech',
//   'Construction & Infrastructure',

//   // Environment & Agriculture
//   'CleanTech',
//   'AgriTech',

//   // Mobility & Logistics
//   'Mobility & Transport',
//   'LogisticsTech & Supply Chain',

//   // Food & Lifestyle
//   'Food & Beverage',
//   'Pet Care',

//   // Services & Professional
//   'Local Services & Home Services',
//   'HRTech & Future of Work',
//   'LegalTech',
//   'GovTech & CivicTech',

//   // Travel & Hospitality
//   'HospitalityTech & Travel',

//   // Industrial
//   'Manufacturing & Industry',
//   'SpaceTech',

//   // Catch-all
//   'Other',
// ];

// const BoltIcon = () => (
//   <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//     <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
//   </svg>
// );

// export default function IdeaForm({ formData, onChange, onAnalyze, loading }) {
//   const { desc, sector, saturation, tech, funding } = formData;

//   const setField = (key, val) => onChange({ ...formData, [key]: val });

//   return (
//     <div className={styles.card}>
//       <div className={styles.titleRow}>
//         <div className={styles.title}>Idea Parameters</div>
//         <div className={styles.badge}>AI Powered</div>
//       </div>

//       <div className={styles.field}>
//         <label>Idea Description</label>
//         <textarea
//           value={desc}
//           onChange={(e) => setField('desc', e.target.value)}
//           placeholder="Describe your startup idea in detail — the problem you're solving, target audience, and your unique approach..."
//           rows={5}
//         />
//       </div>

//       <div className={styles.field}>
//         <label>Sector</label>
//         <select value={sector} onChange={(e) => setField('sector', e.target.value)}>
//           {SECTORS.map((s) => <option key={s}>{s}</option>)}
//         </select>
//       </div>

//       {sector === 'Other' && (
//         <div className={styles.field}>
//           <label>Specify Your Sector</label>
//           <input
//             type="text"
//             value={formData.customSector || ''}
//             onChange={(e) => setField('customSector', e.target.value)}
//             placeholder="e.g. Quantum Computing, Web3, Defence Tech..."
//           />
//         </div>
//       )}

//       <div className={styles.field}>
//         <label>Market Saturation</label>
//         <div className={styles.segControl}>
//           {['Low', 'Medium', 'High'].map((opt) => (
//             <label key={opt} className={saturation === opt ? styles.segActive : ''}>
//               <input type="radio" name="saturation" value={opt} checked={saturation === opt} onChange={() => setField('saturation', opt)} />
//               {opt}
//             </label>
//           ))}
//         </div>
//       </div>

//       <div className={styles.formRow}>
//         <div className={styles.field}>
//           <label>Tech Complexity</label>
//           <div className={styles.segControl}>
//             {['Low', 'Medium', 'High'].map((opt) => (
//               <label key={opt} className={tech === opt ? styles.segActive : ''}>
//                 <input type="radio" name="tech" value={opt} checked={tech === opt} onChange={() => setField('tech', opt)} />
//                 {opt === 'Medium' ? 'Med' : opt}
//               </label>
//             ))}
//           </div>
//         </div>

//         <div className={styles.field}>
//           <label>Funding Stage</label>
//           <select value={funding} onChange={(e) => setField('funding', e.target.value)}>
//             {['Bootstrapped', 'Angel Funded', 'Pre-Seed', 'Seed', 'Series A', 'Series B', 'Series C', 'Series D+', 'Grant / Gov Funded', 'Crowdfunded'].map((f) => (
//               <option key={f}>{f}</option>
//             ))}
//           </select>
//         </div>
//       </div>

//       <button className={styles.analyzeBtn} onClick={onAnalyze} disabled={loading}>
//         {loading ? (
//           <><div className={styles.spinner} />Analyzing...</>
//         ) : (
//           <><BoltIcon />Analyze Idea</>
//         )}
//       </button>
//     </div>
//   );
// }


// import styles from './IdeaForm.module.css';

// const SECTORS = [
//   'SaaS / B2B Software','AI / ML','Deep Tech','Cybersecurity','Telecom & Connectivity',
//   'FinTech','InsurTech','HealthTech','BioTech & Life Sciences','FitnessTech & Wellness',
//   'EdTech','E-Commerce','Fashion & Apparel','Beauty & Personal Care',
//   'MarTech','CreatorTech & Media','Gaming & Entertainment',
//   'PropTech','Construction & Infrastructure','CleanTech','AgriTech',
//   'Mobility & Transport','LogisticsTech & Supply Chain',
//   'Food & Beverage','Pet Care','Local Services & Home Services',
//   'HRTech & Future of Work','LegalTech','GovTech & CivicTech',
//   'HospitalityTech & Travel','Manufacturing & Industry','SpaceTech','Other'
// ];

// const BoltIcon = () => (
//   <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//     <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
//   </svg>
// );

// export default function IdeaForm({ formData, onChange, onAnalyze, loading }) {

//   const { desc, sector, saturation, tech, funding, competitors } = formData;

//   const setField = (key, val) => onChange({ ...formData, [key]: val });

//   return (
//     <div className={styles.card}>
//       <div className={styles.titleRow}>
//         <div className={styles.title}>Idea Parameters</div>
//         <div className={styles.badge}>AI Powered</div>
//       </div>

//       {/* IDEA */}
//       <div className={styles.field}>
//         <label>Idea Description</label>
//         <textarea
//           value={desc}
//           onChange={(e) => setField('desc', e.target.value)}
//           placeholder="Describe your startup idea..."
//           rows={5}
//         />
//       </div>

//       {/* SECTOR */}
//       <div className={styles.field}>
//         <label>Sector</label>
//         <select value={sector} onChange={(e) => setField('sector', e.target.value)}>
//           {SECTORS.map((s) => <option key={s}>{s}</option>)}
//         </select>
//       </div>

//       {sector === 'Other' && (
//         <div className={styles.field}>
//           <label>Specify Your Sector</label>
//           <input
//             type="text"
//             value={formData.customSector || ''}
//             onChange={(e) => setField('customSector', e.target.value)}
//           />
//         </div>
//       )}

//       {/* MARKET */}
//       <div className={styles.field}>
//         <label>Market Saturation</label>
//         <div className={styles.segControl}>
//           {['Low', 'Medium', 'High'].map((opt) => (
//             <label key={opt} className={saturation === opt ? styles.segActive : ''}>
//               <input type="radio" checked={saturation === opt} onChange={() => setField('saturation', opt)} />
//               {opt}
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* TECH + FUNDING */}
//       <div className={styles.formRow}>
//         <div className={styles.field}>
//           <label>Tech Complexity</label>
//           <div className={styles.segControl}>
//             {['Low', 'Medium', 'High'].map((opt) => (
//               <label key={opt} className={tech === opt ? styles.segActive : ''}>
//                 <input type="radio" checked={tech === opt} onChange={() => setField('tech', opt)} />
//                 {opt}
//               </label>
//             ))}
//           </div>
//         </div>

//         <div className={styles.field}>
//           <label>Funding Stage</label>
//           <select value={funding} onChange={(e) => setField('funding', e.target.value)}>
//             {['Bootstrapped','Angel Funded','Pre-Seed','Seed','Series A','Series B','Series C','Series D+','Grant / Gov Funded','Crowdfunded'].map((f) => (
//               <option key={f}>{f}</option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* ✅ NEW: COMPETITORS */}
//       <div className={styles.field}>
//         <label>Competitors</label>
//         <div className={styles.segControl}>
//           {['Low', 'Medium', 'Many'].map((opt) => (
//             <label key={opt} className={competitors === opt ? styles.segActive : ''}>
//               <input
//                 type="radio"
//                 checked={competitors === opt}
//                 onChange={() => setField('competitors', opt)}
//               />
//               {opt}
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* BUTTON */}
//       <button className={styles.analyzeBtn} onClick={onAnalyze} disabled={loading}>
//         {loading ? (
//           <><div className={styles.spinner} />Analyzing...</>
//         ) : (
//           <><BoltIcon />Analyze Idea</>
//         )}
//       </button>
//     </div>
//   );
// }

import styles from './IdeaForm.module.css';

const SECTORS = [
  'SaaS / B2B Software','AI / ML','Deep Tech','Cybersecurity','Telecom & Connectivity',
  'FinTech','InsurTech','HealthTech','BioTech & Life Sciences','FitnessTech & Wellness',
  'EdTech','E-Commerce','Fashion & Apparel','Beauty & Personal Care',
  'MarTech','CreatorTech & Media','Gaming & Entertainment',
  'PropTech','Construction & Infrastructure','CleanTech','AgriTech',
  'Mobility & Transport','LogisticsTech & Supply Chain',
  'Food & Beverage','Pet Care','Local Services & Home Services',
  'HRTech & Future of Work','LegalTech','GovTech & CivicTech',
  'HospitalityTech & Travel','Manufacturing & Industry','SpaceTech','Other'
];

const BoltIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

export default function IdeaForm({ formData, onChange, onAnalyze, loading }) {

  // ❌ removed competitors from destructuring
  const { desc, sector, saturation, tech, funding } = formData;

  const setField = (key, val) => onChange({ ...formData, [key]: val });

  return (
    <div className={styles.card}>
      <div className={styles.titleRow}>
        <div className={styles.title}>Idea Parameters</div>
        <div className={styles.badge}>AI Powered</div>
      </div>

      {/* IDEA */}
      <div className={styles.field}>
        <label>Idea Description</label>
        <textarea
          value={desc}
          onChange={(e) => setField('desc', e.target.value)}
          placeholder="Describe your startup idea..."
          rows={5}
        />
      </div>

      {/* SECTOR */}
      <div className={styles.field}>
        <label>Sector</label>
        <select value={sector} onChange={(e) => setField('sector', e.target.value)}>
          {SECTORS.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      {sector === 'Other' && (
        <div className={styles.field}>
          <label>Specify Your Sector</label>
          <input
            type="text"
            value={formData.customSector || ''}
            onChange={(e) => setField('customSector', e.target.value)}
          />
        </div>
      )}

      {/* MARKET */}
      <div className={styles.field}>
        <label>Market Saturation</label>
        <div className={styles.segControl}>
          {['Low', 'Medium', 'High'].map((opt) => (
            <label key={opt} className={saturation === opt ? styles.segActive : ''}>
              <input
                type="radio"
                checked={saturation === opt}
                onChange={() => setField('saturation', opt)}
              />
              {opt}
            </label>
          ))}
        </div>
      </div>

      {/* TECH + FUNDING */}
      <div className={styles.formRow}>
        <div className={styles.field}>
          <label>Tech Complexity</label>
          <div className={styles.segControl}>
            {['Low', 'Medium', 'High'].map((opt) => (
              <label key={opt} className={tech === opt ? styles.segActive : ''}>
                <input
                  type="radio"
                  checked={tech === opt}
                  onChange={() => setField('tech', opt)}
                />
                {opt}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.field}>
          <label>Funding Stage</label>
          <select value={funding} onChange={(e) => setField('funding', e.target.value)}>
            {[
              'Bootstrapped','Angel Funded','Pre-Seed','Seed',
              'Series A','Series B','Series C','Series D+',
              'Grant / Gov Funded','Crowdfunded'
            ].map((f) => (
              <option key={f}>{f}</option>
            ))}
          </select>
        </div>
      </div>

      {/* ❌ REMOVED COMPETITORS FIELD */}

      {/* BUTTON */}
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