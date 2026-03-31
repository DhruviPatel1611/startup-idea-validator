import styles from './Spinner.module.css';

export default function Spinner({ size = 'sm' }) {
  return <div className={`${styles.spinner} ${styles[size]}`} />;
}
