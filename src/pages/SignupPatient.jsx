import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, User } from 'lucide-react';
import Button from '../components/ui/Button';
import FormField from '../components/ui/FormField';
import { useUser } from '../context/UserContext';
import './css/SignupPatient.css';

const SignupPatient = () => {
  const navigate = useNavigate();
  const { registerPatient } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    dateOfBirth: '',
    gender: '',
    phoneNumber: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }
    
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères';
    }
    
    if (!formData.fullName) {
      newErrors.fullName = 'Le nom complet est requis';
    }
    
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'La date de naissance est requise';
    }
    
    if (!formData.gender) {
      newErrors.gender = 'Le sexe est requis';
    }
    
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Le numéro de téléphone est requis';
    } else if (!/^\d{10}$/.test(formData.phoneNumber.replace(/\s/g, ''))) {
      newErrors.phoneNumber = 'Format de numéro de téléphone invalide';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      await registerPatient(formData);
      navigate('/dashboard/patient');
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({
        form: 'Une erreur est survenue lors de l\'inscription. Veuillez réessayer.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="signup-container">
      <div className="back-button">
        <Link to="/user-type" className="back-link">
          <ArrowLeft className="back-icon" />
          <span>Retour</span>
        </Link>
      </div>
      
      <div className="header">
        <div className="icon-container">
          <User className="user-icon" />
        </div>
        <h1>Inscription Patient</h1>
        <p>Créez votre compte patient pour accéder à nos services</p>
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
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="exemple@gmail.com"
        />
        
        <FormField
          label="Mot de passe"
          id="password"
          type="password"
          required
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="8 caractères minimum"
        />
        
        <FormField
          label="Nom complet"
          id="fullName"
          required
          value={formData.fullName}
          onChange={handleChange}
          error={errors.fullName}
          placeholder="Prénom et Nom"
        />
        
        <FormField
          label="Date de naissance"
          id="dateOfBirth"
          type="date"
          required
          value={formData.dateOfBirth}
          onChange={handleChange}
          error={errors.dateOfBirth}
        />
        
        <FormField
          label="Sexe"
          id="gender"
          required
          error={errors.gender}
        >
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={errors.gender ? 'select-field error' : 'select-field'}
          >
            <option value="">Sélectionnez</option>
            <option value="male">Homme</option>
            <option value="female">Femme</option>
          </select>
        </FormField>
        
        <FormField
          label="Numéro de téléphone"
          id="phoneNumber"
          type="tel"
          required
          value={formData.phoneNumber}
          onChange={handleChange}
          error={errors.phoneNumber}
          placeholder="06 12 34 56 78"
        />
        
        <div className="submit-button">
          <Button
            type="submit"
            isLoading={isSubmitting}
            fullWidth
          >
            Créer mon compte
          </Button>
        </div>
        
        <div className="login-link">
          Vous avez déjà un compte ?{' '}
          <Link to="/login">Connectez-vous</Link>
        </div>
      </form>
    </div>
  );
};

export default SignupPatient;      