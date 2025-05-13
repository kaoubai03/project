import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Stethoscope } from 'lucide-react';
import Button from '../components/ui/Button';
import FormField from '../components/ui/FormField';
import FileUpload from '../components/ui/FileUpload';
import { useUser } from '../context/UserContext';
import './SignupDoctor.css';

const SignupDoctor = () => {
  const navigate = useNavigate();
  const { registerDoctor } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    professionalNumber: '',
    document: null,
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
  
  const handleFileChange = (file) => {
    setFormData(prev => ({
      ...prev,
      document: file
    }));
    
    if (errors.document) {
      setErrors(prev => ({
        ...prev,
        document: ''
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
    
    if (!formData.professionalNumber) {
      newErrors.professionalNumber = 'Le numéro professionnel est requis';
    }
    
    if (!formData.document) {
      newErrors.document = 'Le document justificatif est requis';
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
      await registerDoctor(formData);
      navigate('/dashboard/doctor');
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
          <Stethoscope className="doctor-icon" />
        </div>
        <h1>Inscription Médecin</h1>
        <p>Créez votre compte professionnel pour rejoindre notre réseau de médecins</p>
      </div>
      
      {errors.form && (
        <div className="error-message">
          {errors.form}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="form">
        <FormField
          label="Email professionnel"
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
          placeholder="Dr. Prénom Nom"
        />
        
        <FormField
          label="Numéro professionnel"
          id="professionalNumber"
          required
          value={formData.professionalNumber}
          onChange={handleChange}
          error={errors.professionalNumber}
          placeholder="Numéro d'identification professionnel"
        />
        
        <FileUpload
          id="document"
          label="Document justificatif"
          onChange={handleFileChange}
          error={errors.document}
          required
        />
        
        <FormField
          label="Numéro de téléphone"
          id="phoneNumber"
          type="tel"
          required
          value={formData.phoneNumber}
          onChange={handleChange}
          error={errors.phoneNumber}
          placeholder="06 23 45 67 89"
        />
        
        <div className="submit-section">
          <Button
            type="submit"
            isLoading={isSubmitting}
            fullWidth
          >
            Soumettre mon inscription
          </Button>
          
          <div className="note">
            Note : Votre compte sera en attente de validation après l'inscription. Un administrateur vérifiera vos informations professionnelles avant d'activer votre compte.
          </div>
        </div>
        
        <div className="login-link">
          Vous avez déjà un compte ?{' '}
          <Link to="/login">Connectez-vous</Link>
        </div>
      </form>
    </div>
  );
};

export default SignupDoctor;