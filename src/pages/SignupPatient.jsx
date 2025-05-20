import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Eye, EyeOff } from 'lucide-react';
import Button from '../components/ui/Button';
import FormField from '../components/ui/FormField';
import { useUser } from '../context/UserContext';
import styles from './css/SignupPatient.module.css';

const SignupPatient = () => {
  const navigate = useNavigate();
  const { registerPatient } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    cin: '',
    nom: '',
    prenom: '',
    email: '',
    motDePasse: '',
    numero: '',
    dateNaissance: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "L'email est requis";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Format d'email invalide";
    if (!formData.motDePasse || formData.motDePasse.length < 8) newErrors.motDePasse = 'Le mot de passe doit contenir au moins 8 caractères';
    if (!formData.nom) newErrors.nom = 'Le nom est requis';
    if (!formData.prenom) newErrors.prenom = 'Le prénom est requis';
    if (!formData.cin) newErrors.cin = 'Le CIN est requis';
    if (!formData.dateNaissance) newErrors.dateNaissance = 'La date de naissance est requise';
    if (!formData.numero || !/^[\d\s()+-]{10,15}$/.test(formData.numero)) newErrors.numero = 'Numéro de téléphone invalide';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await registerPatient({
        CIN_P: formData.cin,
        Nom_P: formData.nom,
        Prenom_P: formData.prenom,
        Email_P: formData.email,
        Mot_de_passeP: formData.motDePasse,
        Numero_P: formData.numero,
        Date_de_naissance: formData.dateNaissance,
      });
      
      localStorage.setItem('token', response.token);
      navigate('/dashboard/patient');
    } catch (error) {
      setErrors({
        form: error.response?.data?.error || "Une erreur est survenue lors de l'inscription. Veuillez réessayer."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.signupContainer}>
      <div className={styles.backButton}>
        <Link to="/user-type" className={styles.backLink}>
          <ArrowLeft className={styles.backIcon} />
          <span>Retour</span>
        </Link>
      </div>

      <div className={styles.header}>
        <div className={styles.iconContainer}>
          <User className={styles.userIcon} />
        </div>
        <h1>Inscription Patient</h1>
        <p>Créez votre compte patient pour accéder à nos services</p>
      </div>

      {errors.form && <div className={styles.errorMessage}>{errors.form}</div>}

      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <FormField
          label="CIN"
          id="cin"
          name="cin"
          required
          value={formData.cin}
          onChange={handleChange}
          error={errors.cin}
          placeholder="AA123456"
        />

        <FormField
          label="Nom"
          id="nom"
          name="nom"
          required
          value={formData.nom}
          onChange={handleChange}
          error={errors.nom}
          placeholder="Nom de famille"
        />

        <FormField
          label="Prénom"
          id="prenom"
          name="prenom"
          required
          value={formData.prenom}
          onChange={handleChange}
          error={errors.prenom}
          placeholder="Votre prénom"
        />

        <FormField
          label="Email"
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="exemple@gmail.com"
        />

        <div className={styles.passwordField}>
          <FormField
            label="Mot de passe"
            id="motDePasse"
            name="motDePasse"
            type={showPassword ? "text" : "password"}
            required
            value={formData.motDePasse}
            onChange={handleChange}
            error={errors.motDePasse}
            placeholder="8 caractères minimum"
          />
          <button 
            type="button" 
            className={styles.togglePassword}
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <FormField
          label="Date de naissance"
          id="dateNaissance"
          name="dateNaissance"
          type="date"
          required
          value={formData.dateNaissance}
          onChange={handleChange}
          error={errors.dateNaissance}
        />

        <FormField
          label="Numéro de téléphone"
          id="numero"
          name="numero"
          type="tel"
          required
          value={formData.numero}
          onChange={handleChange}
          error={errors.numero}
          placeholder="06 12 34 56 78"
        />

        <div className={styles.submitButton}>
          <Button type="submit" isLoading={isSubmitting} fullWidth>
            Créer mon compte
          </Button>
        </div>

        <div className={styles.loginLink}>
          Vous avez déjà un compte ? <Link to="/login">Connectez-vous</Link>
        </div>
      </form>
    </div>
  );
};

export default SignupPatient;