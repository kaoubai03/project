import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Stethoscope, Eye, EyeOff } from 'lucide-react';
import Button from '../components/ui/Button';
import FormField from '../components/ui/FormField';
import FileUpload from '../components/ui/FileUpload';
import { medecinService } from '../config';
import { useUser } from '../context/UserContext';
import styles from './css/SignupDoctor.module.css';

const SignupDoctor = () => {
  const navigate = useNavigate();
  const { registerDoctor } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const [formData, setFormData] = useState({
    Nom_M: '',
    Prenom_M: '',
    Email_M: '',
    Mot_de_passeM: '',
    Numero_M: '',
    Num_ordre: '',
    Specialite: 'Généraliste',
    Document: null
  });

  const specialites = [
    'Généraliste',
    'Cardiologue',
    'Dermatologue',
    'Pédiatre',
    'Gynécologue',
    'Ophtalmologue',
    'ORL',
    'Neurologue',
    'Psychiatre',
    'Radiologue',
    'Chirurgien',
    'Autre'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value.trim() // Trim les espaces avant et après
    }));
    
    // Effacer l'erreur quand l'utilisateur corrige
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
      Document: file
    }));
    
    if (errors.Document) {
      setErrors(prev => ({
        ...prev,
        Document: ''
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Validation du nom
    if (!formData.Nom_M.trim()) {
      newErrors.Nom_M = 'Le nom est requis';
      isValid = false;
    }

    // Validation du prénom
    if (!formData.Prenom_M.trim()) {
      newErrors.Prenom_M = 'Le prénom est requis';
      isValid = false;
    }

    // Validation de l'email
    if (!formData.Email_M.trim()) {
      newErrors.Email_M = 'L\'email est requis';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.Email_M)) {
      newErrors.Email_M = 'Format d\'email invalide';
      isValid = false;
    }

    // Validation du mot de passe
    if (!formData.Mot_de_passeM) {
      newErrors.Mot_de_passeM = 'Le mot de passe est requis';
      isValid = false;
    } else if (formData.Mot_de_passeM.length < 8) {
      newErrors.Mot_de_passeM = '8 caractères minimum';
      isValid = false;
    }

    // Validation du numéro d'ordre
    if (!formData.Num_ordre.trim()) {
      newErrors.Num_ordre = 'Le numéro d\'ordre est requis';
      isValid = false;
    }

    // Validation du numéro de téléphone
    const cleanedPhone = formData.Numero_M.replace(/\s/g, '');
    if (!cleanedPhone) {
      newErrors.Numero_M = 'Le numéro de téléphone est requis';
      isValid = false;
    } else if (!/^\d{10}$/.test(cleanedPhone)) {
      newErrors.Numero_M = 'Format invalide (10 chiffres)';
      isValid = false;
    }

    // Validation du document
    if (!formData.Document) {
      newErrors.Document = 'Le document justificatif est requis';
      isValid = false;
    } else if (formData.Document.size > 5 * 1024 * 1024) {
      newErrors.Document = 'Fichier trop volumineux (max 5MB)';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      console.log('Validation failed', errors); // Debug
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== undefined) {
          formDataToSend.append(key, formData[key]);
        }
      });

      await registerDoctor(formDataToSend);
      navigate('/dashboard/doctor');
    } catch (error) {
      console.error('Erreur inscription:', error.response?.data || error.message);
      setErrors({
        form: error.response?.data?.message || 'Erreur lors de l\'inscription'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.backButton}>
        <Link to="/user-type" className={styles.backLink}>
          <ArrowLeft className={styles.backIcon} />
          <span>Retour</span>
        </Link>
      </div>

      {errors.form && (
        <div className="error-message">
          {errors.form}
        </div>
      )}
      
      <div className={styles.header}>
        <div className={styles.iconContainer}>
          <Stethoscope className={styles.doctorIcon} />
        </div>
        <h1 className={styles.title}>Inscription Médecin</h1>
        <p className={styles.subtitle}>Créez votre compte professionnel pour rejoindre notre réseau de médecins</p>
      </div>
      
      {errors.form && (
        <div className={styles.errorMessage}>
          {errors.form}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className={styles.form} encType="multipart/form-data">
        <div className={styles.formRow}>
          <FormField
            label="Nom"
            id="Nom_M"
            name="Nom_M"
            required
            value={formData.Nom_M}
            onChange={handleChange}
            error={errors.Nom_M}
          />
          
          <FormField
            label="Prénom"
            id="Prenom_M"
            name="Prenom_M"
            required
            value={formData.Prenom_M}
            onChange={handleChange}
            error={errors.Prenom_M}
          />
        </div>
        
        <FormField
          label="Email professionnel"
          id="Email_M"
          name="Email_M"
          type="email"
          required
          value={formData.Email_M}
          onChange={handleChange}
          error={errors.Email_M}
          placeholder="exemple@clinique.com"
        />
        
        <div className={styles.passwordContainer}>
          <FormField
            label="Mot de passe"
            id="Mot_de_passeM"
            name="Mot_de_passeM"
            type={showPassword ? "text" : "password"}
            required
            value={formData.Mot_de_passeM}
            onChange={handleChange}
            error={errors.Mot_de_passeM}
            placeholder="8 caractères minimum"
          />
          <button
            type="button"
            className={styles.togglePassword}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        
        <div className={styles.formRow}>
          <FormField
            label="Numéro d'ordre"
            id="Num_ordre"
            name="Num_ordre"
            required
            value={formData.Num_ordre}
            onChange={handleChange}
            error={errors.Num_ordre}
          />
          
          <FormField
            label="Numéro de téléphone"
            id="Numero_M"
            name="Numero_M"
            type="tel"
            required
            value={formData.Numero_M}
            onChange={handleChange}
            error={errors.Numero_M}
            placeholder="0612345678"
          />
        </div>
        
        <div className={styles.formField}>
          <label htmlFor="Specialite">Spécialité <span className={styles.required}>*</span></label>
          <select
            id="Specialite"
            name="Specialite"
            value={formData.Specialite}
            onChange={handleChange}
            className={styles.selectField}
          >
            {specialites.map(specialite => (
              <option key={specialite} value={specialite}>
                {specialite}
              </option>
            ))}
          </select>
          {errors.Specialite && <span className={styles.errorText}>{errors.Specialite}</span>}
        </div>
        
        <FileUpload
          id="Document"
          name="Document"
          label="Document justificatif (PDF ou image)"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileChange}
          error={errors.Document}
          required
        />
        
        <div className={styles.submitSection}>
          <Button
            type="submit"
            isLoading={isSubmitting}
            fullWidth
          >
            Soumettre mon inscription
          </Button>
          
          <div className={styles.note}>
            Votre compte sera validé sous 48h après vérification de vos documents.
          </div>
        </div>
        
        <div className={styles.loginLink}>
          Déjà inscrit ? <Link to="/login">Connectez-vous</Link>
        </div>
      </form>
    </div>
  );
};

export default SignupDoctor;