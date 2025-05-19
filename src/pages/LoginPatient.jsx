import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Lock, ChevronLeft } from 'lucide-react';
import styles from './css/LoginPatient.module.css';

const LoginPatient = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique de connexion patient
    console.log({ email, password });

        navigate('/dashboard/patient');
    // Remplace cette logique par l'appel à ton API de connexion
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <Link to="/" className={styles.backButton}>
          <ChevronLeft size={20} /> Retour
        </Link>

        <div className={styles.loginHeader}>
          <h2>Connexion Patient</h2>
          <p>Accédez à votre espace santé personnel</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <div className={styles.inputWrapper}>
              <User size={18} className={styles.inputIcon} />
              <input
                type="email"
                id="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Mot de passe</label>
            <div className={styles.inputWrapper}>
              <Lock size={18} className={styles.inputIcon} />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className={styles.optionsRow}>
            <div className={styles.rememberMe}>
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Se souvenir de moi</label>
            </div>
            <Link to="/mot-de-passe-oublie" className={styles.forgotPassword}>
              Mot de passe oublié ?
            </Link>
          </div>

          <button type="submit" className={styles.loginButton}>
            Se connecter
          </button>

          <div className={styles.signupLink}>
            Pas encore de compte ? <Link to="/inscription-patient">S'inscrire</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPatient;