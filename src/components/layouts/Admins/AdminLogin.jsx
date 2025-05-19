import { useState } from 'react';
import { useAdmin } from '../../../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import { Activity, Plus, Home,HeartPulse } from 'lucide-react';
import './AdminLogin.css';

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
    <div className="login-container">
      <header className="login-header">
   
          <div className="logo-container">
            <HeartPulse className="logo-icon" />
            <span className="logo-text">eHealth+</span>
          </div>
         
      </header>

      <div className="login-card">
        <h1>Connexion Admin</h1>
        <p className="login-instructions">
          Veuillez utiliser vos identifiants administrateur
        </p>

        <form onSubmit={handleLogin} className="login-form" noValidate>
          {error && (
            <div className="error-message" role="alert">
              <span>⚠️</span> {error}
            </div>
          )}

          <div className="form-group">
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

          <div className="form-group">
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
            className="login-btn"
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