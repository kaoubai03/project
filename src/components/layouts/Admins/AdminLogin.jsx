import { useState } from 'react';
import { useAdmin } from '../../../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import { Activity, Plus, Home, HeartPulse } from 'lucide-react';
import styles from './AdminLogin.module.css';

const AdminLogin = () => {
  const { loginAdmin } = useAdmin();
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@ehealth.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await loginAdmin(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Identifiants incorrects');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <header className={styles.loginHeader}>
        <div className={styles.logoContainer}>
          <HeartPulse className={styles.logoIcon} />
          <span className={styles.logoText}>eHealth+</span>
        </div>
      </header>

      <div className={styles.loginCard}>
        <h1>Connexion Admin</h1>
        <p className={styles.loginInstructions}>
          Veuillez utiliser vos identifiants administrateur
        </p>

        <form onSubmit={handleLogin} className={styles.loginForm} noValidate>
          {error && (
            <div className={styles.errorMessage} role="alert">
              <span>⚠️</span> {error}
            </div>
          )}

          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())}
              required
              autoComplete="username"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Mot de passe</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className={styles.loginBtn}
            disabled={isLoading}
          >
            {isLoading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;