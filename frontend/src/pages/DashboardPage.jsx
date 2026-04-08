import { useState } from 'react';
import AppLayout from '../components/AppLayout';
import IdeaForm from '../components/IdeaForm';
import ResultCard from '../components/ResultCard';
import { useApp } from '../context/AppContext';
import API from '../api'; // ✅ added
import styles from './DashboardPage.module.css';

const DEFAULT_FORM = {
  desc: '',
  sector: 'SaaS / B2B Software',
  saturation: 'Low',
  tech: 'Low',
  funding: 'Bootstrapped',
};

export default function DashboardPage() {
  const { showToast, addToHistory } = useApp();
  const [formData, setFormData] = useState(DEFAULT_FORM);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ convert "2-4 members" → 4
  const extractTeam = (teamStr) => {
    if (!teamStr) return 3;
    const numbers = teamStr.match(/\d+/g);
    return numbers ? parseInt(numbers[numbers.length - 1]) : 3;
  };

  const handleAnalyze = async () => {
    if (!formData.desc.trim()) {
      showToast('error', 'Please describe your startup idea');
      return;
    }

    try {
      setLoading(true);
      setResult(null);

      // ✅ CALL BACKEND API
      const res = await API.post("/predict", {
        idea: formData.desc,
        sector: formData.sector,
        market_saturation: formData.saturation,
        tech_complexity: formData.tech,
        funding_stage: formData.funding
      });

      console.log("PREDICT RESPONSE:", res.data);

      // ✅ FORMAT RESULT FOR UI
      const formattedResult = {
        risk: res.data.risk,
        confidence: Math.round(res.data.confidence * 100),
        insight: res.data.message,
        team: extractTeam(res.data.team_size),
        funding: formData.funding
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
        conf: formattedResult.confidence,
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
          onAnalyze={handleAnalyze}   // ✅ connected
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