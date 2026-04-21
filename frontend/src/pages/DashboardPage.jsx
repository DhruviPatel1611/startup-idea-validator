// import { useState } from 'react';
// import AppLayout from '../components/AppLayout';
// import IdeaForm from '../components/IdeaForm';
// import ResultCard from '../components/ResultCard';
// import { useApp } from '../context/AppContext';
// import API from '../api'; // ✅ added
// import styles from './DashboardPage.module.css';

// const DEFAULT_FORM = {
//   desc: '',
//   sector: 'SaaS / B2B Software',
//   saturation: 'Low',
//   tech: 'Low',
//   funding: 'Bootstrapped',
//   competitors: 'Low' 
// };

// export default function DashboardPage() {
//   const { showToast, addToHistory } = useApp();
//   const [formData, setFormData] = useState(DEFAULT_FORM);
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // ✅ convert "2-4 members" → 4
//   const extractTeam = (teamStr) => {
//     if (!teamStr) return 3;
//     const numbers = teamStr.match(/\d+/g);
//     return numbers ? parseInt(numbers[numbers.length - 1]) : 3;
//   };

//   const handleAnalyze = async () => {
//     if (!formData.desc.trim()) {
//       showToast('error', 'Please describe your startup idea');
//       return;
//     }

//     try {
//       setLoading(true);
//       setResult(null);

//       // ✅ CALL BACKEND API
//       const res = await API.post("/predict", {
//         idea: formData.desc,
//         sector: formData.sector,
//         market_saturation: formData.saturation,
//         tech_complexity: formData.tech,
//         funding_stage: formData.funding,
//         competitors: formData.competitors
//       });

//       console.log("PREDICT RESPONSE:", res.data);

//       // ✅ FORMAT RESULT FOR UI
//       const formattedResult = {
//         risk: res.data.risk,
//         // confidence: Math.round(res.data.confidence * 100),
//         confidence:res.data.confidence,
//         message: res.data.message,
//         team_size: res.data.team_size,
//         funding_complexity: res.data.funding_complexity,
//         competitors: res.data.competitors,
//         competitors_range: res.data.competitors_range,
//         market_saturation: res.data.market_saturation,
//         tech_complexity: res.data.tech_complexity
//       };

//       setResult(formattedResult);

//       // ✅ Add to history
//       const titleWords = formData.desc.split(' ');
//       const title =
//         titleWords.slice(0, 5).join(' ') +
//         (titleWords.length > 5 ? '...' : '');

//       addToHistory({
//         id: Date.now(),
//         title,
//         sector: formData.sector,
//         risk: formattedResult.risk.toLowerCase(),
//         conf: formattedResult.confidence,
//         date: new Date().toLocaleDateString()
//       });

//       showToast('success', 'Analysis complete! 🚀');

//     } catch (err) {
//       console.log("ERROR:", err.response?.data);
//       showToast('error', err.response?.data?.error || 'Prediction failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <AppLayout activePage="dashboard">
//       <div className={styles.header}>
//         <h1 className={styles.pageTitle}>Validate an Idea</h1>
//         <p className={styles.pageSub}>
//           Enter your startup concept and let AI assess the risk profile
//         </p>
//       </div>

//       <div className={styles.grid}>
//         <IdeaForm
//           formData={formData}
//           onChange={setFormData}
//           onAnalyze={handleAnalyze}   // ✅ connected
//           loading={loading}
//         />

//         <ResultCard
//           result={result}
//           loading={loading}
//           sector={formData.sector}
//         />
//       </div>
//     </AppLayout>
//   );
// }

import { useState } from 'react';
import AppLayout from '../components/AppLayout';
import IdeaForm from '../components/IdeaForm';
import ResultCard from '../components/ResultCard';
import { useApp } from '../context/AppContext';
import API from '../api';
import styles from './DashboardPage.module.css';

const DEFAULT_FORM = {
  desc: '',
  sector: 'SaaS / B2B Software',
  saturation: 'Low',
  tech: 'Low',
  funding: 'Bootstrapped'
  // ❌ REMOVED competitors
};

export default function DashboardPage() {
  const { showToast, addToHistory } = useApp();
  const [formData, setFormData] = useState(DEFAULT_FORM);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!formData.desc.trim()) {
      showToast('error', 'Please describe your startup idea');
      return;
    }

    try {
      setLoading(true);
      setResult(null);

      // ✅ CALL BACKEND API (NO competitors)
      const res = await API.post("/predict", {
        idea: formData.desc,
        sector: formData.sector,
        market_saturation: formData.saturation,
        tech_complexity: formData.tech,
        funding_stage: formData.funding
        // ❌ REMOVED competitors
      });

      console.log("PREDICT RESPONSE:", res.data);

      // ✅ FORMAT RESULT (MATCH ResultCard)
      const formattedResult = {
        risk: res.data.risk,
        confidence: res.data.confidence,
        message: res.data.message,
        team_size: res.data.team_size,
        funding_complexity: res.data.funding_complexity,
        competitors: res.data.competitors,
        competitors_range: res.data.competitors_range,
        market_saturation: res.data.market_saturation,
        tech_complexity: res.data.tech_complexity
      };

      setResult(formattedResult);

      // ✅ Add to history
      const titleWords = formData.desc.split(' ');
      const title =
        titleWords.slice(0, 5).join(' ') +
        (titleWords.length > 5 ? '...' : '');

      addToHistory({
        id: Date.now(),
        title,
        sector: formData.sector,
        risk: formattedResult.risk.toLowerCase(),
        conf: Math.round(formattedResult.confidence * 100),
        date: new Date().toLocaleDateString()
      });

      showToast('success', 'Analysis complete! 🚀');

    } catch (err) {
      console.log("ERROR:", err.response?.data);
      showToast('error', err.response?.data?.error || 'Prediction failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout activePage="dashboard">
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Validate an Idea</h1>
        <p className={styles.pageSub}>
          Enter your startup concept and let AI assess the risk profile
        </p>
      </div>

      <div className={styles.grid}>
        <IdeaForm
          formData={formData}
          onChange={setFormData}
          onAnalyze={handleAnalyze}
          loading={loading}
        />

        <ResultCard
          result={result}
          loading={loading}
          sector={formData.sector}
        />
      </div>
    </AppLayout>
  );
}