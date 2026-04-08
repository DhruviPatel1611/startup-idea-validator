import { useState } from 'react';
import { useApp } from '../context/AppContext';
import styles from './AuthPages.module.css';
import API from '../api';

export default function LoginPage() {
  const { navigate, showToast } = useApp();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isvalidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = async () => {
    // Check empty fields
    if (!email || !password) {
      showToast("error", "Please fill all fields");
      return;
    }

    // Check valid email format
    if (!isvalidEmail(email)) {
      showToast("error", "Invalid email format");
      return;
    }

    // Optional: block obvious dummy emails
    const blockedWords = ["test", "dummy", "abc", "example"];
    const isDummy = blockedWords.some((word) =>
      email.toLowerCase().includes(word),
    );

    if (isDummy) {
      showToast("error", "Invalid or dummy email not allowed");
      return;
    }

    // Your original code continues (NO CHANGE)
    try {
      setLoading(true);

      const res = await API.post("/login", {
        email,
        password,
      });

      console.log("FULL RESPONSE:", res.data);

      // ✅ Validation (IMPORTANT)
      if (!res.data || !res.data.token) {
        showToast("error", "Invalid email or password");
        return;
      }

      // ✅ Only valid login reaches here
      localStorage.setItem("token", res.data.token);

      showToast("success", "Login successful!");
      navigate("dashboard");
    } catch (err) {
      console.log(err.response?.data);
      showToast("error", err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>🔮</div>
          <div className={styles.logoText}>Startup<span> Idea Validator</span></div>
        </div>
        <h1 className={styles.heading}>Welcome back</h1>
        <p className={styles.sub}>Sign in to validate your next big idea</p>

        <div className={styles.field}>
          <label>Email address</label>
          <input
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className={styles.btnPrimary} onClick={handleLogin} disabled={loading}>
          {loading ? 'Signing in...' : 'Sign in'}
        </button>

        <p className={styles.switchText}>
          Don't have an account?{' '}
          <span onClick={() => navigate('register')}>Create one →</span>
        </p>
      </div>
    </div>
  );
}
