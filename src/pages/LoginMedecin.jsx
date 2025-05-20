import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Lock, ChevronLeft, Stethoscope } from 'lucide-react';
import { useUser } from '../context/UserContext';
import styles from './css/LoginMedecin.module.css';

const LoginMedecin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useUser();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

    const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'L\'email est requis';
    if (!password) newErrors.password = 'Le mot de passe est requis';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await login(email, password, 'doctor');
      navigate('/dashboard/doctor');
    } catch (error) {
      console.error("Erreur lors de la connexion médecin :", error);
      setErrors({
        form: error.response?.data?.error || "Échec de la connexion. Vérifiez vos identifiants."
      });
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <Link to="/" className={styles.backButton}>
          <ChevronLeft size={20} /> Retour
        </Link>

        <div className={styles.loginHeader}>
          <div className={styles.doctorIcon}>
            <Stethoscope size={24} />
          </div>
          <h2>Connexion Médecin</h2>
          <p>Accédez à votre espace professionnel</p>
        </div>

        {errors.form && (
        <div className="error-message">
          {errors.form}
        </div>
      )}

        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email professionnel</label>
            <div className={styles.inputWrapper}>
              <User size={18} className={styles.inputIcon} />
              <input
                type="email"
                id="email"
                placeholder="votre@email.pro"
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
            <Link to="/mot-de-passe-oublie-medecin" className={styles.forgotPassword}>
              Mot de passe oublié ?
            </Link>
          </div>

          <button type="submit" className={styles.loginButton}>
            Se connecter
          </button>

          <div className={styles.signupLink}>
            Pas encore de compte professionnel ? <Link to="/inscription-medecin">Demander un accès</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginMedecin;