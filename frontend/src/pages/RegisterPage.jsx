import { useState } from 'react';
import { useApp } from '../context/AppContext';
import styles from './AuthPages.module.css';
import API from '../api';

export default function RegisterPage() {
  const { navigate, showToast } = useApp();
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    try{
      setLoading(true)

      const res = await API.post("/register",formData)

      showToast('success', res.data.message || 'Registerd successfully')

      // redirect to login
      navigate('login')
    }catch(err){
      showToast('error',err.response?.data?.error || "Something went wrong")
    }finally{
      setLoading(false)
    }
  }
  
  const [formData,setFormData] = useState({
    name:"",
    email:"",
    password:""
  })

  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>🔮</div>
          <div className={styles.logoText}>Startup<span> Idea Validator</span></div>
        </div>
        <h1 className={styles.heading}>Create account</h1>
        <p className={styles.sub}>Start validating your startup ideas today</p>

        <div className={styles.field}>
          <label>Full name</label>
          <input type="text" placeholder="Enter Your Name" value={formData.name} onChange={(e)=> setFormData ({...formData, name:e.target.value})}/>
        </div>
        <div className={styles.field}>
          <label>Email address</label>
          <input type="email" placeholder="Enter Your Email" value={formData.email} onChange={(e)=> setFormData ({...formData, email:e.target.value})}/>
        </div>
        <div className={styles.field}>
          <label>Password</label>
          <input type="password" placeholder="Enter Your Password" value={formData.password} onChange={(e)=> setFormData ({...formData, password: e.target.value})}/>
        </div>

        <button className={styles.btnPrimary} onClick={handleRegister} disabled={loading}>
          {loading ? 'Creating account...' : 'Create account'}
        </button>

        <p className={styles.switchText}>
          Already have an account?{' '}
          <span onClick={() => navigate('login')}>Sign in →</span>
        </p>
      </div>
    </div>
  );
}
