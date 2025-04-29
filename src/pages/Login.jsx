import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, LogIn } from 'lucide-react';
import Button from '../components/ui/Button';
import FormField from '../components/ui/FormField';
import { useUser } from '../context/UserContext'; //on va le changer apres
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'L\'email est requis';
    }
    
    if (!password) {
      newErrors.password = 'Le mot de passe est requis';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setErrors({
        form: 'Email ou mot de passe incorrect.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="login-container">
      <div className="back-button">
        <Link to="/" className="back-link">
          <ArrowLeft className="back-icon" />
          <span>Retour</span>
        </Link>
      </div>
      
      <div className="header">
        <div className="icon-container">
          <LogIn className="login-icon" />
        </div>
        <h1>Connexion</h1>
        <p>Accédez à votre espace personnel</p>
      </div>
      
      {errors.form && (
        <div className="error-message">
          {errors.form}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="form">
        <FormField
          label="Email"
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          placeholder="exemple@gmail.com"
        />
        
        <FormField
          label="Mot de passe"
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />
        
        <div className="form-options">
          <div className="remember-me">
            <input
              id="remember"
              name="remember"
              type="checkbox"
              className="remember-checkbox"
            />
            <label htmlFor="remember">Se souvenir de moi</label>
          </div>
          
          <div className="forgot-password">
            <a href="#">Mot de passe oublié ?</a>
          </div>
        </div>
        
        <div className="submit-button">
          <Button
            type="submit"
            isLoading={isSubmitting}
            fullWidth
          >
            Se connecter
          </Button>
        </div>
        
        <div className="signup-link">
          Vous n'avez pas de compte ?{' '}
          <Link to="/user-type">Créer un compte</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;