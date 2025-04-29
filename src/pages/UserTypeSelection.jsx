import React, {useState } from 'react';
import{Link, useNavigate} from 'react-router-dom';
import { UserRound, Stethoscope, ArrowLeft }from 'lucide-react';
import Button from '../components/ui/Button';
import './UserTypeSelection.css';

const UserTypeSelection = () => {
    const navigate = useNavigate();
    const [selectedType, setSelectedType] = useState(null);

const handleContinue = () => {
        if (selectedType === 'patient') {
          navigate('/signup-patient');
        } else if (selectedType === 'doctor') {
          navigate('/signup-doctor');
        }
      };

      return (
        <div className="user-type-container">
          <div className="back-button-container">
            <Link to="/" className="back-link">
              <ArrowLeft className="back-icon" />
              <span className="back-text">Retour</span>
            </Link>
          </div>

          <h1 className="title">
        Quel type d'utilisateur êtes-vous ?
      </h1>
      
      <div className="options-container">
        <div 
          className={`option-card ${selectedType === 'patient' ? 'selected' : ''}`}
          onClick={() => setSelectedType('patient')}
        >
          <div className="option-content">
            <div className={`icon-container ${selectedType === 'patient' ? 'selected-icon' : ''}`}>
              <UserRound className={`option-icon ${selectedType === 'patient' ? 'selected' : ''}`} />
            </div>
            <h2 className="option-title">Patient</h2>
            <p className="option-description">
              Je souhaite consulter un professionnel de santé et gérer mes rendez-vous.
            </p>
          </div>
        </div>

        <div 
          className={`option-card ${selectedType === 'doctor' ? 'selected' : ''}`}
          onClick={() => setSelectedType('doctor')}
        >
          <div className="option-content">
            <div className={`icon-container ${selectedType === 'doctor' ? 'selected-icon' : ''}`}>
              <Stethoscope className={`option-icon ${selectedType === 'doctor' ? 'selected' : ''}`} />
            </div>
            <h2 className="option-title">Médecin</h2>
            <p className="option-description">
              Je suis un professionnel de santé et souhaite gérer mes patients.
            </p>
          </div>
        </div>
      </div>

      <div className="button-container">
        <Button
          onClick={handleContinue}
          disabled={!selectedType}
          fullWidth
        >
          Continuer
        </Button>
      </div>
    </div>
  );
};

export default UserTypeSelection;